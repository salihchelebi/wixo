const DEFAULT_PROVIDER = 'tavily'

const PROVIDER_OPTIONS = [
    {
        value: 'tavily',
        label: 'Tavily',
        defaultBaseUrl: 'https://api.tavily.com',
        defaultModel: 'tavily-search',
        order: 1
    },
    {
        value: 'openai',
        label: 'OpenAI',
        defaultBaseUrl: 'https://api.openai.com/v1',
        defaultModel: 'gpt-4.1-mini',
        order: 2
    },
    {
        value: 'gemini',
        label: 'Gemini',
        defaultBaseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        defaultModel: 'gemini-2.0-flash',
        order: 3
    },
    {
        value: 'claude',
        label: 'Claude',
        defaultBaseUrl: 'https://api.anthropic.com/v1',
        defaultModel: 'claude-3-5-sonnet-latest',
        order: 4
    }
]

const defaultAssistantConfig = {
    workspaceId: 'default-workspace',
    assistantName: 'Meslek Asistanı',
    assistantRole: 'Ön karşılama ve yönlendirme asistanı',
    systemPrompt: 'Kullanıcıya kendi uzmanlık alanında yardımcı olan profesyonel bir asistansın.',
    welcomeMessage: 'Merhaba, size nasıl yardımcı olabilirim?',
    primaryColor: '#2563eb',
    provider: DEFAULT_PROVIDER,
    providerOptions: PROVIDER_OPTIONS,
    baseUrl: 'https://api.tavily.com',
    apiKey: '',
    model: 'tavily-search',
    temperature: 0.2,
    enabled: true,
    sectorKey: 'lawyers',
    landingVariant: 'general',
    ctaTarget: '/netlify-lite/sektor/avukatlar',
    theme: 'light',
    updatedAt: '2026-03-29T00:00:00.000Z',
    __note: 'Provider sırası TAVILY -> OpenAI -> Gemini -> Claude olarak ayarlandı. Admin arayüzündeki açılır pencere bu listeyi kullanmalıdır.'
}

module.exports = {
    DEFAULT_PROVIDER,
    PROVIDER_OPTIONS,
    defaultAssistantConfig
}
