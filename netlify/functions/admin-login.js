const { buildSessionCookie, buildSessionCookieClear, createSessionId, createSessionToken, SESSION_TTL_MS } = require('./_lib/adminAuth')
const { findAdminUserByUsername, touchAdminLastLogin } = require('./_lib/adminUser.repo')
const { createAdminSession } = require('./_lib/adminSession.repo')
const { verifyPassword } = require('./_lib/password')

exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return jsonResponse(405, { code: 'validation', error: 'Desteklenmeyen metod.' })
        }

        const body = JSON.parse(event.body || '{}')
        const username = typeof body.username === 'string' ? body.username.trim() : ''
        const password = typeof body.password === 'string' ? body.password : ''

        if (!username || !password) {
            return jsonResponse(400, { code: 'validation', error: 'username ve password zorunludur.' })
        }

        const admin = await findAdminUserByUsername(username)
        if (!admin || !admin.is_active) {
            return jsonResponse(401, { code: 'auth', error: 'Kullanıcı adı veya parola hatalı.' })
        }

        const passwordOk = await verifyPassword(password, admin.password_hash)
        if (!passwordOk) {
            return jsonResponse(401, { code: 'auth', error: 'Kullanıcı adı veya parola hatalı.' })
        }

        const sessionId = createSessionId()
        const token = createSessionToken({
            sub: admin.username,
            uid: admin.id,
            ver: Number(admin.session_version),
            sid: sessionId
        })

        await createAdminSession({
            id: sessionId,
            userId: admin.id,
            token,
            expiresAt: Date.now() + SESSION_TTL_MS
        })
        await touchAdminLastLogin(admin.id)

        return jsonResponse(200, { success: true }, { 'set-cookie': buildSessionCookie(token) })
    } catch (error) {
        console.error('[admin-login] hata', { code: error?.code, message: error?.message })
        return jsonResponse(400, { code: 'auth', error: 'Giriş işlemi şu anda tamamlanamadı. Lütfen tekrar deneyin.' }, { 'set-cookie': buildSessionCookieClear() })
    }
}

function jsonResponse(statusCode, body, headers = {}) {
    return {
        statusCode,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            ...headers
        },
        body: JSON.stringify(body)
    }
}
