const { ensureSchema, query } = require('./db')

async function ensureChatSession({ sessionId, sectorKey }) {
    if (!sessionId) return
    await ensureSchema()
    await query(
        `INSERT INTO netlify_lite_chat_sessions (id, sector_key)
         VALUES ($1, $2)
         ON CONFLICT (id) DO NOTHING`,
        [sessionId, sectorKey || null]
    )
}

async function createChatMessage({ sessionId, role, message, meta }) {
    await ensureSchema()
    await query(
        `INSERT INTO netlify_lite_chat_messages (session_id, role, message, meta)
         VALUES ($1, $2, $3, $4::jsonb)`,
        [sessionId || null, role, message, JSON.stringify(meta || {})]
    )
}

module.exports = {
    ensureChatSession,
    createChatMessage
}
