const { ensureSchema, query } = require('./db')
const { hashPassword } = require('./password')

async function ensureAdminUserSeeded() {
    await ensureSchema()
<<<<<<< HEAD

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
=======
    const seeded = await query('SELECT id FROM netlify_lite_admin_users LIMIT 1')
    if (seeded.rowCount > 0) return

    const username = process.env.ADMIN_USER_NAME || process.env.ADMIN_USERNAME || ''
    const password = process.env.ADMIN_PASSWORD || ''
    const passwordHashEnv = process.env.ADMIN_PASSWORD_HASH || ''

    if (!username) return
    const passwordHash = passwordHashEnv || (password ? await hashPassword(password) : '')
    if (!passwordHash) return

    await query(
        `INSERT INTO netlify_lite_admin_users (username, password_hash, is_active)
         VALUES ($1, $2, TRUE)
         ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash, is_active = TRUE, updated_at = NOW()`,
        [username.trim(), passwordHash]
    )
>>>>>>> origin/main
}

async function findAdminUserByUsername(username) {
    await ensureAdminUserSeeded()
<<<<<<< HEAD
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
=======
    const result = await query('SELECT id, username, password_hash, is_active FROM netlify_lite_admin_users WHERE username = $1 LIMIT 1', [
        String(username || '').trim()
    ])
    return result.rows[0] || null
}

module.exports = {
    ensureAdminUserSeeded,
    findAdminUserByUsername
>>>>>>> origin/main
}
