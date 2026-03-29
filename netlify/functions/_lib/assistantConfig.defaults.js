const defaultAssistantConfig = {
    workspaceId: 'default-workspace',
    assistantName: 'Meslek Asistanı',
    assistantRole: 'Ön karşılama ve yönlendirme asistanı',
    systemPrompt: 'Kullanıcıya kendi uzmanlık alanında yardımcı olan profesyonel bir asistansın.',
    welcomeMessage: 'Merhaba, size nasıl yardımcı olabilirim?',
    primaryColor: '#2563eb',
    provider: 'ollama',
    baseUrl: '',
    apiKey: '',
    model: 'llama3.1:8b',
    temperature: 0.2,
    enabled: true,
    sectorKey: 'lawyers',
    landingVariant: 'general',
    ctaTarget: '/netlify-lite/sektor/avukatlar',
    theme: 'light',
    updatedAt: '2026-03-29T00:00:00.000Z'
}

module.exports = {
    defaultAssistantConfig
}
