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
        chatError: 'Yanıt alınamadı.',
        notAuthorized: 'Bu ekran için önce giriş yapmalısınız.',
        landingHeadline: 'Dağınıklığı bitir, operasyonunu tek panelden yönet.',
        landingSubheadline: 'Hızlı kurulum, net kontrol ve ölçülebilir sonuç için yönetim paneline güvenli giriş yapın.',
        loginTitle: 'Yönetici Girişi',
        loginSubtitle: 'Yalnız yetkili kullanıcı admin paneline erişebilir.',
        loginUsername: 'Kullanıcı Adı',
        loginPassword: 'Parola',
        loginButton: 'Panele Gir',
        loginError: 'Giriş bilgileri doğrulanamadı.'
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
        chatError: 'Failed to get response.',
        notAuthorized: 'You need to sign in first.',
        landingHeadline: 'Stop operational chaos and manage from one panel.',
        landingSubheadline: 'Sign in securely to reach fast setup, clear control, and measurable outcomes.',
        loginTitle: 'Admin Sign In',
        loginSubtitle: 'Only authorized users can access the admin panel.',
        loginUsername: 'Username',
        loginPassword: 'Password',
        loginButton: 'Enter Panel',
        loginError: 'Unable to validate credentials.'
    }
}

export const getNetlifyLiteTexts = () => {
    // Bu seçim kullanıcıya varsayılan olarak Türkçe metin gösterirken gerektiğinde URL ile dil değişimini güvenli biçimde açık tutar.
    const forcedLang =
        typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('lang')?.toLowerCase() : null
    const locale = forcedLang === 'en' ? 'en' : 'tr'
    return messages[locale]
}
