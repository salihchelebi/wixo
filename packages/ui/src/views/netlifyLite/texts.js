// Bu sözlük netlify-lite ekranlarının görünen metinlerini anahtar yapısını bozmadan güvenli çok dilli tutar.
const messages = {
    tr: {
        loading: 'Yükleniyor...',
        adminTitle: 'Hafif Prototip Admin Paneli',
        adminSubtitle: 'Tek workspace ayarlarını buradan yönetebilirsiniz.',
        saveSuccess: 'Ayarlar başarıyla kaydedildi.',
        resetSuccess: 'Ayarlar varsayılan değerlere sıfırlandı.',
        fetchConfigError: 'Ayarlar alınamadı.',
        saveError: 'Ayarlar kaydedilemedi.',
        resetError: 'Ayarlar sıfırlanamadı.',
        assistantName: 'Asistan Adı',
        systemPrompt: 'Sistem Promptu',
        welcomeMessage: 'Karşılama Mesajı',
        primaryColor: 'Ana Renk',
        model: 'Model',
        temperature: 'Sıcaklık',
        enabled: 'Asistan Aktif',
        save: 'Kaydet',
        reset: 'Sıfırla',
        chatTitleSuffix: 'Demo Sohbeti',
        userMessage: 'Mesajınız',
        send: 'Gönder',
        assistantReply: 'Asistan Yanıtı',
        chatError: 'Yanıt alınamadı.'
    },
    en: {
        loading: 'Loading...',
        adminTitle: 'Lightweight Prototype Admin Panel',
        adminSubtitle: 'You can manage single workspace settings here.',
        saveSuccess: 'Settings were saved successfully.',
        resetSuccess: 'Settings were reset to defaults.',
        fetchConfigError: 'Failed to fetch settings.',
        saveError: 'Failed to save settings.',
        resetError: 'Failed to reset settings.',
        assistantName: 'Assistant Name',
        systemPrompt: 'System Prompt',
        welcomeMessage: 'Welcome Message',
        primaryColor: 'Primary Color',
        model: 'Model',
        temperature: 'Temperature',
        enabled: 'Assistant Enabled',
        save: 'Save',
        reset: 'Reset',
        chatTitleSuffix: 'Demo Chat',
        userMessage: 'Your Message',
        send: 'Send',
        assistantReply: 'Assistant Reply',
        chatError: 'Failed to get response.'
    }
}

export const getNetlifyLiteTexts = () => {
    const locale = (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('tr')) ? 'tr' : 'en'
    return messages[locale]
}
