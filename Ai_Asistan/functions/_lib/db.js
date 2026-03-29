let Pool
try {
    ;({ Pool } = require('pg'))
} catch {
    Pool = null
}

let pool
let bootstrapPromise

function resolveDatabaseUrl() {
    return (
        process.env.NETLIFY_DATABASE_URL ||
        process.env.NETLIFY_DATABASE_URL_PRODUCTION ||
        process.env.DATABASE_URL ||
        process.env.NEON_DATABASE_URL ||
        ''
    )
}

function getPool() {
    if (pool) return pool
    const connectionString = resolveDatabaseUrl()
    if (!Pool) {
        throw new Error('pg modülü bulunamadı. Function bağımlılıkları içinde pg kurulu olmalıdır.')
    }
    if (!connectionString) {
        throw new Error('Veritabanı bağlantısı bulunamadı. NETLIFY_DATABASE_URL veya DATABASE_URL gerekli.')
    }

    pool = new Pool({
        connectionString,
        ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
        max: 3,
        idleTimeoutMillis: 10000
    })

    return pool
}

async function query(text, params) {
    const db = getPool()
    return db.query(text, params)
}

async function ensureSchema() {
    if (!bootstrapPromise) {
        bootstrapPromise = (async () => {
            await query(`
                CREATE TABLE IF NOT EXISTS netlify_lite_admin_users (
                    id BIGSERIAL PRIMARY KEY,
                    username TEXT UNIQUE NOT NULL,
                    password_hash TEXT NOT NULL,
                    is_active BOOLEAN NOT NULL DEFAULT TRUE,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS netlify_lite_admin_sessions (
                    id TEXT PRIMARY KEY,
                    user_id BIGINT NOT NULL REFERENCES netlify_lite_admin_users(id),
                    token_hash TEXT NOT NULL,
                    expires_at TIMESTAMPTZ NOT NULL,
                    revoked_at TIMESTAMPTZ,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS netlify_lite_assistant_config (
                    id SMALLINT PRIMARY KEY DEFAULT 1,
                    config JSONB NOT NULL,
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS netlify_lite_chat_sessions (
                    id TEXT PRIMARY KEY,
                    workspace_id TEXT,
                    sector_key TEXT,
                    landing_variant TEXT,
                    meta JSONB NOT NULL DEFAULT '{}'::jsonb,
                    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS netlify_lite_chat_messages (
                    id BIGSERIAL PRIMARY KEY,
                    session_id TEXT REFERENCES netlify_lite_chat_sessions(id),
                    role TEXT NOT NULL,
                    message TEXT NOT NULL,
                    meta JSONB,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );

                CREATE TABLE IF NOT EXISTS netlify_lite_leads (
                    id BIGSERIAL PRIMARY KEY,
                    sector_key TEXT,
                    full_name TEXT,
                    phone TEXT,
                    email TEXT,
                    note TEXT,
                    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
                );
            `)
            await query(`ALTER TABLE netlify_lite_chat_sessions ADD COLUMN IF NOT EXISTS workspace_id TEXT;`)
            await query(`ALTER TABLE netlify_lite_chat_sessions ADD COLUMN IF NOT EXISTS landing_variant TEXT;`)
            await query(`ALTER TABLE netlify_lite_chat_sessions ADD COLUMN IF NOT EXISTS meta JSONB NOT NULL DEFAULT '{}'::jsonb;`)
            await query(`ALTER TABLE netlify_lite_chat_sessions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW();`)
        })().catch((error) => {
            bootstrapPromise = null
            throw error
        })
    }
    return bootstrapPromise
}

module.exports = {
    query,
    ensureSchema
}
