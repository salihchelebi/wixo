const { ensureSchema, query } = require('./db')

async function createLead({ sectorKey, fullName, phone, email, note }) {
    await ensureSchema()
    const result = await query(
        `INSERT INTO netlify_lite_leads (sector_key, full_name, phone, email, note)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, created_at`,
        [sectorKey || null, fullName || null, phone || null, email || null, note || null]
    )
    return result.rows[0]
}

module.exports = {
    createLead
}
