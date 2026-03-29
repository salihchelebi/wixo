const { ensureSchema, query } = require('./db')

async function ensureChatSession({ sessionId, workspaceId, sectorKey, landingVariant }) {
    if (!sessionId) return null
    await ensureSchema()

    const safeWorkspaceId = workspaceId || 'default-workspace'
    const safeSectorKey = sectorKey || null
    const safeLandingVariant = landingVariant || null

    const result = await query(
        `INSERT INTO chat_sessions (session_key, workspace_id, sector_key, landing_variant, updated_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (session_key) DO UPDATE SET
            workspace_id = COALESCE(EXCLUDED.workspace_id, chat_sessions.workspace_id),
            sector_key = COALESCE(EXCLUDED.sector_key, chat_sessions.sector_key),
            landing_variant = COALESCE(EXCLUDED.landing_variant, chat_sessions.landing_variant),
            updated_at = NOW()
         RETURNING id, session_key`,
        [sessionId, safeWorkspaceId, safeSectorKey, safeLandingVariant]
    )

    return result.rows[0] || null
}

async function createChatMessage({ sessionId, role, message, meta }) {
    await ensureSchema()
    const existing = await query('SELECT id FROM chat_sessions WHERE session_key = $1 LIMIT 1', [sessionId])
    const session = existing.rows[0] || (await ensureChatSession({ sessionId }))
    if (!session?.id) return

    await query(
        `INSERT INTO chat_messages (session_id, role, content, provider, model)
         VALUES ($1, $2, $3, $4, $5)`,
        [session.id, role, message, meta?.provider || null, meta?.model || null]
    )
}

module.exports = {
    ensureChatSession,
    createChatMessage
}
