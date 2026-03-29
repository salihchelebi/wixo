const { ensureSchema, query } = require('./db')

async function getStoredAssistantConfig() {
    await ensureSchema()
    const result = await query('SELECT config FROM netlify_lite_assistant_config WHERE id = 1 LIMIT 1')
    return result.rows[0]?.config || null
}

async function upsertAssistantConfig(config) {
    await ensureSchema()
    const result = await query(
        `INSERT INTO netlify_lite_assistant_config (id, config, updated_at)
         VALUES (1, $1::jsonb, NOW())
         ON CONFLICT (id) DO UPDATE SET config = EXCLUDED.config, updated_at = NOW()
         RETURNING config`,
        [JSON.stringify(config)]
    )
    return result.rows[0].config
}

module.exports = {
    getStoredAssistantConfig,
    upsertAssistantConfig
}
