const { defaultAssistantConfig } = require('./assistantConfig.defaults')
const { getStoredAssistantConfig, upsertAssistantConfig } = require('./assistantConfig.repo')

function sanitizeInput(input = {}) {
    const next = {
        assistantName: sanitizeString(input.assistantName),
        assistantRole: sanitizeString(input.assistantRole),
        systemPrompt: sanitizeString(input.systemPrompt),
        welcomeMessage: sanitizeString(input.welcomeMessage),
        primaryColor: sanitizeString(input.primaryColor),
        provider: sanitizeString(input.provider),
        baseUrl: sanitizeString(input.baseUrl),
        apiKey: sanitizeString(input.apiKey),
        model: sanitizeString(input.model),
        temperature: Number(input.temperature),
        enabled: input.enabled,
        sectorKey: sanitizeString(input.sectorKey),
        landingVariant: sanitizeString(input.landingVariant),
        ctaTarget: sanitizeString(input.ctaTarget),
        theme: sanitizeString(input.theme)
    }

    if (Number.isNaN(next.temperature)) next.temperature = undefined
    if (typeof next.enabled !== 'boolean') next.enabled = undefined

    return next
}

function sanitizeString(value) {
    if (typeof value !== 'string') return undefined
    return value.trim()
}

async function getAssistantConfig() {
    const stored = await getStoredAssistantConfig().catch(() => null)
    return { ...defaultAssistantConfig, ...(stored || {}) }
}

async function saveAssistantConfig(input) {
    const current = await getAssistantConfig()
    const sanitized = sanitizeInput(input)
    const merged = {
        ...current,
        ...Object.fromEntries(Object.entries(sanitized).filter(([, value]) => value !== undefined)),
        updatedAt: new Date().toISOString()
    }

    await upsertAssistantConfig(merged)
    return merged
}

async function resetAssistantConfig() {
    const next = { ...defaultAssistantConfig, updatedAt: new Date().toISOString() }
    await upsertAssistantConfig(next)
    return next
}

module.exports = {
    getAssistantConfig,
    saveAssistantConfig,
    resetAssistantConfig
}
