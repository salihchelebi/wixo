// Bu tipler hafif prototipte tek workspace asistan ayar sözleşmesini güvenli biçimde tanımlar.
export type AssistantConfig = {
    workspaceId: string
    assistantName: string
    assistantRole: string
    systemPrompt: string
    welcomeMessage: string
    primaryColor: string
    provider: string
    baseUrl: string
    apiKey?: string
    model: string
    temperature: number
    enabled: boolean
    sectorKey: string
    landingVariant: string
    ctaTarget: string
    theme: string
    updatedAt: string
}

// Bu tip kayıt sırasında sadece değiştirilebilir alanların kontrollü şekilde gelmesini sağlar.
export type SaveAssistantConfigInput = Partial<Omit<AssistantConfig, 'workspaceId' | 'updatedAt'>>
