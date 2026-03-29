const { requireAdmin, buildSessionCookieClear, readCookie, verifySessionToken } = require('./_lib/adminAuth')
const { revokeAdminSession } = require('./_lib/adminSession.repo')
<<<<<<< HEAD
const { bumpSessionVersion } = require('./_lib/adminUser.repo')
=======
>>>>>>> origin/main

exports.handler = async (event) => {
    if (event.httpMethod === 'GET') {
        try {
            const session = await requireAdmin(event)
            return jsonResponse(200, { authenticated: true, username: session.sub })
        } catch {
            return jsonResponse(401, { authenticated: false })
        }
    }

    if (event.httpMethod === 'DELETE') {
        const token = readCookie(event)
        const payload = verifySessionToken(token)
        if (payload?.sid) {
            await revokeAdminSession(payload.sid).catch(() => null)
<<<<<<< HEAD
            if (payload.uid) {
                await bumpSessionVersion(payload.uid).catch(() => null)
            }
        }

=======
        }
>>>>>>> origin/main
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
