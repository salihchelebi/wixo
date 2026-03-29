export const SECTORS = [
    { key: 'avukatlar', id: 'lawyers', title: 'Avukatlar / Hukuk Büroları', active: true },
    { key: 'dis-klinikleri', id: 'dental', title: 'Diş Klinikleri', active: false },
    { key: 'ozel-tip-klinikleri', id: 'medical', title: 'Özel Tıp Klinikleri / Muayenehaneler', active: false },
    { key: 'psikologlar', id: 'psychology', title: 'Psikologlar / Psikolojik Danışmanlık', active: false },
    { key: 'guzellik-merkezleri', id: 'beauty', title: 'Güzellik Merkezleri / Estetik Klinikleri', active: false },
    { key: 'emlak-ofisleri', id: 'real-estate', title: 'Emlak Ofisleri', active: false },
    { key: 'sigorta-acenteleri', id: 'insurance', title: 'Sigorta Acenteleri', active: false },
    { key: 'muhasebe', id: 'accounting', title: 'Muhasebe / Mali Müşavirlik', active: false },
    { key: 'egitim-kurumlari', id: 'education', title: 'Eğitim Kurumları / Kurs Merkezleri', active: false },
    { key: 'oto-servis', id: 'auto-service', title: 'Oto Servis / Ekspertiz', active: false },
    { key: 'nakliyat', id: 'logistics', title: 'Nakliyat / Taşımacılık', active: false },
    { key: 'organizasyon', id: 'events', title: 'Düğün / Etkinlik / Organizasyon', active: false },
    { key: 'mobilya-ozel-uretim', id: 'furniture', title: 'Mobilya / Özel Üretim', active: false },
    { key: 'ajanslar', id: 'agencies', title: 'Ajanslar / B2B Hizmet Ofisleri', active: false }
]

export const SECTOR_PAGE_CONTENT = {
    avukatlar: {
        eyebrow: 'AVUKATLAR İÇİN ÖN KARŞILAMA ASİSTANI',
        heroTitle: 'Hukuk ofisinizde ilk teması kaçırmadan yönetin.',
        heroDescription: 'Bu asistan avukatın yerine geçmez; ilk başvuru toplama, ön eleme ve doğru yönlendirme için çalışır.',
        ctas: ['Hukuk ofisiniz için nasıl çalıştığını görün', 'Avukat asistanı sayfasını aç', 'İlk müvekkil karşılama akışını incele'],
        blocks: [
            'Hangi hukuk ofisleri için uygun',
            'Hangi sorunları çözer',
            'Müvekkil akışını nasıl düzenler',
            'İlk temasta ne toplar',
            'Hangi sorularda hız kazandırır',
            'Hangi noktada insan devralır',
            'Veri hassasiyeti / gizlilik yaklaşımı',
            'Örnek kullanım senaryoları'
        ]
    }
}

export function getSectorByKey(key) {
    return SECTORS.find((sector) => sector.key === key)
}
