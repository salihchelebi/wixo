const crypto = require('crypto')
const { getActiveAdminSession } = require('./adminSession.repo')

const COOKIE_NAME = 'wixoo_lite_admin_session'
const SESSION_TTL_MS = 1000 * 60 * 60 * 8

function getSessionSecret() {
    return process.env.NETLIFY_LITE_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET || 'wixoo-lite-session-secret'
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
}

function verifySessionToken(token) {
    if (typeof token !== 'string' || !token.includes('.')) return null
    const [body, signature] = token.split('.')
    if (!body || !signature) return null
    if (!timingSafeEqual(signature, sign(body))) return null

    try {
        const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
        if (!payload?.sub || !payload?.sid || !payload?.exp || Date.now() > Number(payload.exp)) return null
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
    const parts = raw.split(';')
    for (const part of parts) {
        const [key, ...rest] = part.trim().split('=')
        if (key === cookieName) {
            return rest.join('=') || null
        }
    }
    return null
}

async function requireAdmin(event) {
    const token = readCookie(event)
    const payload = verifySessionToken(token)
    if (!payload) {
        const error = new Error('Yönetici oturumu gerekli.')
        error.statusCode = 401
        throw error
    }

    const session = await getActiveAdminSession({ id: payload.sid, token })
    if (!session) {
        const error = new Error('Yönetici oturumu geçersiz.')
        error.statusCode = 401
        throw error
    }

    return { ...payload, userId: session.user_id }
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
