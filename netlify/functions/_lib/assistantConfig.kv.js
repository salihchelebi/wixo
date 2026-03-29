const { defaultAssistantConfig } = require('./assistantConfig.defaults')
const { getStoredAssistantConfig, upsertAssistantConfig } = require('./assistantConfig.repo')
const fs = require('fs/promises')
const path = require('path')

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
    if (stored) {
        return { ...defaultAssistantConfig, ...stored }
    }

    const legacy = await readLegacyFileConfig()
    if (legacy) {
        return { ...defaultAssistantConfig, ...legacy }
    }

    return { ...defaultAssistantConfig }
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

async function readLegacyFileConfig() {
    try {
        const legacyPath = path.resolve(__dirname, '..', '..', 'data', 'kv.json')
        const raw = await fs.readFile(legacyPath, 'utf8')
        return JSON.parse(raw)
    } catch {
        return null
    }
}
