const crypto = require('crypto')

function readEnv(name) {
    const netlifyEnv = typeof Netlify !== 'undefined' && Netlify.env ? Netlify.env : null
    if (netlifyEnv && typeof netlifyEnv.get === 'function') {
        const value = netlifyEnv.get(name)
        if (typeof value === 'string' && value.trim()) {
            return value.trim()
        }
    }

    const fallback = process.env[name]
    return typeof fallback === 'string' && fallback.trim() ? fallback.trim() : ''
}

function getExpectedAdminToken() {
    return readEnv('NETLIFY_LITE_ADMIN_TOKEN') || readEnv('ADMIN_PASSWORD')
}

function getProvidedAdminToken(event) {
    const headers = event.headers || {}
    const authorization = headers.authorization || headers.Authorization || ''
    if (typeof authorization === 'string' && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.slice(7).trim()
    }

    const headerToken = headers['x-netlify-lite-admin-token'] || headers['X-Netlify-Lite-Admin-Token']
    return typeof headerToken === 'string' ? headerToken.trim() : ''
}

function tokensMatch(expected, provided) {
    const left = Buffer.from(expected)
    const right = Buffer.from(provided)
    if (left.length !== right.length) {
        return false
    }
    return crypto.timingSafeEqual(left, right)
}

function assertAdminMutationAuthorized(event) {
    const expected = getExpectedAdminToken()
    if (!expected) {
        const error = new Error('Yönetici mutasyonları için NETLIFY_LITE_ADMIN_TOKEN veya ADMIN_PASSWORD ayarlanmalıdır.')
        error.statusCode = 503
        throw error
    }

    const provided = getProvidedAdminToken(event)
    if (!provided || !tokensMatch(expected, provided)) {
        const error = new Error('Yönetici mutasyonları için yetkilendirme başarısız.')
        error.statusCode = 401
        throw error
    }
}

module.exports = {
    assertAdminMutationAuthorized
}
