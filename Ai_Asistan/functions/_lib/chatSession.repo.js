const { ensureSchema, query } = require('./db')

async function ensureChatSession({ sessionId, workspaceId, sectorKey, landingVariant, meta }) {
    if (!sessionId) return
    await ensureSchema()
    await query(
        `INSERT INTO netlify_lite_chat_sessions (id, workspace_id, sector_key, landing_variant, meta)
         VALUES ($1, $2, $3, $4, $5::jsonb)
         ON CONFLICT (id) DO UPDATE
         SET
             workspace_id = COALESCE(netlify_lite_chat_sessions.workspace_id, EXCLUDED.workspace_id),
             sector_key = COALESCE(netlify_lite_chat_sessions.sector_key, EXCLUDED.sector_key),
             landing_variant = COALESCE(netlify_lite_chat_sessions.landing_variant, EXCLUDED.landing_variant),
             meta = COALESCE(netlify_lite_chat_sessions.meta, '{}'::jsonb) || COALESCE(EXCLUDED.meta, '{}'::jsonb),
             updated_at = NOW()`,
        [sessionId, workspaceId || null, sectorKey || null, landingVariant || null, JSON.stringify(meta || {})]
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
