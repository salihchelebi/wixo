import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
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
        alt: 'NISSAI operasyon paneli ana görünümü',
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
        alt: 'Yeni talep akışı görünümü',
        slot: 'Yeni talep akışı'
    },
    firstResponse: {
        src: '/images/nissai-ilk-yanit-talep-paneli.jpg',
        alt: 'İlk yanıt ve talep yönetimi paneli',
        slot: 'İlk yanıt ve talep yönetimi'
    },
    customerFlow: {
        src: '/images/nissai-musteri-akisi-paneli.jpg',
        alt: 'Müşteri akışı ve yanıt hızı paneli',
        slot: 'Müşteri akışı'
    },
    singleCenter: {
        src: '/images/nissai-tek-merkez-paneli.jpg',
        alt: 'Tek merkez operasyon paneli',
        slot: 'Tek merkez operasyon'
    },
    loadBalance: {
        src: '/images/nissai-yuk-dengesi-paneli.jpg',
        alt: 'Yük dengesi ve ekip dağılımı paneli',
        slot: 'Yük dengesi'
    },
    lossDetection: {
        src: '/images/nissai-kayip-tespit-paneli.jpg',
        alt: 'Kayıp tespit ve bekleme riski paneli',
        slot: 'Kayıp tespiti'
    },
    automation: {
        src: '/images/nissai-tekrari-azalt-otomasyon.jpg',
        alt: 'Tekrarı azaltan otomasyon paneli',
        slot: 'Otomasyon'
    },
    mobileMain: {
        src: '/images/nissai-yeni-mesaj-mobil-ekran.jpg',
        alt: 'Mobil ana deneyim ekranı',
        slot: 'Mobil deneyim'
    },
    mobileSecondary: {
        src: '/images/nissai-mobil-mesajlar-ekrani.jpg',
        alt: 'Mobil ikinci mesaj ekranı',
        slot: 'İkinci mobil görünüm'
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
    },
    {
        label: 'Ekip Hızı',
        value: '%289 Daha Hızlı',
        sx: {
            background:
                'linear-gradient(135deg, rgba(196,116,18,0.34), rgba(73,43,17,0.94))',
            border: '1px solid rgba(255,197,102,0.28)',
            boxShadow: '0 18px 44px rgba(202,129,29,0.16)'
        }
    },
    {
        label: 'Tüm Cihazlardan Erişim',
        value: '7/24 Aktif',
        sx: {
            background:
                'linear-gradient(135deg, rgba(114,84,255,0.32), rgba(43,31,91,0.94))',
            border: '1px solid rgba(187,168,255,0.26)',
            boxShadow: '0 18px 44px rgba(114,84,255,0.15)'
        }
    }
]

const compareData = {
    before: [
        'Dağınık takip',
        'Yoğun ekip baskısı',
        'Geç yanıt',
        'Kontrol eksikliği',
        'Sürekli manuel müdahale',
        'Kaçan fırsatlar'
    ],
    after: [
        'Merkezi görünüm',
        'Hızlanan iş akışı',
        'Daha az ekip yükü',
        'Daha hızlı geri dönüş',
        'Daha net kontrol',
        'Daha yüksek görünürlük'
    ]
}

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
]

const faqs = [
    {
        q: 'Kurulum ağır mı?',
        a: 'Hayır. Yapı hızlı açılacak şekilde tasarlandı. Teknik yükü büyütmeden hızlı başlangıç hedeflenir.'
    },
    {
        q: 'Küçük ekipte anlamlı olur mu?',
        a: 'Evet. En büyük fark küçük ve orta ekipte görünür olur çünkü dağınıklığı hızla toplar.'
    },
    {
        q: 'Mobilde erişim güçlü mü?',
        a: 'Evet. Yönetim ve takip yalnızca masaüstüne bağlı kalmaz. Tüm cihazlarda görünür kalır.'
    },
    {
        q: 'Yetki ve görünürlük ayrılıyor mu?',
        a: 'Evet. Yönetici alanı ve mesaj akışı rol mantığıyla ayrılır; genel görünüm ile karışmaz.'
    },
    {
        q: 'Bu yapı yalnızca vitrin mi?',
        a: 'Hayır. Bu sayfa gerçek ürün akışını ve operasyon kazanımını satış diline çeviren açılış katmanıdır.'
    },
    {
        q: 'Daha fazla personel almadan kapasite artar mı?',
        a: 'Doğru kullanımda evet. Amaç yeni yük eklemek değil, mevcut yükü daha görünür ve daha hızlı yönetmektir.'
    }
]

const sections = [
    {
        badge: 'MESAJ MERKEZİ',
        title: 'Her konuşmayı tek ekrandan sonuca bağla.',
        text: 'Mesajı yakala, ilgili kişiye ata, bekleyen işi görünür kıl. Sohbet yalnızca yazışma olarak değil, operasyon girişi olarak çalışsın.',
        image: LANDING_IMAGES.chatDemo,
        companion: LANDING_IMAGES.liveSupport,
        theme: 'dark',
        bullets: ['Bekleyen mesajı saklama', 'İlgili kişiye anında aktar', 'Yanıt ve işlem akışını aynı yerde gör'],
        reverse: true
    },
    {
        badge: 'TALEP AKIŞI',
        title: 'Yeni talep geldiği anda düzen başlasın.',
        text: 'İlk temasın sisteme nasıl düştüğünü, ilk yanıtın nasıl hızlandığını ve akışın nasıl toparlandığını net göster.',
        image: LANDING_IMAGES.newLeadFlow,
        companion: LANDING_IMAGES.firstResponse,
        theme: 'light',
        bullets: ['İlk temas kaybolmaz', 'Talep anında görünür olur', 'İlk yanıt gecikmeden ilerler'],
        reverse: false
    },
    {
        badge: 'TEK MERKEZ OPERASYON',
        title: 'Açık işi, sırayı ve yükü tek merkezde gör.',
        text: 'Farklı kanalları ve farklı ekip hareketlerini tek pencerede topladığında hız yalnızca hissedilmez; ölçülür hale gelir.',
        image: LANDING_IMAGES.customerFlow,
        companion: LANDING_IMAGES.singleCenter,
        theme: 'dark',
        bullets: ['Sıra ve bekleme görünür olur', 'Açık iş tek merkezde toplanır', 'Dağınık iş takibi sona erer'],
        reverse: true
    },
    {
        badge: 'YÖNETİM GÖRÜNÜRLÜĞÜ',
        title: 'Yükü dengele. Riski erkenden gör.',
        text: 'Yöneticinin ihtiyacı daha fazla rapor değil; daha erken fark etmektir. Gecikeni, sıkışanı ve yüklenen tarafı tek bakışta gör.',
        image: LANDING_IMAGES.loadBalance,
        companion: LANDING_IMAGES.lossDetection,
        theme: 'light',
        bullets: ['Ekip yükünü daha net dağıt', 'Riskli akışı erken yakala', 'Kaçan işi geç fark etme'],
        reverse: false
    },
    {
        badge: 'OTOMASYON + MOBİL',
        title: 'Tekrar eden işi azalt. Her cihazda kontrolü koru.',
        text: 'Operasyon masaya bağlı kalmasın. Hazır akışlar ve mobil görünüm bir araya geldiğinde hız yalnızca ofiste değil, hareket halindeyken de korunur.',
        image: LANDING_IMAGES.automation,
        companion: LANDING_IMAGES.mobileMain,
        tertiary: LANDING_IMAGES.mobileSecondary,
        theme: 'dark',
        bullets: ['Tekrar eden yükü erit', 'Mobilde yeni akışı anında gör', 'Cihaz küçülse de kontrol kaybolmasın'],
        reverse: true
    }
]

export default function LandingPage() {
    const navigate = useNavigate()

    const actionProps = (href) =>
        href.startsWith('/')
            ? { onClick: () => navigate(href) }
            : { component: 'a', href }

    const heroQuickActions = [
        {
            title: 'Yönetici Panelini Aç',
            subtitle: 'Yetki, görünürlük, kontrol',
            href: '/netlify-lite/admin',
            icon: DashboardRoundedIcon,
            sx: {
                background:
                    'linear-gradient(135deg, rgba(37,99,235,0.96), rgba(67,56,202,0.92))',
                color: '#fff'
            }
        },
        {
            title: 'Mesaj Merkezine Geç',
            subtitle: 'Canlı akışı yönet',
            href: '/netlify-lite/chat',
            icon: ForumRoundedIcon,
            sx: {
                background:
                    'linear-gradient(135deg, rgba(124,58,237,0.96), rgba(91,33,182,0.92))',
                color: '#fff'
            }
        },
        {
            q: 'Ürünü incelemeden karar vermek zorunda mıyım?',
            a: 'Hayır. Önce akışı incele, sonra değerlendir ve karar ver.'
        },
        {
            title: 'Modülleri İncele',
            subtitle: 'Tüm akışı gör',
            href: '#moduller',
            icon: VisibilityRoundedIcon,
            sx: {
                background:
                    'linear-gradient(135deg, rgba(16,185,129,0.96), rgba(5,150,105,0.92))',
                color: '#fff'
            }
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
                                    sx={{
                                        width: 46,
                                        height: 46,
                                        borderRadius: 2,
                                        objectFit: 'cover',
                                        boxShadow: '0 12px 32px rgba(0,0,0,0.18)'
                                    }}
                                />
                                <Typography sx={{ color: '#fff', fontSize: 24, fontWeight: 900 }}>
                                    NISSAI
                                </Typography>
                            </Stack>

                            <Stack direction='row' spacing={1.2} flexWrap='wrap'>
                                <Chip label='Üst Düzey Arayüz' sx={topChipSx} />
                                <Chip label='CRO Odaklı' sx={topChipSx} />
                                <Chip label='Gerçek Operasyon Akışı' sx={topChipSx} />
                            </Stack>
                        </Stack>

                        <Paper elevation={0} sx={heroWrapSx}>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Box
                                        sx={{
                                            p: { xs: 3, sm: 4, md: 6 },
                                            minHeight: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Chip
                                            label='YÜKSEK DÖNÜŞÜMLÜ AÇILIŞ SİSTEMİ'
                                            sx={heroMiniChipSx}
                                        />

                                        <Typography
                                            sx={{
                                                mt: 2.5,
                                                color: '#fff',
                                                fontWeight: 900,
                                                lineHeight: 1.02,
                                                letterSpacing: '-0.05em',
                                                fontSize: {
                                                    xs: '2.65rem',
                                                    sm: '3.35rem',
                                                    md: '4.6rem',
                                                    lg: '5.25rem'
                                                },
                                                maxWidth: 660
                                            }}
                                        >
                                            Dağınık operasyon yüzünden müşteri kaçırmayı bırak.
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 2.4,
                                                color: 'rgba(255,255,255,0.82)',
                                                fontSize: { xs: '1rem', md: '1.22rem' },
                                                lineHeight: 1.82,
                                                maxWidth: 640
                                            }}
                                        >
                                            NISSAI; ekip yükünü azaltır, süreci hızlandırır ve kontrolü tek panelde toplar. Daha fazla
                                            personel almadan daha fazla işi yönetmek isteyenler için tasarlandı.
                                        </Typography>

                                        <Stack spacing={1.35} mt={3.2}>
                                            {heroBullets.map((item) => (
                                                <Stack
                                                    direction='row'
                                                    spacing={1.2}
                                                    alignItems='center'
                                                    key={item}
                                                >
                                                    <CheckCircleRoundedIcon
                                                        sx={{ color: '#6aa7ff', fontSize: 24 }}
                                                    />
                                                    <Typography
                                                        sx={{
                                                            color: '#fff',
                                                            fontWeight: 800,
                                                            fontSize: { xs: 16, md: 17 }
                                                        }}
                                                    >
                                                        {item}
                                                    </Typography>
                                                </Stack>
                                            ))}
                                        </Stack>

                                        <Stack
                                            direction={{ xs: 'column', sm: 'row' }}
                                            spacing={2}
                                            mt={4}
                                        >
                                            <Button
                                                onClick={() => navigate('/netlify-lite/login')}
                                                variant='contained'
                                                endIcon={<ArrowForwardRoundedIcon />}
                                                sx={primaryCtaSx}
                                            >
                                                YÖNETİCİ GİRİŞİ
                                            </Button>

                                            <Button
                                                {...actionProps('/netlify-lite/chat')}
                                                variant='outlined'
                                                startIcon={<ForumRoundedIcon />}
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

                                        <Grid container spacing={2}>
                                            {statCards.map((item) => (
                                                <Grid item xs={12} sm={6} key={item.label}>
                                                    <StatCard
                                                        label={item.label}
                                                        value={item.value}
                                                        sx={item.sx}
                                                    />
                                                </Grid>
                                            ))}
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
                                    <Typography
                                        sx={{
                                            color: '#64748b',
                                            mt: 0.6,
                                            lineHeight: 1.7
                                        }}
                                    >
                                        Hızlı yayın, modern veri yapısı ve tek merkez görünürlüğü aynı
                                        yerde.
                                    </Typography>
                                </Box>

                                <Box sx={trustGridSx}>
                                    {trustItems.map((item) => (
                                        <Paper elevation={0} sx={trustCardSx} key={item}>
                                            <Typography
                                                sx={{
                                                    fontWeight: 800,
                                                    textAlign: 'center',
                                                    color: '#0f172a',
                                                    fontSize: 13.5,
                                                    lineHeight: 1.35
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        </Paper>
                                    ))}
                                </Box>
                            </Stack>
                        </Paper>
                    </Stack>
                </Container>
            </Box>

            <Box
                sx={{
                    background: '#ffffff',
                    borderTopLeftRadius: { xs: 28, md: 42 },
                    borderTopRightRadius: { xs: 28, md: 42 },
                    mt: { xs: -1, md: -2 },
                    position: 'relative'
                }}
            >
                <Container maxWidth='xl' sx={{ py: { xs: 6, md: 10 } }}>
                    <Stack spacing={{ xs: 7, md: 10 }}>
                        <SectionHeadline
                            top='PROBLEM + AJİTASYON'
                            title='Sorun küçük değil. Sessizce para kaybettiriyor.'
                            text='İş büyürken süreç toparlanmıyorsa kayıp görünmez ama gerçektir. Yavaş ekip, düzensiz takip ve geciken dönüş büyümenin önüne fren koyar.'
                        />

                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CompareCard
                                    tone='light'
                                    title='ÖNCE'
                                    subtitle='Dağınık takip, yoğun ekip baskısı ve sürekli manuel müdahale'
                                    items={compareData.before}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CompareCard
                                    tone='dark'
                                    title='SONRA'
                                    subtitle='Merkezi görünüm, daha hızlı iş akışı ve daha net kontrol'
                                    items={compareData.after}
                                />
                            </Grid>
                        </Grid>

                        <Box id='moduller'>
                            <Stack spacing={{ xs: 6, md: 8 }}>
                                {sections.map((section) => (
                                    <ShowcaseSection
                                        key={section.title}
                                        {...section}
                                        actionProps={actionProps}
                                    />
                                ))}
                            </Stack>
                        </Box>

                        <SectionHeadline
                            top='KİMLER İÇİN'
                            title='Bu sistem herkes için değil. Hız isteyenler için.'
                            text='Ajanslar, e-ticaret ekipleri, emlak ekipleri, operasyon yöneticileri ve destek yükü yüksek işletmeler için tasarlandı.'
                        />

                        <Grid container spacing={2.5}>
                            {useCases.map((item) => (
                                <Grid item xs={12} md={3} key={item.title}>
                                    <Paper elevation={0} sx={useCaseCardSx}>
                                        <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
                                            {item.title}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                mt: 1.2,
                                                color: '#475569',
                                                lineHeight: 1.8
                                            }}
                                        >
                                            {item.text}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                        <Grid container spacing={3} id='kurulum'>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} sx={guaranteeSx}>
                                    <Stack spacing={2.1}>
                                        <Stack direction='row' spacing={1.2} alignItems='center'>
                                            <ShieldRoundedIcon
                                                sx={{ color: '#16a34a', fontSize: 30 }}
                                            />
                                            <Typography sx={{ fontWeight: 900, fontSize: 26 }}>
                                                Güvenli Geçiş
                                            </Typography>
                                        </Stack>

                                        <Typography
                                            sx={{
                                                fontWeight: 900,
                                                fontSize: { xs: 28, md: 42 },
                                                lineHeight: 1.12
                                            }}
                                        >
                                            Operasyonu büyütürken kontrolü dağıtma.
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: '#334155',
                                                lineHeight: 1.9,
                                                fontSize: 16
                                            }}
                                        >
                                            Yapı yalnızca hızlı görünmek için değil, güven vermek için
                                            kuruldu. Yetki ayrımı, görünürlük ve merkezi takip aynı
                                            omurgada birleşir.
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} sx={setupCardSx}>
                                    <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: 18 }}>
                                        Hızlı Kurulum Protokolü
                                    </Typography>
                                    <Typography sx={{ color: '#374151', lineHeight: 1.9, fontSize: 16 }}>
                                        Kuru vaat değil, güven veren yapı. “Ya uymazsa?”, “Ya ekip kullanamazsa?”, “Ya gereksiz çıkarsa?”
                                        gibi itirazlar için sayfanın bu alanı kullanıcıyı rahatlatmalı. Riski kullanıcı değil, sistem
                                        taşıyor hissi burada açıkça verilmeli.
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
                                        <Typography sx={{ fontWeight: 900, fontSize: 20 }}>
                                            {faq.q}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                mt: 1,
                                                color: '#64748b',
                                                lineHeight: 1.8
                                            }}
                                        >
                                            {faq.a}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                        <Paper elevation={0} sx={finalCtaWrapSx}>
                            <Stack spacing={2.5} alignItems='center' textAlign='center'>
                                <Chip label='FINAL PUSH' sx={finalChipSx} />

                                <Typography
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: { xs: '2rem', md: '3.85rem' },
                                        lineHeight: 1.05,
                                        maxWidth: 920,
                                        color: '#fff'
                                    }}
                                >
                                    Sorun zaten ortada. Yük zaten büyüyor. Şimdi mesele şu: Bunu daha ne
                                    kadar taşıyacaksın?
                                </Typography>
                                <Typography sx={{ mt: 2.5, color: '#6b7280', lineHeight: 1.8 }}>
                                    NISSAI ile ilk temastan operasyon devrine kadar akışı görünür ve yönetilebilir hale getirin.
                                </Typography>

                                <Stack
                                    direction={{ xs: 'column', sm: 'row' }}
                                    spacing={2}
                                    flexWrap='wrap'
                                    useFlexGap
                                    justifyContent='center'
                                >
                                    <Button
                                        {...actionProps('/netlify-lite/admin')}
                                        variant='contained'
                                        sx={bottomPrimarySx}
                                    >
                                        ŞİMDİ ERİŞ
                                    </Button>
                                    <Button
                                        {...actionProps('/netlify-lite/chat')}
                                        variant='outlined'
                                        sx={bottomSecondarySx}
                                    >
                                        MESAJ AKIŞINI GÖR
                                    </Button>
                                    <Button
                                        {...actionProps('#moduller')}
                                        variant='outlined'
                                        sx={bottomGhostBlueSx}
                                    >
                                        MODÜLLERİ İNCELE
                                    </Button>
                                </Stack>

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
                                            onClick={() => navigate(`/netlify-lite/sektor/${sector.key}`)}
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
                                <Button variant='contained' onClick={() => navigate('/netlify-lite/login')} sx={bottomPrimarySx}>
                                    {t.loginButton}
                                </Button>
                                <Button
                                    variant='outlined'
                                    onClick={() => navigate('/netlify-lite/sektor/avukatlar')}
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
                    {...actionProps('/netlify-lite/admin')}
                    variant='contained'
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={() => navigate('/netlify-lite/sektor/avukatlar')}
                    sx={floatingCtaSx}
                >
                    {t.lawyersLink}
                </Button>
            </Box>
        </Box>
    )
}

function HeroVideoFrame({ src, poster, title }) {
    return (
        <Paper elevation={0} sx={videoFrameSx}>
            <Box sx={videoViewportSx}>
                {src ? (
                    <Box
                        component='iframe'
                        src={src}
                        title={title}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                        sx={videoEmbedSx}
                    />
                ) : (
                    <>
                        <Box component='img' src={poster} alt={title} sx={videoPosterSx} />
                        <Box sx={videoOverlaySx} />
                        <Stack sx={videoPlaySx}>
                            <PlayCircleRoundedIcon sx={{ fontSize: 82, color: '#fff' }} />
                        </Stack>
                    </>
                )}
            </Box>
        </Paper>
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

function ShowcaseSection({
    badge,
    title,
    text,
    image,
    companion,
    tertiary,
    bullets,
    theme,
    reverse,
    actionProps
}) {
    const dark = theme === 'dark'

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 6,
                overflow: 'hidden',
                background: dark ? '#111827' : '#f8fafc',
                color: dark ? '#fff' : '#111827',
                border: dark
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid #e2e8f0'
            }}
        >
            <Grid container direction={reverse ? 'row-reverse' : 'row'}>
                <Grid item xs={12} md={6}>
                    <Box sx={{ p: { xs: 3, md: 5 } }}>
                        <Chip
                            label={badge}
                            sx={dark ? moduleChipDarkSx : moduleChipLightSx}
                        />

                        <Typography
                            sx={{
                                mt: 2,
                                fontWeight: 900,
                                fontSize: { xs: '2rem', md: '3rem' },
                                lineHeight: 1.12
                            }}
                        >
                            {title}
                        </Typography>

                        <Typography
                            sx={{
                                mt: 2,
                                color: dark ? 'rgba(255,255,255,0.78)' : '#475569',
                                lineHeight: 1.9,
                                fontSize: 16
                            }}
                        >
                            {text}
                        </Typography>

                        <Stack spacing={1.4} mt={3}>
                            {bullets.map((item) => (
                                <Stack
                                    key={item}
                                    direction='row'
                                    spacing={1.2}
                                    alignItems='center'
                                >
                                    <CheckCircleRoundedIcon
                                        sx={{ color: dark ? '#93c5fd' : '#2563eb' }}
                                    />
                                    <Typography
                                        sx={{
                                            color: dark
                                                ? 'rgba(255,255,255,0.88)'
                                                : '#334155',
                                            fontWeight: 700
                                        }}
                                    >
                                        {item}
                                    </Typography>
                                </Stack>
                            ))}
                        </Stack>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3.5}>
                            <Button
                                {...actionProps('/netlify-lite/admin')}
                                variant='contained'
                                sx={modulePrimarySx}
                            >
                                SİSTEMİ AÇ
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
                        <Paper
                            elevation={0}
                            sx={{
                                ...mockFrameSx,
                                background: dark ? '#0b1220' : '#fff'
                            }}
                        >
                            <Box
                                component='img'
                                src={image.src}
                                alt={image.alt}
                                loading='lazy'
                                sx={showcaseMainImageSx}
                            />
                        </Paper>

                        {(companion || tertiary) && (
                            <Grid container spacing={2} mt={0.6}>
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
                border: dark
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid #e2e8f0',
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
                border: dark
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid #e2e8f0'
            }}
        >
            <Typography
                sx={{
                    fontWeight: 900,
                    fontSize: 14,
                    letterSpacing: '0.14em',
                    color: dark ? '#93c5fd' : '#2563eb'
                }}
            >
                {title}
            </Typography>

            <Typography sx={{ mt: 1.2, fontWeight: 900, fontSize: 28 }}>
                {subtitle}
            </Typography>

            <Divider
                sx={{
                    my: 2.2,
                    borderColor: dark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'
                }}
            />

            <Stack spacing={1.35}>
                {items.map((item) => (
                    <Stack direction='row' spacing={1.2} alignItems='center' key={item}>
                        <CheckCircleRoundedIcon
                            sx={{ color: dark ? '#60a5fa' : '#2563eb' }}
                        />
                        <Typography
                            sx={{
                                color: dark ? 'rgba(255,255,255,0.82)' : '#475569'
                            }}
                        >
                            {item}
                        </Typography>
                    </Stack>
                ))}
            </Stack>
        </Paper>
    )
}

function StatCard({ label, value, sx }) {
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
    minHeight: 58,
    px: 3.6,
    borderRadius: 999,
    fontWeight: 900,
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
    boxShadow: '0 18px 40px rgba(37,99,235,0.32)',
    whiteSpace: 'nowrap'
}

const secondaryCtaSx = {
    minHeight: 58,
    px: 3.2,
    borderRadius: 999,
    fontWeight: 900,
    color: '#fff',
    borderColor: 'rgba(255,255,255,0.28)',
    whiteSpace: 'nowrap'
}

const heroQuickCtaBaseSx = {
    width: '100%',
    borderRadius: 3.5,
    px: 2,
    py: 1.65,
    justifyContent: 'flex-start',
    textTransform: 'none',
    boxShadow: '0 16px 34px rgba(2,6,23,0.22)'
}

const heroQuickIconWrapSx = {
    width: 42,
    height: 42,
    borderRadius: 2.5,
    display: 'grid',
    placeItems: 'center',
    background: 'rgba(255,255,255,0.14)',
    flexShrink: 0
}

const heroMediaColumnSx = {
    p: { xs: 2.5, md: 4 },
    height: '100%',
    background:
        'radial-gradient(circle at top right, rgba(96,165,250,0.18), transparent 36%), linear-gradient(180deg, rgba(4,9,22,0.78), rgba(11,18,32,0.94))'
}

const videoFrameSx = {
    p: { xs: 1.1, md: 1.25 },
    borderRadius: { xs: 4.5, md: 5 },
    background: '#f8fafc',
    border: '1px solid rgba(255,255,255,0.28)',
    boxShadow: '0 24px 80px rgba(2,6,23,0.24)'
}

const videoViewportSx = {
    position: 'relative',
    borderRadius: { xs: 3.5, md: 4 },
    overflow: 'hidden',
    aspectRatio: '16 / 9',
    background: '#07111f'
}

const videoEmbedSx = {
    width: '100%',
    height: '100%',
    border: 0,
    display: 'block'
}

const videoPosterSx = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
}

const videoOverlaySx = {
    position: 'absolute',
    inset: 0,
    background:
        'linear-gradient(180deg, rgba(5,10,25,0.18), rgba(5,10,25,0.34) 100%)'
}

const videoPlaySx = {
    position: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center'
}

const authorityBandSx = {
    mt: 2,
    px: { xs: 2, md: 2.8 },
    py: { xs: 1.4, md: 1.75 },
    borderRadius: 999,
    border: '1px solid rgba(255,209,102,0.34)',
    background:
        'linear-gradient(90deg, rgba(102,72,20,0.86), rgba(217,152,0,0.34), rgba(73,57,24,0.86))',
    boxShadow: '0 18px 40px rgba(181,126,22,0.12)'
}

const statCardBaseSx = {
    p: { xs: 2.2, md: 2.6 },
    borderRadius: 3.5,
    minHeight: { xs: 124, md: 134 },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
}

const trustBandWrapSx = {
    borderRadius: 4,
    p: { xs: 2.5, md: 3 },
    background: '#fff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 18px 50px rgba(15,23,42,0.06)'
}

const trustGridSx = {
    flex: 1,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: {
        xs: 'repeat(2, minmax(0, 1fr))',
        md: 'repeat(5, minmax(0, 1fr))'
    },
    gap: 12
}

const trustCardSx = {
    p: 2,
    height: '100%',
    borderRadius: 3,
    background:
        'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    border: '1px solid #e2e8f0',
    display: 'grid',
    placeItems: 'center',
    minHeight: 86
}

const mockFrameSx = {
    p: 1.25,
    borderRadius: 5,
    background: '#fff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 30px 90px rgba(2,6,23,0.12)'
}

const showcaseMainImageSx = {
    width: '100%',
    display: 'block',
    borderRadius: 4,
    objectFit: 'cover',
    aspectRatio: '16 / 10'
}

const showcaseSecondaryImageSx = {
    width: '100%',
    display: 'block',
    borderRadius: 3,
    objectFit: 'cover',
    aspectRatio: '16 / 10'
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
    border: '1px solid #e2e8f0'
}

const guaranteeSx = {
    p: { xs: 3, md: 4 },
    borderRadius: 5,
    background:
        'linear-gradient(180deg, #ecfdf5 0%, #dcfce7 100%)',
    border: '1px solid #bbf7d0',
    height: '100%'
}

const setupCardSx = {
    p: { xs: 3, md: 4 },
    borderRadius: 5,
    background:
        'linear-gradient(135deg, #0f172a 0%, #172554 100%)',
    border: '1px solid rgba(96,165,250,0.22)',
    height: '100%'
}

const setupIndexSx = {
    width: 32,
    height: 32,
    borderRadius: 999,
    display: 'grid',
    placeItems: 'center',
    fontWeight: 900,
    color: '#0f172a',
    background: '#f8fafc',
    flexShrink: 0
}

const faqCardSx = {
    p: 3,
    borderRadius: 4,
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    height: '100%'
}

const finalCtaWrapSx = {
    p: { xs: 3.5, md: 6 },
    borderRadius: 6,
    background:
        'linear-gradient(135deg, #0f172a, #1e293b 58%, #111827)',
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
    background:
        'linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0.92))'
}

const floatingCtaSx = {
    minWidth: { xs: '100%', sm: 360 },
    maxWidth: 440,
    minHeight: 56,
    borderRadius: 999,
    fontWeight: 900,
    background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
    boxShadow: '0 18px 40px rgba(37,99,235,0.26)'
}
