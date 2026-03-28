const { getAssistantConfig } = require('./_lib/assistantConfig.kv')

// Bu handler Netlify prototipini hafif tutmak için gerçek Flowise zinciri yerine kontrollü mock yanıt üretir.
exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return jsonResponse(405, { error: 'Desteklenmeyen metod.' })
        }

        const config = await getAssistantConfig()
        if (!config.enabled) {
            return jsonResponse(409, { error: 'Asistan pasif olduğu için yanıt üretemiyor.' })
        }

        const body = JSON.parse(event.body || '{}')
        const message = typeof body.message === 'string' ? body.message.trim() : ''
        if (!message) {
            return jsonResponse(400, { error: 'message alanı zorunludur.' })
        }

        const reply = `${config.assistantName}: ${config.systemPrompt} | Kullanıcı mesajı: ${message}`
        return jsonResponse(200, {
            mode: 'mock',
            assistantName: config.assistantName,
            primaryColor: config.primaryColor,
            reply
        })
    } catch (error) {
        return jsonResponse(400, { error: normalizeErrorMessage(error) })
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

// Bu eşleme kullanıcıya teknik dosya sistemi hatası yerine anlaşılır ve güvenli Türkçe hata metni gösterir.
function normalizeErrorMessage(error) {
    const message = String(error?.message || '')
    if (message.includes('ENOENT') || message.includes('EACCES') || message.includes('EROFS')) {
        return 'Depolama alanına erişim sırasında geçici bir sorun oluştu.'
    }
    return message || 'İşlem başarısız oldu.'
}
