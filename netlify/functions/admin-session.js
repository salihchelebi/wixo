const { requireAdmin, buildSessionCookieClear } = require('./_lib/adminAuth')

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        try {
            const session = requireAdmin(event)
            return jsonResponse(200, { authenticated: true, username: session.sub })
        } catch {
            return jsonResponse(401, { authenticated: false })
        }
    }

    if (event.httpMethod === 'DELETE') {
        return jsonResponse(200, { success: true }, { 'set-cookie': buildSessionCookieClear() })
    }

    return jsonResponse(405, { error: 'Desteklenmeyen metod.' })
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
