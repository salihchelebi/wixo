let Pool
try {
    ;({ Pool } = require('pg'))
} catch {
    Pool = null
}

let pool
let schemaPromise

const DB_ENV_NAME = 'SUPABASE_CONNECT'

function resolveDatabaseUrl() {
    const connectionString = process.env[DB_ENV_NAME]
    if (!connectionString || !String(connectionString).trim()) {
        const error = new Error(`Veritabanı bağlantısı için ${DB_ENV_NAME} zorunludur.`)
        error.code = 'db_env_missing'
        throw error
    }

    return {
        envName: DB_ENV_NAME,
        connectionString: String(connectionString).trim()
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
    return getPool().query(text, params)
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
        throw error
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

function getDbResolutionReport() {
    const hasSupabaseConnect = Boolean(process.env.SUPABASE_CONNECT)
    return {
        read: ['SUPABASE_CONNECT', 'DATABASE_URL', 'NETLIFY_DATABASE_URL', 'NETLIFY_DATABASE_URL_PRODUCTION'],
        selected: hasSupabaseConnect ? 'SUPABASE_CONNECT' : null,
        ignored: ['DATABASE_URL', 'NETLIFY_DATABASE_URL', 'NETLIFY_DATABASE_URL_PRODUCTION']
    }
}

module.exports = {
    query,
    withTransaction,
    ensureSchema,
    resolveDatabaseUrl,
    getDbResolutionReport,
    DB_ENV_NAME
}
