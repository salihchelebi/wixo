// Bu tipler hafif prototipte tek workspace asistan ayar sözleşmesini güvenli biçimde tanımlar.
export type AssistantConfig = {
    workspaceId: string
    assistantName: string
    systemPrompt: string
    welcomeMessage: string
    primaryColor: string
    model: string
    temperature: number
    enabled: boolean
    updatedAt: string
}

// Bu tip kayıt sırasında sadece değiştirilebilir alanların kontrollü şekilde gelmesini sağlar.
export type SaveAssistantConfigInput = Partial<Omit<AssistantConfig, 'workspaceId' | 'updatedAt'>>
