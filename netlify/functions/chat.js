const crypto = require('crypto')
const { getAssistantConfig } = require('./_lib/assistantConfig.kv')
const { ensureChatSession, createChatMessage } = require('./_lib/chatSession.repo')

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

        const sessionId = typeof body.sessionId === 'string' && body.sessionId.trim() ? body.sessionId.trim() : crypto.randomUUID()
        await ensureChatSession({ sessionId, sectorKey: config.sectorKey }).catch(() => null)
        await createChatMessage({ sessionId, role: 'user', message, meta: { provider: config.provider } }).catch(() => null)

        const reply = await buildReply({ config, message })
        await createChatMessage({ sessionId, role: 'assistant', message: reply, meta: { provider: config.provider } }).catch(() => null)

        return jsonResponse(200, {
            mode: config.provider === 'ollama' ? 'ollama' : 'fallback',
            assistantName: config.assistantName,
            primaryColor: config.primaryColor,
            reply
        })
    } catch (error) {
        const mapped = mapChatError(error)
        return jsonResponse(mapped.statusCode, { error: mapped.message })
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
        const error = new Error(data.error || `Ollama isteği başarısız oldu (${response.status}).`)
        error.code = 'PROVIDER_BAD_RESPONSE'
        throw error
    }

    const text = typeof data.response === 'string' ? data.response.trim() : ''
    if (!text) {
        const error = new Error('Ollama boş yanıt döndürdü.')
        error.code = 'PROVIDER_BAD_RESPONSE'
        throw error
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

function mapChatError(error) {
    const message = String(error?.message || '')
    if (error?.code === 'PROVIDER_BAD_RESPONSE') {
        return { statusCode: 502, message }
    }
    if (message.includes('fetch failed') || message.includes('ECONNREFUSED')) {
        return { statusCode: 503, message: 'Ollama servisine ulaşılamadı. baseUrl ayarını kontrol edin.' }
    }
    if (message.includes('message alanı zorunludur')) {
        return { statusCode: 400, message }
    }
    if (message.includes('Asistan pasif')) {
        return { statusCode: 409, message }
    }
    if (message.includes('Veritabanı bağlantısı')) {
        return { statusCode: 500, message: 'Veritabanı bağlantısı yapılamadı.' }
    }
    return { statusCode: 400, message: message || 'İşlem başarısız oldu.' }
}
