const crypto = require('crypto')
const { getAssistantConfig } = require('./_lib/assistantConfig.kv')
const { ensureChatSession, createChatMessage } = require('./_lib/chatSession.repo')

exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return jsonResponse(405, { code: 'validation', error: 'Desteklenmeyen metod.' })
        }

        const body = JSON.parse(event.body || '{}')
        const message = typeof body.message === 'string' ? body.message.trim() : ''
        if (!message) {
            return jsonResponse(400, { code: 'validation', error: 'message alanı zorunludur.' })
        }

<<<<<<< HEAD
        const config = await getAssistantConfig(typeof body.workspaceId === 'string' ? body.workspaceId : undefined)
        if (!config.enabled) {
            return jsonResponse(409, { code: 'config', error: 'Asistan pasif olduğu için yanıt üretemiyor.' })
        }

        const sessionId = typeof body.sessionId === 'string' && body.sessionId.trim() ? body.sessionId.trim() : crypto.randomUUID()
        await ensureChatSession({
            sessionId,
            workspaceId: config.workspaceId,
            sectorKey: config.sectorKey,
            landingVariant: config.landingVariant
        })

        await createChatMessage({ sessionId, role: 'user', message, meta: { provider: config.provider, model: config.model } })
        const reply = await buildReply({ config, message })
        await createChatMessage({ sessionId, role: 'assistant', message: reply, meta: { provider: config.provider, model: config.model } })

        return jsonResponse(200, {
            code: 'ok',
            sessionId,
            mode: config.provider,
=======
        const sessionId = typeof body.sessionId === 'string' && body.sessionId.trim() ? body.sessionId.trim() : crypto.randomUUID()
        await ensureChatSession({ sessionId, sectorKey: config.sectorKey }).catch(() => null)
        await createChatMessage({ sessionId, role: 'user', message, meta: { provider: config.provider } }).catch(() => null)

        const reply = await buildReply({ config, message })
        await createChatMessage({ sessionId, role: 'assistant', message: reply, meta: { provider: config.provider } }).catch(() => null)

        return jsonResponse(200, {
            mode: config.provider === 'ollama' ? 'ollama' : 'fallback',
>>>>>>> origin/main
            assistantName: config.assistantName,
            primaryColor: config.primaryColor,
            reply
        })
    } catch (error) {
        const mapped = mapChatError(error)
<<<<<<< HEAD
        return jsonResponse(mapped.statusCode, { code: mapped.code, error: mapped.message })
=======
        return jsonResponse(mapped.statusCode, { error: mapped.message })
>>>>>>> origin/main
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

<<<<<<< HEAD
    if (['tavily', 'openai', 'gemini', 'claude'].includes(config.provider)) {
        const error = new Error(`${config.provider} sağlayıcısı bu sürümde henüz aktif değil.`)
        error.code = 'config'
        throw error
    }

    const error = new Error('Seçilen sağlayıcı desteklenmiyor.')
    error.code = 'config'
    throw error
=======
    return `${config.assistantName}: ${config.systemPrompt} | Kullanıcı mesajı: ${message}`
>>>>>>> origin/main
}

async function callOllama({ baseUrl, apiKey, model, temperature, prompt }) {
    const endpoint = `${String(baseUrl || 'http://localhost:11434').replace(/\/$/, '')}/api/generate`
<<<<<<< HEAD
    let response
    try {
        response = await fetch(endpoint, {
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
    } catch {
        const err = new Error('Ollama servisine bağlanılamadı. baseUrl ayarını kontrol edin.')
        err.code = 'ollama_connection'
        throw err
    }
=======
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
>>>>>>> origin/main

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
        const error = new Error(data.error || `Ollama isteği başarısız oldu (${response.status}).`)
<<<<<<< HEAD
        error.code = 'ollama_connection'
=======
        error.code = 'PROVIDER_BAD_RESPONSE'
>>>>>>> origin/main
        throw error
    }

    const text = typeof data.response === 'string' ? data.response.trim() : ''
    if (!text) {
        const error = new Error('Ollama boş yanıt döndürdü.')
<<<<<<< HEAD
        error.code = 'empty_response'
=======
        error.code = 'PROVIDER_BAD_RESPONSE'
>>>>>>> origin/main
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
<<<<<<< HEAD
    if (error?.code === 'ollama_connection') {
        return { statusCode: 503, code: 'ollama_connection', message }
    }
    if (error?.code === 'empty_response') {
        return { statusCode: 502, code: 'empty_response', message }
    }
    if (error?.code === 'config') {
        return { statusCode: 400, code: 'config', message }
    }
    if (message.includes('message alanı zorunludur')) {
        return { statusCode: 400, code: 'validation', message }
    }
    if (message.includes('Asistan pasif')) {
        return { statusCode: 409, code: 'config', message }
    }
    if (message.includes('Veritabanı') || message.includes('db_')) {
        return { statusCode: 500, code: 'db', message: 'Veritabanı işlemi sırasında hata oluştu.' }
    }
    if (message.includes('oturumu')) {
        return { statusCode: 401, code: 'auth', message }
    }
    return { statusCode: 400, code: 'validation', message: message || 'İşlem başarısız oldu.' }
=======
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
>>>>>>> origin/main
}
