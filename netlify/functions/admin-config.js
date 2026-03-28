const { getAssistantConfig, saveAssistantConfig, resetAssistantConfig } = require('./_lib/assistantConfig.kv')
const { envConfig } = require('./_lib/env')
const { requireAdmin } = require('./_lib/adminAuth')

exports.handler = async (event) => {
    try {
        if (event.httpMethod === 'GET') {
            requireAdmin(event)
            const config = await getAssistantConfig()
            return jsonResponse(200, { config, env: envConfig })
        }

        if (event.httpMethod === 'POST') {
            requireAdmin(event)
            const body = JSON.parse(event.body || '{}')
            if (body.action === 'reset') {
                const resetConfig = await resetAssistantConfig()
                return jsonResponse(200, { config: resetConfig })
            }

            const validated = validateInput(body)
            const saved = await saveAssistantConfig(validated)
            return jsonResponse(200, { config: saved })
        }

        return jsonResponse(405, { error: 'Desteklenmeyen metod.' })
    } catch (error) {
        const statusCode = Number.isInteger(error?.statusCode) ? error.statusCode : 400
        return jsonResponse(statusCode, { error: normalizeErrorMessage(error) })
    }
}

function validateInput(input) {
    const payload = {}

    if (input.assistantName !== undefined) payload.assistantName = mustString(input.assistantName, 'assistantName')
    if (input.assistantRole !== undefined) payload.assistantRole = mustString(input.assistantRole, 'assistantRole')
    if (input.systemPrompt !== undefined) payload.systemPrompt = mustString(input.systemPrompt, 'systemPrompt')
    if (input.welcomeMessage !== undefined) payload.welcomeMessage = mustString(input.welcomeMessage, 'welcomeMessage')
    if (input.primaryColor !== undefined) payload.primaryColor = mustColor(input.primaryColor)
    if (input.provider !== undefined) payload.provider = mustString(input.provider, 'provider')
    if (input.baseUrl !== undefined) payload.baseUrl = mustOptionalString(input.baseUrl, 'baseUrl')
    if (input.apiKey !== undefined) payload.apiKey = mustOptionalString(input.apiKey, 'apiKey')
    if (input.model !== undefined) payload.model = mustString(input.model, 'model')
    if (input.temperature !== undefined) payload.temperature = mustTemperature(input.temperature)
    if (input.enabled !== undefined) payload.enabled = mustBoolean(input.enabled)
    if (input.sectorKey !== undefined) payload.sectorKey = mustOptionalString(input.sectorKey, 'sectorKey')
    if (input.landingVariant !== undefined) payload.landingVariant = mustOptionalString(input.landingVariant, 'landingVariant')
    if (input.ctaTarget !== undefined) payload.ctaTarget = mustOptionalString(input.ctaTarget, 'ctaTarget')
    if (input.theme !== undefined) payload.theme = mustOptionalString(input.theme, 'theme')

    return payload
}

function mustString(value, field) {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new Error(`${field} alanı boş olamaz.`)
    }
    return value.trim()
}

function mustOptionalString(value, field) {
    if (value === null || value === '') return ''
    if (typeof value !== 'string') {
        throw new Error(`${field} alanı metin olmalıdır.`)
    }
    return value.trim()
}

function mustColor(value) {
    const text = mustString(value, 'primaryColor')
    if (!/^#[0-9A-Fa-f]{6}$/.test(text)) {
        throw new Error('primaryColor alanı #RRGGBB formatında olmalıdır.')
    }
    return text
}

function mustTemperature(value) {
    const num = Number(value)
    if (!Number.isFinite(num) || num < 0 || num > 1) {
        throw new Error('temperature alanı 0 ile 1 arasında olmalıdır.')
    }
    return num
}

function mustBoolean(value) {
    if (typeof value === 'boolean') return value
    if (value === 'true') return true
    if (value === 'false') return false
    throw new Error('enabled alanı boolean olmalıdır.')
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
    if (message.includes('ENOENT') || message.includes('EACCES') || message.includes('EROFS')) {
        return 'Depolama alanına erişim sırasında geçici bir sorun oluştu.'
    }
    return message || 'İşlem başarısız oldu.'
}
