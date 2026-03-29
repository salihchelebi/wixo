const { ensureSchema, query } = require('./db')

<<<<<<< HEAD
async function createLead({ sessionId, name, phone, email, sectorKey, landingVariant, source }) {
    await ensureSchema()

    let resolvedSessionId = null
    if (sessionId) {
        const session = await query('SELECT id FROM chat_sessions WHERE session_key = $1 LIMIT 1', [sessionId])
        resolvedSessionId = session.rows[0]?.id || null
    }

    const result = await query(
        `INSERT INTO leads (session_id, name, phone, email, sector_key, landing_variant, source)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, created_at`,
        [resolvedSessionId, name || null, phone || null, email || null, sectorKey || null, landingVariant || null, source || null]
=======
async function createLead({ sectorKey, fullName, phone, email, note }) {
    await ensureSchema()
    const result = await query(
        `INSERT INTO netlify_lite_leads (sector_key, full_name, phone, email, note)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, created_at`,
        [sectorKey || null, fullName || null, phone || null, email || null, note || null]
>>>>>>> origin/main
    )
    return result.rows[0]
}

module.exports = {
    createLead
}
