const crypto = require('crypto')
const { ensureSchema, query } = require('./db')

function hashToken(token) {
<<<<<<< HEAD
    return crypto.createHash('sha256').update(String(token || '')).digest('hex')
=======
    return crypto
        .createHash('sha256')
        .update(String(token || ''))
        .digest('hex')
>>>>>>> origin/main
}

async function createAdminSession({ id, userId, token, expiresAt }) {
    await ensureSchema()
    await query(
<<<<<<< HEAD
        `INSERT INTO admin_sessions (id, user_id, token_hash, expires_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (id) DO UPDATE
         SET user_id = EXCLUDED.user_id,
             token_hash = EXCLUDED.token_hash,
             expires_at = EXCLUDED.expires_at,
             revoked_at = NULL,
             last_seen_at = NOW()`,
=======
        `INSERT INTO netlify_lite_admin_sessions (id, user_id, token_hash, expires_at)
         VALUES ($1, $2, $3, $4)`,
>>>>>>> origin/main
        [id, userId, hashToken(token), new Date(expiresAt)]
    )
}

async function getActiveAdminSession({ id, token }) {
    await ensureSchema()
    const result = await query(
<<<<<<< HEAD
        `SELECT s.id, s.user_id, s.expires_at, s.revoked_at, s.last_seen_at,
                u.username, u.is_active, u.session_version
         FROM admin_sessions s
         JOIN admin_users u ON u.id = s.user_id
         WHERE s.id = $1
           AND s.token_hash = $2
           AND s.revoked_at IS NULL
           AND s.expires_at > NOW()
         LIMIT 1`,
        [id, hashToken(token)]
    )

    const row = result.rows[0]
    if (!row) return null

    await query('UPDATE admin_sessions SET last_seen_at = NOW() WHERE id = $1', [id])
    return row
=======
        `SELECT s.id, s.user_id, s.expires_at, s.revoked_at, u.username
         FROM netlify_lite_admin_sessions s
         JOIN netlify_lite_admin_users u ON u.id = s.user_id
         WHERE s.id = $1 AND s.token_hash = $2 AND s.revoked_at IS NULL AND s.expires_at > NOW() AND u.is_active = TRUE
         LIMIT 1`,
        [id, hashToken(token)]
    )
    if (!result.rows[0]) return null

    await query('UPDATE netlify_lite_admin_sessions SET last_seen_at = NOW() WHERE id = $1', [id])
    return result.rows[0]
>>>>>>> origin/main
}

async function revokeAdminSession(id) {
    await ensureSchema()
<<<<<<< HEAD
    await query('UPDATE admin_sessions SET revoked_at = NOW() WHERE id = $1', [id])
=======
    await query('UPDATE netlify_lite_admin_sessions SET revoked_at = NOW() WHERE id = $1', [id])
>>>>>>> origin/main
}

module.exports = {
    createAdminSession,
    getActiveAdminSession,
    revokeAdminSession
}
