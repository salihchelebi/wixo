let Pool
try {
    ;({ Pool } = require('pg'))
} catch {
    Pool = null
}

let pool
let schemaPromise

const DB_ENV_NAME = 'SUPABASE_CONNECT'
const LEGACY_BROKEN_HOST = 'db.xfthbqcmmbllftxgmvau.supabase.co'

function resolveDatabaseUrl() {
    const connectionString = process.env[DB_ENV_NAME]
    if (!connectionString || !String(connectionString).trim()) {
        const error = new Error(`Veritabanı bağlantısı için ${DB_ENV_NAME} zorunludur.`)
        error.code = 'db_env_missing'
        throw error
    }

    const parsed = parseConnectionString(String(connectionString).trim())
    if (parsed.hostname === LEGACY_BROKEN_HOST) {
        const error = new Error('Veritabanı host ayarı güncel değil. SUPABASE_CONNECT değerini pooler DSN ile güncelleyin.')
        error.code = 'db_legacy_host'
        throw error
    }

    return {
        envName: DB_ENV_NAME,
        connectionString: parsed.connectionString,
        hostname: parsed.hostname,
        port: parsed.port,
        protocol: parsed.protocol,
        database: parsed.database
    }
}

function parseConnectionString(connectionString) {
    try {
        const url = new URL(connectionString)
        return {
            connectionString,
            hostname: url.hostname,
            port: url.port || '5432',
            protocol: url.protocol.replace(':', ''),
            database: url.pathname.replace(/^\//, '') || 'postgres'
        }
    } catch {
        const error = new Error('SUPABASE_CONNECT geçerli bir PostgreSQL DSN formatında değil.')
        error.code = 'db_dsn_invalid'
        throw error
    }
}

function getPool() {
    if (pool) return pool
    if (!Pool) {
        const error = new Error('pg modülü bulunamadı. Netlify Functions bağımlılıklarında pg olmalıdır.')
        error.code = 'db_driver_missing'
        throw error
    }

    const { connectionString } = resolveDatabaseUrl()
    pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false },
        max: 4,
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 10000
    })

    return pool
}

async function query(text, params) {
    try {
        return await getPool().query(text, params)
    } catch (error) {
        throw mapDatabaseError(error)
    }
}

async function withTransaction(work) {
    const client = await getPool().connect()
    try {
        await client.query('BEGIN')
        const result = await work(client)
        await client.query('COMMIT')
        return result
    } catch (error) {
        await client.query('ROLLBACK')
        throw mapDatabaseError(error)
    } finally {
        client.release()
    }
}

async function ensureSchema() {
    if (!schemaPromise) {
        schemaPromise = (async () => {
            await query('CREATE EXTENSION IF NOT EXISTS pgcrypto;')
            await query(`
                CREATE TABLE IF NOT EXISTS admin_users (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    username TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    role TEXT NOT NULL DEFAULT 'admin',
                    is_active BOOLEAN NOT NULL DEFAULT TRUE,
                    session_version INTEGER NOT NULL DEFAULT 1,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    last_login_at TIMESTAMPTZ NULL
                );

                CREATE TABLE IF NOT EXISTS admin_sessions (
                    id UUID PRIMARY KEY,
                    user_id UUID NOT NULL REFERENCES admin_users(id),
                    token_hash TEXT NOT NULL,
                    expires_at TIMESTAMPTZ NOT NULL,
                    revoked_at TIMESTAMPTZ NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS assistant_configs (
                    workspace_id TEXT PRIMARY KEY,
                    assistant_name TEXT NOT NULL,
                    assistant_role TEXT NOT NULL,
                    system_prompt TEXT NOT NULL,
                    welcome_message TEXT NOT NULL,
                    primary_color TEXT NOT NULL,
                    provider TEXT NOT NULL,
                    base_url TEXT NOT NULL,
                    api_key TEXT NULL,
                    model TEXT NOT NULL,
                    temperature NUMERIC NOT NULL,
                    enabled BOOLEAN NOT NULL,
                    sector_key TEXT NULL,
                    landing_variant TEXT NULL,
                    cta_target TEXT NULL,
                    theme TEXT NULL,
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS chat_sessions (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    session_key TEXT UNIQUE NOT NULL,
                    workspace_id TEXT NOT NULL,
                    sector_key TEXT NULL,
                    landing_variant TEXT NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS chat_messages (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
                    role TEXT NOT NULL,
                    content TEXT NOT NULL,
                    provider TEXT NULL,
                    model TEXT NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS leads (
                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                    session_id UUID NULL REFERENCES chat_sessions(id) ON DELETE SET NULL,
                    name TEXT NULL,
                    email TEXT NULL,
                    phone TEXT NULL,
                    sector_key TEXT NULL,
                    landing_variant TEXT NULL,
                    source TEXT NULL,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );

                CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(user_id);
                CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
                CREATE INDEX IF NOT EXISTS idx_leads_session_id ON leads(session_id);
            `)
        })().catch((error) => {
            schemaPromise = null
            throw error
        })
    }

    return schemaPromise
}

function mapDatabaseError(error) {
    if (!error) return new Error('Veritabanı işlemi başarısız oldu.')
    if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
        const mapped = new Error('Veritabanı adresine erişilemedi. DNS ayarını kontrol edin.')
        mapped.code = 'db_dns'
        return mapped
    }
    if (error.code === 'ECONNREFUSED' || error.code === 'ENETUNREACH') {
        const mapped = new Error('Veritabanı ağına erişilemedi. Ağ/port ayarını kontrol edin.')
        mapped.code = 'db_network'
        return mapped
    }
    if (error.code === '28P01') {
        const mapped = new Error('Veritabanı kimlik bilgileri geçersiz.')
        mapped.code = 'db_auth'
        return mapped
    }
    return error
}

function getDbResolutionReport() {
    const selected = process.env.SUPABASE_CONNECT ? 'SUPABASE_CONNECT' : null
    let runtime = null
    let error = null

    if (selected) {
        try {
            runtime = resolveDatabaseUrl()
        } catch (err) {
            error = { code: err?.code || null, message: err?.message || 'Bilinmeyen hata' }
        }
    }

    return {
        read: ['SUPABASE_CONNECT', 'DATABASE_URL', 'NETLIFY_DATABASE_URL', 'NETLIFY_DATABASE_URL_PRODUCTION'],
        selected,
        ignored: ['DATABASE_URL', 'NETLIFY_DATABASE_URL', 'NETLIFY_DATABASE_URL_PRODUCTION'],
        runtime: runtime
            ? {
                  host: runtime.hostname,
                  port: runtime.port,
                  protocol: runtime.protocol,
                  database: runtime.database
              }
            : null,
        runtimeError: error,
        appRuntimeEnvTableUsed: false
    }
}

module.exports = {
    query,
    withTransaction,
    ensureSchema,
    resolveDatabaseUrl,
    getDbResolutionReport,
    DB_ENV_NAME,
    LEGACY_BROKEN_HOST
}
