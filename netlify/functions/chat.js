const { getAssistantConfig } = require('./_lib/assistantConfig.kv')

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

        const reply = await buildReply({ config, message })
        return jsonResponse(200, {
            mode: config.provider === 'ollama' ? 'ollama' : 'mock',
            assistantName: config.assistantName,
            primaryColor: config.primaryColor,
            reply
        })
    } catch (error) {
        return jsonResponse(400, { error: normalizeErrorMessage(error) })
    }
}

async function buildReply({ config, message }) {
    if (config.provider === 'ollama') {
        return callOllama({
            baseUrl: config.baseUrl,
            apiKey: config.apiKey,
            model: config.model,
            temperature: config.temperature,
            prompt: `${config.systemPrompt}\n\nKullanıcı mesajı: ${message}`
        })
    }

    return `${config.assistantName}: ${config.systemPrompt} | Kullanıcı mesajı: ${message}`
}

async function callOllama({ baseUrl, apiKey, model, temperature, prompt }) {
    const endpoint = `${String(baseUrl || 'http://localhost:11434').replace(/\/$/, '')}/api/generate`
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            ...(apiKey ? { authorization: `Bearer ${apiKey}` } : {})
        },
        body: JSON.stringify({
            model,
            prompt,
            stream: false,
            options: { temperature }
        })
    })

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
        throw new Error(data.error || `Ollama isteği başarısız oldu (${response.status}).`)
    }

    const text = typeof data.response === 'string' ? data.response.trim() : ''
    if (!text) {
        throw new Error('Ollama boş yanıt döndürdü.')
    }

    return text
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

function normalizeErrorMessage(error) {
    const message = String(error?.message || '')
    if (message.includes('fetch failed') || message.includes('ECONNREFUSED')) {
        return 'Ollama servisine ulaşılamadı. baseUrl ayarını kontrol edin.'
    }
    if (message.includes('ENOENT') || message.includes('EACCES') || message.includes('EROFS')) {
        return 'Depolama alanına erişim sırasında geçici bir sorun oluştu.'
    }
    return message || 'İşlem başarısız oldu.'
}
