const { ensureSchema, query } = require('./db')
const { hashPassword } = require('./password')

async function ensureAdminUserSeeded() {
    await ensureSchema()

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
}

async function findAdminUserByUsername(username) {
    await ensureAdminUserSeeded()
    const result = await query('SELECT id, username, password_hash, is_active FROM netlify_lite_admin_users WHERE username = $1 LIMIT 1', [
        String(username || '').trim()
    ])
    return result.rows[0] || null
}

module.exports = {
    ensureAdminUserSeeded,
    findAdminUserByUsername
}
