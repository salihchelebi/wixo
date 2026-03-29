const { ensureSchema, query } = require('./db')
const { hashPassword } = require('./password')

async function ensureAdminUserSeeded() {
    await ensureSchema()

    const username = String(process.env.ADMIN_USER_NAME || '').trim()
    const password = String(process.env.ADMIN_PASSWORD || '')
    if (!username || !password) return { seeded: false, reason: 'env_missing' }

    const countResult = await query('SELECT COUNT(*)::int AS total FROM admin_users')
    const total = Number(countResult.rows[0]?.total || 0)
    if (total > 0) return { seeded: false, reason: 'already_exists' }

    const passwordHash = await hashPassword(password)
    await query(
        `INSERT INTO admin_users (username, password_hash, role, is_active, session_version)
         VALUES ($1, $2, 'admin', TRUE, 1)
         ON CONFLICT (username) DO NOTHING`,
        [username, passwordHash]
    )

    return { seeded: true }
}

async function findAdminUserByUsername(username) {
    await ensureAdminUserSeeded()
    const result = await query(
        `SELECT id, username, password_hash, role, is_active, session_version, last_login_at
         FROM admin_users
         WHERE username = $1
         LIMIT 1`,
        [String(username || '').trim()]
    )
    return result.rows[0] || null
}

async function touchAdminLastLogin(userId) {
    await ensureSchema()
    await query('UPDATE admin_users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1', [userId])
}

async function bumpSessionVersion(userId) {
    await ensureSchema()
    await query('UPDATE admin_users SET session_version = session_version + 1, updated_at = NOW() WHERE id = $1', [userId])
}

module.exports = {
    ensureAdminUserSeeded,
    findAdminUserByUsername,
    touchAdminLastLogin,
    bumpSessionVersion
}
