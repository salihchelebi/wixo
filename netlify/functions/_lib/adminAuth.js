const crypto = require('crypto')
const { getActiveAdminSession } = require('./adminSession.repo')

const COOKIE_NAME = 'netlify_lite_admin_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 8

function getSessionSecret() {
<<<<<<< HEAD
    const secret = process.env.NETLIFY_AUTH_TOKEN
    if (!secret || secret.length < 32) {
        const error = new Error('Oturum imzası için NETLIFY_AUTH_TOKEN en az 32 karakter olmalıdır.')
        error.code = 'auth_secret_missing'
        throw error
    }
    return secret
}

function createSessionToken({ sub, uid, ver, sid }) {
    const payload = {
        sub,
        uid,
        ver,
        sid,
        exp: Date.now() + SESSION_TTL_MS
    }
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
    return `${body}.${sign(body)}`
=======
    return process.env.NETLIFY_LITE_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || 'netlify-lite-session-secret'
}

function createSessionToken({ username, sessionId }) {
    const payload = {
        sub: username,
        sid: sessionId,
        exp: Date.now() + SESSION_TTL_MS
    }
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
    const signature = sign(body)
    return `${body}.${signature}`
>>>>>>> origin/main
}

function verifySessionToken(token) {
    if (typeof token !== 'string' || !token.includes('.')) return null
    const [body, signature] = token.split('.')
    if (!body || !signature) return null
    if (!timingSafeEqual(signature, sign(body))) return null

    try {
        const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
<<<<<<< HEAD
        if (!payload?.sub || !payload?.uid || !payload?.sid || !payload?.ver || !payload?.exp) return null
        if (Date.now() > Number(payload.exp)) return null
=======
        if (!payload?.sub || !payload?.sid || !payload?.exp || Date.now() > Number(payload.exp)) return null
>>>>>>> origin/main
        return payload
    } catch {
        return null
    }
}

function buildSessionCookie(token) {
    return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`
}

function buildSessionCookieClear() {
    return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Secure; Max-Age=0`
}

function readCookie(event, cookieName = COOKIE_NAME) {
    const raw = event?.headers?.cookie || event?.headers?.Cookie || ''
    if (!raw) return null
<<<<<<< HEAD

    for (const part of raw.split(';')) {
        const [key, ...rest] = part.trim().split('=')
        if (key === cookieName) return rest.join('=') || null
=======
    const parts = raw.split(';')
    for (const part of parts) {
        const [key, ...rest] = part.trim().split('=')
        if (key === cookieName) {
            return rest.join('=') || null
        }
>>>>>>> origin/main
    }
    return null
}

async function requireAdmin(event) {
    const token = readCookie(event)
    const payload = verifySessionToken(token)
    if (!payload) {
        const error = new Error('Yönetici oturumu gerekli.')
        error.statusCode = 401
<<<<<<< HEAD
        error.code = 'auth'
=======
>>>>>>> origin/main
        throw error
    }

    const session = await getActiveAdminSession({ id: payload.sid, token })
<<<<<<< HEAD
    if (!session || !session.is_active || Number(session.session_version) !== Number(payload.ver)) {
        const error = new Error('Yönetici oturumu geçersiz veya süresi dolmuş.')
        error.statusCode = 401
        error.code = 'auth'
        throw error
    }

    return payload
=======
    if (!session) {
        const error = new Error('Yönetici oturumu geçersiz.')
        error.statusCode = 401
        throw error
    }

    return { ...payload, userId: session.user_id }
>>>>>>> origin/main
}

function sign(data) {
    return crypto.createHmac('sha256', getSessionSecret()).update(data).digest('base64url')
}

function timingSafeEqual(a, b) {
    const left = Buffer.from(String(a))
    const right = Buffer.from(String(b))
    if (left.length !== right.length) return false
    return crypto.timingSafeEqual(left, right)
}

function createSessionId() {
    return crypto.randomUUID()
}

module.exports = {
    COOKIE_NAME,
    SESSION_TTL_MS,
    createSessionId,
    createSessionToken,
    verifySessionToken,
    buildSessionCookie,
    buildSessionCookieClear,
    readCookie,
    requireAdmin
}
