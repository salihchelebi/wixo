const { createLead } = require('./_lib/lead.repo')

exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return jsonResponse(405, { code: 'validation', error: 'Desteklenmeyen metod.' })
        }

        const body = JSON.parse(event.body || '{}')
        const lead = await createLead({
            sessionId: typeof body.sessionId === 'string' ? body.sessionId.trim() : '',
            name: typeof body.name === 'string' ? body.name.trim() : '',
            phone: typeof body.phone === 'string' ? body.phone.trim() : '',
            email: typeof body.email === 'string' ? body.email.trim() : '',
            sectorKey: typeof body.sectorKey === 'string' ? body.sectorKey.trim() : '',
            landingVariant: typeof body.landingVariant === 'string' ? body.landingVariant.trim() : '',
            source: typeof body.source === 'string' ? body.source.trim() : 'landing'
        })

        return jsonResponse(200, { code: 'ok', lead })
    } catch (error) {
        return jsonResponse(400, { code: 'db', error: String(error?.message || 'Lead kaydı oluşturulamadı.') })
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
