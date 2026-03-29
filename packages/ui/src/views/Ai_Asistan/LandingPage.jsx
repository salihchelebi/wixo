import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'
import { getNetlifyLiteTexts } from './texts'
import { SECTORS } from './sectors'

const LANDING_IMAGES = {
    logo: {
        src: '/images/nissai-operasyon-kontrolu-logo.jpg',
        alt: 'NISSAI operasyon kontrolü logosu',
        slot: 'Navbar sol üst logo'
    },
    hero: {
        src: '/images/nissai-operasyon-paneli-hero.jpg',
        alt: 'NISSAI operasyon paneli hero görseli',
        slot: 'Hero ana ürün görseli'
    },
    demoCta: {
        src: '/images/nissai-karar-oncesi-demo-cta.jpg',
        alt: 'Karar öncesi ürün değerlendirme çağrısı görseli',
        slot: 'Hero sonrası değerlendirme CTA bölümü'
    },
    chatDemo: {
        src: '/images/nissai-chat-demo-paneli.png',
        alt: 'Mesaj merkezi ve sohbet paneli görseli',
        slot: 'Mesaj merkezi bölümü ana görseli'
    },
    liveSupport: {
        src: '/images/nissai-canli-destek-paneli.jpg',
        alt: 'Canlı destek ve işlem aksiyonları paneli',
        slot: 'Mesaj merkezi devamı canlı destek bölümü'
    },
    newLeadFlow: {
        src: '/images/nissai-yeni-talep-akisi.jpg',
        alt: 'Yeni talep akışı görseli',
        slot: 'Yeni talep geldiğinde ne oluyor bölümü'
    },
    firstResponse: {
        src: '/images/nissai-ilk-yanit-talep-paneli.jpg',
        alt: 'İlk yanıt ve talep paneli görseli',
        slot: 'İlk yanıt ve talep oluşturma bölümü'
    },
    customerFlow: {
        src: '/images/nissai-musteri-akisi-paneli.jpg',
        alt: 'Müşteri akışı ve yanıt hızı paneli',
        slot: 'Müşteri akışı bölümü'
    },
    singleCenter: {
        src: '/images/nissai-tek-merkez-paneli.jpg',
        alt: 'Tek merkez operasyon paneli',
        slot: 'Tek merkez operasyon görünürlüğü bölümü'
    },
    loadBalance: {
        src: '/images/nissai-yuk-dengesi-paneli.jpg',
        alt: 'Yük dengesi ve ekip dağılımı paneli',
        slot: 'Yük dengesi bölümü'
    },
    lossDetection: {
        src: '/images/nissai-kayip-tespit-paneli.jpg',
        alt: 'Kayıp tespit ve bekleme riski paneli',
        slot: 'Kayıp tespit bölümü'
    },
    automation: {
        src: '/images/nissai-tekrari-azalt-otomasyon.jpg',
        alt: 'Tekrarı azaltan otomasyon paneli',
        slot: 'Otomasyon bölümü'
    },
    mobileMain: {
        src: '/images/nissai-yeni-mesaj-mobil-ekran.jpg',
        alt: 'Mobil ana deneyim ekranı',
        slot: 'Mobil deneyim ana görseli'
    },
    mobileSecondary: {
        src: '/images/nissai-mobil-mesajlar-ekrani.jpg',
        alt: 'Mobil ikinci mesaj ekranı',
        slot: 'Mobil deneyim ikinci görseli'
    }
}

export default function LandingPage() {
    const navigate = useNavigate()
    const t = getNetlifyLiteTexts()
    const [heroVideoReady] = useState(false)

    const trustItems = [
        'Netlify destekli dağıtım',
        'Supabase Postgres altyapısı',
        'Mobil Uyumlu Deneyim',
        'Yönetici Paneli + Mesaj Merkezi',
        'Hızlı Kurulum Yapısı'
    ]

    const heroBullets = [
        'Saatler süren işi dakikalara indir',
        'Daha fazla personel almadan daha fazla işi yönet',
        'Dağınıklığı bırak, kontrolü geri al'
    ]

    const sections = [
        {
            badge: 'DEMO + CTA',
            title: 'Karar vermeden önce ürünü gör. Sonra ilerle.',
            text: 'Bu bölüm kararsız kullanıcıyı ikna etmek için var. Ürünün soyut vaat değil, gerçek bir operasyon arayüzü sunduğunu net biçimde gösterir.',
            image: LANDING_IMAGES.demoCta,
            theme: 'light',
            bullets: ['Operasyon panelini aç', 'Akışı incele', 'Karar vermeden önce işleyişi gör'],
            reverse: false
        },
        {
            badge: 'SOHBET + CANLI DESTEK',
            title: 'Sohbeti sadece konuşma değil, sonuç üreten akışa çevir.',
            text: 'Kullanıcı önce mesaj merkezini görür, sonra canlı destek akışının nasıl çalıştığını anlar. Böylece ürünün yalnızca vitrin değil, aksiyon alan bir sistem olduğu netleşir.',
            image: LANDING_IMAGES.chatDemo,
            companion: LANDING_IMAGES.liveSupport,
            theme: 'dark',
            bullets: ['Sohbet deneyimini ürün kanıtına dönüştür', 'İlgili ekibe aktar ve işlem başlat', 'Canlılık hissi ile güven oluştur'],
            reverse: true
        },
        {
            badge: 'TALEP AKIŞI',
            title: 'Yeni talep gelir gelmez düzen başlasın.',
            text: 'Bu blok ilk temas anından ilk yanıta kadar olan kritik hattı gösterir. Amaç, kullanıcının sürecin dağılmadan sisteme düştüğünü görmesidir.',
            image: LANDING_IMAGES.newLeadFlow,
            companion: LANDING_IMAGES.firstResponse,
            theme: 'light',
            bullets: ['İlk temas kaçmaz', 'Talep anında sisteme düşer', 'İlk yanıt gecikmeden ilerler'],
            reverse: false
        },
        {
            badge: 'MÜŞTERİ AKIŞI + TEK MERKEZ',
            title: 'Müşteri akışını tek merkezden izle, hızını kaybetme.',
            text: 'Müşteri akışı ve tek merkez görünümü birlikte çalışır. Biri operasyon akışını görünür kılar, diğeri tüm işi tek panelde toplar.',
            image: LANDING_IMAGES.customerFlow,
            companion: LANDING_IMAGES.singleCenter,
            theme: 'dark',
            bullets: ['Bekleyenleri ve işlem sırasını gör', 'Tek merkezden açık işleri yönet', 'Dağınık süreci toparla'],
            reverse: true
        },
        {
            badge: 'YÖNETİM GÖRÜNÜRLÜĞÜ',
            title: 'Yükü dengele, kaybı erken fark et.',
            text: 'Yük dengesi ve kayıp tespiti aynı yönetim katmanında anlam kazanır. Yönetici önce ekip yükünü görür, sonra geciken ve riskli alanları anında fark eder.',
            image: LANDING_IMAGES.loadBalance,
            companion: LANDING_IMAGES.lossDetection,
            theme: 'light',
            bullets: ['Ekip yükünü akıllı dağıt', 'Riskli işleri erken gör', 'Geciken dönüşleri saklama'],
            reverse: false
        },
        {
            badge: 'OTOMASYON + MOBİL',
            title: 'Tekrarı azalt. Mobilde de kontrolü bırakma.',
            text: 'Otomasyon paneli tekrar eden işi düşürür. Mobil görseller ise yönetimin masaya bağlı kalmadan da devam ettiğini kanıtlar.',
            image: LANDING_IMAGES.automation,
            companion: LANDING_IMAGES.mobileMain,
            tertiary: LANDING_IMAGES.mobileSecondary,
            theme: 'dark',
            bullets: ['Hazır yanıt ve otomatik akış kur', 'Mobilde yeni mesajı anında gör', 'İkinci mobil görünüm ile kullanım kanıtı ver'],
            reverse: true
        }
    ]

    const comparisons = {
        before: ['Dağınık takip', 'Yoğun ekip baskısı', 'Geç dönüş', 'Kontrol eksikliği', 'Sürekli manuel müdahale', 'Kaçan fırsatlar'],
        after: [
            'Merkezi görünüm',
            'Hızlanan iş akışı',
            'Daha az ekip yükü',
            'Daha hızlı geri dönüş',
            'Daha net kontrol',
            'Daha yüksek dönüşüm baskısı'
        ]
    }

    const useCases = [
        {
            title: 'Ajanslar',
            text: 'Birden fazla müşteriyi dağılmadan yönet. Ekip yükünü artırmadan daha çok iş çevir.'
        },
        {
            title: 'E-Ticaret',
            text: 'Yoğun mesaj, lead ve dönüş akışını tek düzen içinde topla.'
        },
        {
            title: 'Emlak',
            text: 'Lead’leri sıcak tut, geri dönüş süresini düşür, ilgiyi kaybetme.'
        },
        {
            title: 'Destek Yoğun İşletmeler',
            text: 'Soruları biriktiği yerde erit, yanıt kalitesini korurken süreyi kısalt.'
        }
    ]

    const faqs = [
        {
            q: 'Teknik bilgi olmadan kullanabilir miyim?',
            a: 'Evet. Bu yapı teknik terimlerle boğmaz. Hedefi nettir: hız, kontrol ve sonuç.'
        },
        {
            q: 'Bu sistem küçük ekipler için uygun mu?',
            a: 'Evet. Özellikle küçük ve orta ekiplerde en güçlü etkiyi verir çünkü dağınıklığı hızlı toplar.'
        },
        {
            q: 'Mobilde düzgün çalışır mı?',
            a: 'Evet. Mobil deneyim bu sayfada doğrudan gerçek ekranlarla gösteriliyor.'
        },
        {
            q: 'Yönetici paneli güvenli mi?',
            a: 'Evet. Yönetici alanı ayrı rota mantığıyla çalışır ve genel açılışla karışmaz.'
        },
        {
            q: 'Ürünü incelemeden karar vermek zorunda mıyım?',
            a: 'Hayır. Önce akışı incele, sonra değerlendir ve karar ver.'
        },
        {
            q: 'Memnun kalmazsam ne olur?',
            a: 'Risk senin değil, sistemin üzerinde olmalı. Garanti dilini ve itiraz kırıcı yapıyı bunun için ekliyoruz.'
        }
    ]
    const sectorCards = SECTORS

    return (
        <Box sx={{ background: '#fff', color: '#111827', overflowX: 'hidden' }}>
            <HeroBackground />

            <Box
                sx={{
                    background: 'linear-gradient(180deg, #081225 0%, #101f3d 42%, #ffffff 42%, #ffffff 100%)'
                }}
            >
                <Container maxWidth='xl' sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 10 } }}>
                    <Stack spacing={4}>
                        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent='space-between' alignItems='center' spacing={2}>
                            <Stack direction='row' alignItems='center' spacing={1.5}>
                                <Box
                                    component='img'
                                    src={LANDING_IMAGES.logo.src}
                                    alt={LANDING_IMAGES.logo.alt}
                                    sx={{ width: 44, height: 44, borderRadius: 2, objectFit: 'cover' }}
                                />
                                <Typography sx={{ color: '#fff', fontSize: 24, fontWeight: 900 }}>NISSAI</Typography>
                            </Stack>

                            <Stack direction='row' spacing={1.2} flexWrap='wrap'>
                                <Chip label='Üst Düzey Arayüz' sx={topChipSx} />
                                <Chip label='CRO Odaklı' sx={topChipSx} />
                                <Chip label='Gerçek Görsel Akışı' sx={topChipSx} />
                            </Stack>
                        </Stack>

                        <Paper
                            elevation={0}
                            sx={{
                                borderRadius: 6,
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Box sx={{ p: { xs: 3, md: 6 } }}>
                                        <Chip label='YÜKSEK DÖNÜŞÜMLÜ AÇILIŞ SİSTEMİ' sx={heroMiniChipSx} />
                                        <Typography
                                            sx={{
                                                mt: 2.5,
                                                color: '#fff',
                                                fontWeight: 900,
                                                lineHeight: 1.06,
                                                fontSize: { xs: '2.2rem', md: '4.4rem' },
                                                letterSpacing: '-0.03em'
                                            }}
                                        >
                                            Dağınık operasyon yüzünden müşteri kaçırmayı bırak.
                                        </Typography>
                                        <Typography
                                            sx={{
                                                mt: 2,
                                                color: 'rgba(255,255,255,0.82)',
                                                fontSize: { xs: '1rem', md: '1.2rem' },
                                                lineHeight: 1.8,
                                                maxWidth: 620
                                            }}
                                        >
                                            NISSAI; ekip yükünü azaltır, süreci hızlandırır ve kontrolü tek panelde toplar. Daha fazla
                                            personel almadan daha fazla işi yönetmek isteyenler için tasarlandı.
                                        </Typography>

                                        <Stack spacing={1.3} mt={3}>
                                            {heroBullets.map((item) => (
                                                <Stack direction='row' spacing={1.2} alignItems='center' key={item}>
                                                    <CheckCircleRoundedIcon sx={{ color: '#60a5fa' }} />
                                                    <Typography sx={{ color: '#fff', fontWeight: 700 }}>{item}</Typography>
                                                </Stack>
                                            ))}
                                        </Stack>

                                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={4}>
                                            <Button
                                                onClick={() => navigate('/login')}
                                                variant='contained'
                                                endIcon={<ArrowForwardRoundedIcon />}
                                                sx={primaryCtaSx}
                                            >
                                                YÖNETİCİ GİRİŞİ
                                            </Button>

                                            <Button
                                                onClick={() => navigate('/chatflows')}
                                                variant='outlined'
                                                startIcon={<PlayCircleRoundedIcon />}
                                                sx={secondaryCtaSx}
                                            >
                                                MESAJ MERKEZİNİ AÇ
                                            </Button>
                                        </Stack>

                                        <Typography sx={{ mt: 2.5, color: 'rgba(255,255,255,0.68)', fontSize: 13 }}>
                                            Hızlı kurulum • Mobil uyumlu • Yönetici paneli • Mesaj merkezi • Gerçek arayüz görselleri
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box
                                        sx={{
                                            p: { xs: 2.5, md: 4 },
                                            height: '100%',
                                            background:
                                                'radial-gradient(circle at top right, rgba(96,165,250,0.25), transparent 36%), linear-gradient(180deg, rgba(4,9,22,0.72), rgba(11,18,32,0.92))'
                                        }}
                                    >
                                        <Paper elevation={0} sx={mockFrameSx}>
                                            <Box sx={{ width: '100%', aspectRatio: '16 / 9', bgcolor: '#0b1220', borderRadius: 3, p: 1 }}>
                                                {heroVideoReady ? (
                                                    <Box
                                                        component='iframe'
                                                        title='NISSAI ürün videosu'
                                                        src=''
                                                        sx={{ width: '100%', height: '100%', border: 0, borderRadius: 2 }}
                                                    />
                                                ) : (
                                                    <Box
                                                        component='img'
                                                        src={LANDING_IMAGES.hero.src}
                                                        alt={LANDING_IMAGES.hero.alt}
                                                        sx={mockImageSx}
                                                    />
                                                )}
                                            </Box>
                                        </Paper>

                                        <Grid container spacing={2} mt={0.5}>
                                            <Grid item xs={6}>
                                                <MiniStat label='Kurulum Süresi' value='15 Dakika' />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <MiniStat label='Operasyon Kazancı' value='%68 Daha Hızlı' />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <MiniStat label='Ekip Yükü' value='%41 Daha Az Baskı' />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <MiniStat label='Mobil Erişim' value='7/24 Aktif' />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Paper elevation={0} sx={{ borderRadius: 4, p: { xs: 2.5, md: 3 }, background: '#fff' }}>
                            <Grid container spacing={2} alignItems='center'>
                                <Grid item xs={12} md={3}>
                                    <Typography sx={{ fontWeight: 900, fontSize: 22 }}>Güven Bandı</Typography>
                                    <Typography sx={{ color: '#6b7280', mt: 0.5 }}>
                                        Modern altyapı. Hızlı erişim. Üst düzey görünüm. Güven veren akış.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Grid container spacing={1.5}>
                                        {trustItems.map((item) => (
                                            <Grid item xs={6} sm={4} md={2.4} key={item}>
                                                <Paper elevation={0} sx={trustCardSx}>
                                                    <Typography sx={{ fontWeight: 800, textAlign: 'center', fontSize: 13 }}>
                                                        {item}
                                                    </Typography>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth='xl' sx={{ py: { xs: 6, md: 10 } }}>
                <Stack spacing={{ xs: 7, md: 10 }}>
                    <SectionHeadline
                        top='PROBLEM + AJİTASYON'
                        title='Sorun küçük değil. Sessizce para kaybettiriyor.'
                        text='İşler büyürken süreçler toparlanmıyorsa kayıp görünmez ama gerçektir. Yavaş ekip, düzensiz takip, geciken dönüş ve görünmeyen maliyet büyümenin önüne fren koyar.'
                    />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <CompareCard
                                tone='light'
                                title='ÖNCE'
                                items={comparisons.before}
                                subtitle='Dağınık takip, yoğun ekip baskısı ve sürekli manuel müdahale'
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CompareCard
                                tone='dark'
                                title='SONRA'
                                items={comparisons.after}
                                subtitle='Merkezi görünüm, daha hızlı iş akışı ve daha net kontrol'
                            />
                        </Grid>
                    </Grid>

                    {sections.map((section) => (
                        <ShowcaseSection key={section.title} {...section} />
                    ))}

                    <SectionHeadline
                        top='KİMLER İÇİN'
                        title='Bu sistem herkes için değil. Bu sistem hız isteyenler için.'
                        text='Bu yapı özellikle ajanslar, e-ticaret ekipleri, emlak ekipleri, operasyon yöneticileri ve destek yükü yüksek işletmeler için tasarlandı.'
                    />

                    <Grid container spacing={2.5}>
                        {useCases.map((item) => (
                            <Grid item xs={12} md={3} key={item.title}>
                                <Paper elevation={0} sx={useCaseCardSx}>
                                    <Typography sx={{ fontWeight: 900, fontSize: 22 }}>{item.title}</Typography>
                                    <Typography sx={{ mt: 1.2, color: '#6b7280', lineHeight: 1.8 }}>{item.text}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={guaranteeSx}>
                                <Stack spacing={2.2}>
                                    <Stack direction='row' spacing={1.2} alignItems='center'>
                                        <ShieldRoundedIcon sx={{ color: '#16a34a', fontSize: 30 }} />
                                        <Typography sx={{ fontWeight: 900, fontSize: 26 }}>Risk İmhası</Typography>
                                    </Stack>
                                    <Typography sx={{ fontWeight: 900, fontSize: { xs: 28, md: 42 }, lineHeight: 1.12 }}>
                                        30 Gün Memnuniyet Odaklı Garanti
                                    </Typography>
                                    <Typography sx={{ color: '#374151', lineHeight: 1.9, fontSize: 16 }}>
                                        Kuru vaat değil, güven veren yapı. “Ya uymazsa?”, “Ya ekip kullanamazsa?”, “Ya gereksiz çıkarsa?”
                                        gibi itirazlar için sayfanın bu alanı kullanıcıyı rahatlatmalı. Riski kullanıcı değil, sistem
                                        taşıyor hissi burada açıkça verilmeli.
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={countdownCardSx}>
                                <Typography sx={{ color: '#b91c1c', fontWeight: 900, fontSize: 18 }}>
                                    Fiyat artışı öncesi kalan süre
                                </Typography>
                                <Typography sx={{ mt: 2.5, color: '#6b7280', lineHeight: 1.8 }}>
                                    NISSAI ile ilk temastan operasyon devrine kadar akışı görünür ve yönetilebilir hale getirin.
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <SectionHeadline
                        top='MİNİ SSS'
                        title='İtirazları en baştan temizleyelim.'
                        text='Kararı yavaşlatan soruların cevabı burada. Kısa, net ve itiraz kırıcı.'
                    />

                    <Grid container spacing={2}>
                        {faqs.map((faq) => (
                            <Grid item xs={12} md={6} key={faq.q}>
                                <Paper elevation={0} sx={faqCardSx}>
                                    <Typography sx={{ fontWeight: 900, fontSize: 20 }}>{faq.q}</Typography>
                                    <Typography sx={{ mt: 1, color: '#6b7280', lineHeight: 1.8 }}>{faq.a}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    <SectionHeadline top='SEKTÖR MİMARİSİ' title={t.sectorShowcaseTitle} text={t.sectorShowcaseSubtitle} />

                    <Grid container spacing={2}>
                        {sectorCards.map((sector) => (
                            <Grid item xs={12} md={6} lg={4} key={sector.key}>
                                <Paper elevation={0} sx={faqCardSx}>
                                    <Stack spacing={1.5}>
                                        <Typography sx={{ fontWeight: 900, fontSize: 18 }}>{sector.title}</Typography>
                                        <Button
                                            variant={sector.active ? 'contained' : 'outlined'}
                                            disabled={!sector.active}
                                            onClick={() => navigate('/login')}
                                        >
                                            {sector.active ? t.sectorOpen : t.sectorSoon}
                                        </Button>
                                    </Stack>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>

                    <Paper elevation={0} sx={finalCtaWrapSx}>
                        <Stack spacing={2.5} alignItems='center' textAlign='center'>
                            <Chip label='FINAL PUSH' sx={finalChipSx} />
                            <Typography sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3.8rem' }, lineHeight: 1.08, maxWidth: 920 }}>
                                Sorun zaten ortada. Yük zaten büyüyor. Şimdi mesele şu: Bunu daha ne kadar taşıyacaksın?
                            </Typography>
                            <Typography sx={{ maxWidth: 780, color: 'rgba(255,255,255,0.84)', lineHeight: 1.9 }}>
                                Bu sayfa klasik ürün tanıtımı değil. Dönüşüm makinesi olarak çalışmalı. Ziyaretçiyi durdurmalı, problemi
                                hissettirmeli, çözümü güçlü biçimde sunmalı ve sonunda kullanıcıyı karara zorlamalı.
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button variant='contained' onClick={() => navigate('/login')} sx={bottomPrimarySx}>
                                    {t.loginButton}
                                </Button>
                                <Button
                                    variant='outlined'
                                    onClick={() => navigate('/login')}
                                    sx={bottomSecondarySx}
                                >
                                    {t.lawyersLink}
                                </Button>
                            </Stack>

                            <Box
                                component='img'
                                src={LANDING_IMAGES.singleCenter.src}
                                alt='Final operasyon görünürlüğü görseli'
                                loading='lazy'
                                sx={{
                                    mt: 2,
                                    width: '100%',
                                    maxWidth: 980,
                                    borderRadius: 5,
                                    border: '1px solid rgba(255,255,255,0.16)',
                                    boxShadow: '0 30px 80px rgba(0,0,0,0.35)'
                                }}
                            />
                        </Stack>
                    </Paper>
                </Stack>
            </Container>

            <Box sx={floatingBarSx}>
                <Button
                    variant='contained'
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={() => navigate('/login')}
                    sx={floatingCtaSx}
                >
                    {t.lawyersLink}
                </Button>
            </Box>
        </Box>
    )
}

function HeroBackground() {
    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                zIndex: -1,
                background:
                    'radial-gradient(circle at 10% 10%, rgba(59,130,246,0.12), transparent 24%), radial-gradient(circle at 90% 10%, rgba(168,85,247,0.12), transparent 24%), linear-gradient(180deg, #07111f 0%, #0b1831 32%, #ffffff 32%, #ffffff 100%)'
            }}
        />
    )
}

function SectionHeadline({ top, title, text }) {
    return (
        <Box textAlign='center'>
            <Typography sx={{ color: '#2563eb', fontWeight: 900, letterSpacing: '0.14em', fontSize: 13 }}>{top}</Typography>
            <Typography sx={{ mt: 1.2, fontWeight: 900, fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.12 }}>{title}</Typography>
            <Typography sx={{ mt: 1.8, color: '#6b7280', maxWidth: 860, mx: 'auto', lineHeight: 1.9 }}>{text}</Typography>
        </Box>
    )
}

function ShowcaseSection({ badge, title, text, image, companion, tertiary, bullets, dark = false, reverse = false }) {
    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 6,
                overflow: 'hidden',
                background: dark ? '#121827' : '#f8fafc',
                color: dark ? '#fff' : '#111827',
                border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb'
            }}
        >
            <Grid container direction={reverse ? 'row-reverse' : 'row'}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                        <Chip label={badge} sx={dark ? moduleChipDarkSx : moduleChipLightSx} />
                        <Typography sx={{ mt: 2, fontWeight: 900, fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 1.12 }}>
                            {title}
                        </Typography>
                        <Typography sx={{ mt: 2, color: dark ? 'rgba(255,255,255,0.78)' : '#4b5563', lineHeight: 1.9, fontSize: 16 }}>
                            {text}
                        </Typography>

                        <Stack spacing={1.4} mt={3}>
                            {bullets.map((item) => (
                                <Stack key={item} direction='row' spacing={1.2} alignItems='center'>
                                    <CheckCircleRoundedIcon sx={{ color: dark ? '#93c5fd' : '#2563eb' }} />
                                    <Typography sx={{ color: dark ? 'rgba(255,255,255,0.88)' : '#374151', fontWeight: 700 }}>
                                        {item}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3.5}>
                            <Button variant='contained' sx={modulePrimarySx}>
                                HEMEN BAŞLA
                            </Button>
                            <Button
                                variant='outlined'
                                sx={{
                                    ...moduleSecondarySx,
                                    color: dark ? '#fff' : '#111827',
                                    borderColor: dark ? 'rgba(255,255,255,0.24)' : '#cbd5e1'
                                }}
                            >
                                DEMOYU GÖR
                            </Button>
                        </Stack>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ p: { xs: 2.5, md: 4 }, height: '100%' }}>
                        <Paper elevation={0} sx={{ ...mockFrameSx, background: dark ? '#0b1220' : '#fff' }}>
                            <Box component='img' src={image.src} alt={image.alt} loading='lazy' sx={showcaseMainImageSx} />
                        </Paper>

                        {(companion || tertiary) && (
                            <Grid container spacing={2} mt={0.5}>
                                {companion && (
                                    <Grid item xs={12} sm={tertiary ? 6 : 12}>
                                        <MediaCard image={companion} dark={dark} />
                                    </Grid>
                                )}
                                {tertiary && (
                                    <Grid item xs={12} sm={6}>
                                        <MediaCard image={tertiary} dark={dark} />
                                    </Grid>
                                )}
                            </Grid>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

function MediaCard({ image, dark }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 1.2,
                borderRadius: 4,
                background: dark ? 'rgba(255,255,255,0.04)' : '#fff',
                border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb',
                height: '100%'
            }}
        >
            <Box component='img' src={image.src} alt={image.alt} loading='lazy' sx={showcaseSecondaryImageSx} />
            <Typography sx={{ mt: 1.2, px: 0.6, fontWeight: 800, color: dark ? '#fff' : '#1f2937' }}>{image.slot}</Typography>
        </Paper>
    )
}

function CompareCard({ title, subtitle, items, tone }) {
    const dark = tone === 'dark'
    return (
        <Paper
            elevation={0}
            sx={{
                p: 3.2,
                borderRadius: 5,
                height: '100%',
                background: dark ? '#111827' : '#f8fafc',
                color: dark ? '#fff' : '#111827',
                border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb'
            }}
        >
            <Typography sx={{ fontWeight: 900, fontSize: 14, letterSpacing: '0.14em', color: dark ? '#93c5fd' : '#2563eb' }}>
                {title}
            </Typography>
            <Typography sx={{ mt: 1.2, fontWeight: 900, fontSize: 28 }}>{subtitle}</Typography>
            <Divider sx={{ my: 2.2, borderColor: dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb' }} />
            <Stack spacing={1.35}>
                {items.map((item) => (
                    <Stack direction='row' spacing={1.2} alignItems='center' key={item}>
                        <CheckCircleRoundedIcon sx={{ color: dark ? '#60a5fa' : '#2563eb' }} />
                        <Typography sx={{ color: dark ? 'rgba(255,255,255,0.82)' : '#4b5563' }}>{item}</Typography>
                    </Stack>
                ))}
            </Stack>
        </Paper>
    )
}

function MiniStat({ label, value }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2,
                borderRadius: 3,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)'
            }}
        >
            <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{label}</Typography>
            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 22, mt: 0.4 }}>{value}</Typography>
        </Paper>
    )
}

const topChipSx = {
    color: '#fff',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.12)',
    fontWeight: 800
}

const heroMiniChipSx = {
    color: '#dbeafe',
    background: 'rgba(37,99,235,0.22)',
    border: '1px solid rgba(96,165,250,0.32)',
    fontWeight: 900
}

const primaryCtaSx = {
    minHeight: 56,
    px: 3.5,
    borderRadius: 999,
    fontWeight: 900,
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
    boxShadow: '0 18px 40px rgba(37,99,235,0.32)'
}

const secondaryCtaSx = {
    minHeight: 56,
    px: 3.2,
    borderRadius: 999,
    fontWeight: 900,
    color: '#fff',
    borderColor: 'rgba(255,255,255,0.28)'
}

const mockFrameSx = {
    p: 1.5,
    borderRadius: 5,
    background: '#fff',
    border: '1px solid #e5e7eb',
    boxShadow: '0 30px 90px rgba(2,6,23,0.16)'
}

const mockImageSx = {
    width: '100%',
    display: 'block',
    borderRadius: 4,
    objectFit: 'cover',
    aspectRatio: '16/10'
}

const showcaseMainImageSx = {
    width: '100%',
    display: 'block',
    borderRadius: 4,
    objectFit: 'cover',
    aspectRatio: '16/10'
}

const showcaseSecondaryImageSx = {
    width: '100%',
    display: 'block',
    borderRadius: 3,
    objectFit: 'cover',
    aspectRatio: '16/10'
}

const trustCardSx = {
    p: 2,
    height: '100%',
    borderRadius: 3,
    background: '#f8fafc',
    border: '1px solid #e5e7eb',
    display: 'grid',
    placeItems: 'center',
    minHeight: 82
}

const moduleChipLightSx = {
    color: '#1d4ed8',
    background: '#dbeafe',
    fontWeight: 900
}

const moduleChipDarkSx = {
    color: '#dbeafe',
    background: 'rgba(37,99,235,0.22)',
    border: '1px solid rgba(96,165,250,0.22)',
    fontWeight: 900
}

const modulePrimarySx = {
    minHeight: 50,
    borderRadius: 999,
    fontWeight: 900,
    px: 3,
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)'
}

const moduleSecondarySx = {
    minHeight: 50,
    borderRadius: 999,
    fontWeight: 900,
    px: 3
}

const useCaseCardSx = {
    p: 3,
    borderRadius: 4,
    height: '100%',
    background: '#f8fafc',
    border: '1px solid #e5e7eb'
}

const guaranteeSx = {
    p: { xs: 3, md: 4 },
    borderRadius: 5,
    background: '#ecfdf5',
    border: '1px solid #bbf7d0',
    height: '100%'
}

const countdownCardSx = {
    p: { xs: 3, md: 4 },
    borderRadius: 5,
    background: '#fff7ed',
    border: '1px solid #fed7aa',
    height: '100%'
}

const faqCardSx = {
    p: 3,
    borderRadius: 4,
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    height: '100%'
}

const finalCtaWrapSx = {
    p: { xs: 3.5, md: 6 },
    borderRadius: 6,
    background: 'linear-gradient(135deg, #0f172a, #1e293b 58%, #111827)',
    border: '1px solid rgba(255,255,255,0.08)',
    overflow: 'hidden'
}

const finalChipSx = {
    color: '#dbeafe',
    background: 'rgba(37,99,235,0.22)',
    border: '1px solid rgba(96,165,250,0.28)',
    fontWeight: 900
}

const bottomPrimarySx = {
    minHeight: 54,
    px: 3.5,
    borderRadius: 999,
    fontWeight: 900,
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)'
}

const bottomSecondarySx = {
    minHeight: 54,
    px: 3.5,
    borderRadius: 999,
    fontWeight: 900,
    color: '#fff',
    borderColor: 'rgba(255,255,255,0.24)'
}

const floatingBarSx = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1100,
    p: 1.5,
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0.92))'
}

const floatingCtaSx = {
    minWidth: { xs: '100%', sm: 360 },
    maxWidth: 420,
    minHeight: 56,
    borderRadius: 999,
    fontWeight: 900,
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
    boxShadow: '0 18px 40px rgba(37,99,235,0.26)'
}
