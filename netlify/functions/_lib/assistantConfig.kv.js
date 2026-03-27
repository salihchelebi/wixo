const fs = require('fs/promises')
const path = require('path')
const { defaultAssistantConfig } = require('./assistantConfig.defaults')

// Bu adaptör tüm veri erişimini tek yerden geçirerek ileride Neon geçişini risksiz hale getirir.
const kvFilePath = path.resolve(__dirname, '..', '..', 'data', 'kv.json')

async function ensureKvFile() {
    try {
        await fs.access(kvFilePath)
    } catch {
        await fs.mkdir(path.dirname(kvFilePath), { recursive: true })
        await fs.writeFile(kvFilePath, `${JSON.stringify(defaultAssistantConfig, null, 2)}\n`, 'utf8')
    }
}

function sanitizeInput(input = {}) {
    const next = {
        assistantName: typeof input.assistantName === 'string' ? input.assistantName.trim() : undefined,
        systemPrompt: typeof input.systemPrompt === 'string' ? input.systemPrompt.trim() : undefined,
        welcomeMessage: typeof input.welcomeMessage === 'string' ? input.welcomeMessage.trim() : undefined,
        primaryColor: typeof input.primaryColor === 'string' ? input.primaryColor.trim() : undefined,
        model: typeof input.model === 'string' ? input.model.trim() : undefined,
        temperature: Number(input.temperature),
        enabled: input.enabled
    }

    if (Number.isNaN(next.temperature)) {
        next.temperature = undefined
    }

    if (typeof next.enabled !== 'boolean') {
        next.enabled = undefined
    }

    return next
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
    await fs.writeFile(kvFilePath, `${JSON.stringify(merged, null, 2)}\n`, 'utf8')
    return merged
}

async function resetAssistantConfig() {
    await fs.writeFile(kvFilePath, `${JSON.stringify(defaultAssistantConfig, null, 2)}\n`, 'utf8')
    return { ...defaultAssistantConfig }
}

module.exports = {
    getAssistantConfig,
    saveAssistantConfig,
    resetAssistantConfig
}
