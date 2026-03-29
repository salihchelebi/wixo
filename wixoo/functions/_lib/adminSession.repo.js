const crypto = require('crypto')
const { ensureSchema, query } = require('./db')

function hashToken(token) {
    return crypto
        .createHash('sha256')
        .update(String(token || ''))
        .digest('hex')
}

async function createAdminSession({ id, userId, token, expiresAt }) {
    await ensureSchema()
    await query(
        `INSERT INTO wixoo_lite_admin_sessions (id, user_id, token_hash, expires_at)
         VALUES ($1, $2, $3, $4)`,
        [id, userId, hashToken(token), new Date(expiresAt)]
    )
}

async function getActiveAdminSession({ id, token }) {
    await ensureSchema()
    const result = await query(
        `SELECT s.id, s.user_id, s.expires_at, s.revoked_at, u.username
         FROM wixoo_lite_admin_sessions s
         JOIN wixoo_lite_admin_users u ON u.id = s.user_id
         WHERE s.id = $1 AND s.token_hash = $2 AND s.revoked_at IS NULL AND s.expires_at > NOW() AND u.is_active = TRUE
         LIMIT 1`,
        [id, hashToken(token)]
    )
    if (!result.rows[0]) return null

    await query('UPDATE wixoo_lite_admin_sessions SET last_seen_at = NOW() WHERE id = $1', [id])
    return result.rows[0]
}

async function revokeAdminSession(id) {
    await ensureSchema()
    await query('UPDATE wixoo_lite_admin_sessions SET revoked_at = NOW() WHERE id = $1', [id])
}

module.exports = {
    createAdminSession,
    getActiveAdminSession,
    revokeAdminSession
}
