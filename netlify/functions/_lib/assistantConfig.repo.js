const { ensureSchema, query } = require('./db')

async function getStoredAssistantConfig(workspaceId = 'default-workspace') {
    await ensureSchema()
    const result = await query(
        `SELECT workspace_id, assistant_name, assistant_role, system_prompt, welcome_message, primary_color,
                provider, base_url, api_key, model, temperature, enabled, sector_key, landing_variant,
                cta_target, theme, updated_at
         FROM assistant_configs
         WHERE workspace_id = $1
         LIMIT 1`,
        [workspaceId]
    )

    const row = result.rows[0]
    if (!row) return null

    return {
        workspaceId: row.workspace_id,
        assistantName: row.assistant_name,
        assistantRole: row.assistant_role,
        systemPrompt: row.system_prompt,
        welcomeMessage: row.welcome_message,
        primaryColor: row.primary_color,
        provider: row.provider,
        baseUrl: row.base_url,
        apiKey: row.api_key || '',
        model: row.model,
        temperature: Number(row.temperature),
        enabled: Boolean(row.enabled),
        sectorKey: row.sector_key || '',
        landingVariant: row.landing_variant || '',
        ctaTarget: row.cta_target || '',
        theme: row.theme || '',
        updatedAt: row.updated_at?.toISOString?.() || new Date().toISOString()
    }
}

async function upsertAssistantConfig(config) {
    await ensureSchema()
    await query(
        `INSERT INTO assistant_configs (
            workspace_id, assistant_name, assistant_role, system_prompt, welcome_message, primary_color,
            provider, base_url, api_key, model, temperature, enabled, sector_key, landing_variant,
            cta_target, theme, updated_at
         ) VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11, $12, $13, $14,
            $15, $16, NOW()
         )
         ON CONFLICT (workspace_id) DO UPDATE SET
            assistant_name = EXCLUDED.assistant_name,
            assistant_role = EXCLUDED.assistant_role,
            system_prompt = EXCLUDED.system_prompt,
            welcome_message = EXCLUDED.welcome_message,
            primary_color = EXCLUDED.primary_color,
            provider = EXCLUDED.provider,
            base_url = EXCLUDED.base_url,
            api_key = EXCLUDED.api_key,
            model = EXCLUDED.model,
            temperature = EXCLUDED.temperature,
            enabled = EXCLUDED.enabled,
            sector_key = EXCLUDED.sector_key,
            landing_variant = EXCLUDED.landing_variant,
            cta_target = EXCLUDED.cta_target,
            theme = EXCLUDED.theme,
            updated_at = NOW()`,
        [
            config.workspaceId || 'default-workspace',
            config.assistantName,
            config.assistantRole,
            config.systemPrompt,
            config.welcomeMessage,
            config.primaryColor,
            config.provider,
            config.baseUrl || '',
            config.apiKey || null,
            config.model,
            config.temperature,
            config.enabled,
            config.sectorKey || null,
            config.landingVariant || null,
            config.ctaTarget || null,
            config.theme || null
        ]
    )

    return getStoredAssistantConfig(config.workspaceId || 'default-workspace')
}

module.exports = {
    getStoredAssistantConfig,
    upsertAssistantConfig
}
