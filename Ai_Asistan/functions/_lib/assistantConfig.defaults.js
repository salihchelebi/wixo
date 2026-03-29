const defaultAssistantConfig = {
    workspaceId: 'default-workspace',
    assistantName: 'Meslek Asistanı',
    assistantRole: 'Ön karşılama ve yönlendirme asistanı',
    systemPrompt: 'Kullanıcıya kendi uzmanlık alanında yardımcı olan profesyonel bir asistansın.',
    welcomeMessage: 'Merhaba, size nasıl yardımcı olabilirim?',
    primaryColor: '#2563eb',
    provider: 'ollama',
    baseUrl: 'http://localhost:11434',
    apiKey: '',
    model: 'llama3.1:8b',
    temperature: 0.2,
    enabled: true,
    sectorKey: 'lawyers',
    landingVariant: 'general',
    ctaTarget: '/Ai_Asistan/sektor/avukatlar',
    theme: 'light',
    updatedAt: '2026-03-28T00:00:00.000Z',
    __note: "Bu dosya geçiş döneminde dosya tabanlıdır; kalıcı veri omurgası için ileride adapter üzerinden Neon'a taşınacaktır."
}

module.exports = {
    defaultAssistantConfig
}
