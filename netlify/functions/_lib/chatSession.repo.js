const { ensureSchema, query } = require('./db')

<<<<<<< HEAD
async function ensureChatSession({ sessionId, workspaceId = 'default-workspace', sectorKey, landingVariant }) {
    if (!sessionId) return null
    await ensureSchema()

    const result = await query(
        `INSERT INTO chat_sessions (session_key, workspace_id, sector_key, landing_variant, updated_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (session_key) DO UPDATE SET
            workspace_id = EXCLUDED.workspace_id,
            sector_key = EXCLUDED.sector_key,
            landing_variant = EXCLUDED.landing_variant,
            updated_at = NOW()
         RETURNING id, session_key`,
        [sessionId, workspaceId, sectorKey || null, landingVariant || null]
    )

    return result.rows[0] || null
=======
async function ensureChatSession({ sessionId, sectorKey }) {
    if (!sessionId) return
    await ensureSchema()
    await query(
        `INSERT INTO netlify_lite_chat_sessions (id, sector_key)
         VALUES ($1, $2)
         ON CONFLICT (id) DO NOTHING`,
        [sessionId, sectorKey || null]
    )
>>>>>>> origin/main
}

async function createChatMessage({ sessionId, role, message, meta }) {
    await ensureSchema()
<<<<<<< HEAD
    const session = await ensureChatSession({ sessionId })
    if (!session?.id) return

    await query(
        `INSERT INTO chat_messages (session_id, role, content, provider, model)
         VALUES ($1, $2, $3, $4, $5)`,
        [session.id, role, message, meta?.provider || null, meta?.model || null]
=======
    await query(
        `INSERT INTO netlify_lite_chat_messages (session_id, role, message, meta)
         VALUES ($1, $2, $3, $4::jsonb)`,
        [sessionId || null, role, message, JSON.stringify(meta || {})]
>>>>>>> origin/main
    )
}

module.exports = {
    ensureChatSession,
    createChatMessage
}
