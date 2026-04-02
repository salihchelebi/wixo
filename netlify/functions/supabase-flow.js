const { insertDemoMessage } = require('./_lib/supabaseRest')

exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return jsonResponse(405, { error: 'Desteklenmeyen metod.' })
        }

        const body = JSON.parse(event.body || '{}')
        const message = typeof body.message === 'string' ? body.message.trim() : ''

        if (!message) {
            return jsonResponse(400, { error: 'message alanı zorunludur.' })
        }

        const record = await insertDemoMessage({ message, source: 'netlify-function' })

        return jsonResponse(200, {
            status: 'ok',
            record
        })
    } catch (error) {
        return jsonResponse(500, {
            error: String(error?.message || 'Supabase işlemi başarısız oldu.')
        })
    }
}

function jsonResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            'content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(body)
    }
}
