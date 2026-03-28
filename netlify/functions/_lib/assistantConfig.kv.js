const fs = require('fs/promises')
const path = require('path')
const { defaultAssistantConfig } = require('./assistantConfig.defaults')

const kvFilePath = resolveKvFilePath()

function resolveKvFilePath() {
    if (process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY) {
        return path.resolve('/tmp', 'netlify-lite-kv.json')
    }
    return path.resolve(__dirname, '..', '..', 'data', 'kv.json')
}

async function ensureKvFile() {
    try {
        await fs.access(kvFilePath)
    } catch {
        await fs.mkdir(path.dirname(kvFilePath), { recursive: true })
        await fs.writeFile(kvFilePath, `${JSON.stringify(defaultAssistantConfig, null, 4)}\n`, 'utf8')
    }
}

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
    await ensureKvFile()
    const raw = await fs.readFile(kvFilePath, 'utf8')
    const parsed = JSON.parse(raw)
    return { ...defaultAssistantConfig, ...parsed }
}

async function saveAssistantConfig(input) {
    const current = await getAssistantConfig()
    const sanitized = sanitizeInput(input)
    const merged = {
        ...current,
        ...Object.fromEntries(Object.entries(sanitized).filter(([, value]) => value !== undefined)),
        updatedAt: new Date().toISOString()
    }
    await fs.writeFile(kvFilePath, `${JSON.stringify(merged, null, 4)}\n`, 'utf8')
    return merged
}

async function resetAssistantConfig() {
    await fs.writeFile(kvFilePath, `${JSON.stringify(defaultAssistantConfig, null, 4)}\n`, 'utf8')
    return { ...defaultAssistantConfig }
}

module.exports = {
    getAssistantConfig,
    saveAssistantConfig,
    resetAssistantConfig
}
