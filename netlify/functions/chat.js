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
            assistantName: config.assistantName,
            primaryColor: config.primaryColor,
            reply
        })
    } catch (error) {
        const mapped = mapChatError(error)
        return jsonResponse(mapped.statusCode, { code: mapped.code, error: mapped.message })
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

    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
        const error = new Error(data.error || `Ollama isteği başarısız oldu (${response.status}).`)
        error.code = 'ollama_connection'
        throw error
    }

    const text = typeof data.response === 'string' ? data.response.trim() : ''
    if (!text) {
        const error = new Error('Ollama boş yanıt döndürdü.')
        error.code = 'empty_response'
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
    if (error?.code === 'ollama_connection') {
        return { statusCode: 503, code: 'ollama_connection', message }
    }
    if (error?.code === 'empty_response') {
        return { statusCode: 502, code: 'empty_response', message }
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
}
