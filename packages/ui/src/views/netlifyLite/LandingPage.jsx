import { useNavigate } from 'react-router-dom'
import {
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography
} from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ForumRoundedIcon from '@mui/icons-material/ForumRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded'

const HERO_VIDEO_URL = ''

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
        alt: 'Ürün görünürlüğü ve karar öncesi kontrol ekranı',
        slot: 'Karar öncesi ürün görünürlüğü'
    },
    chatDemo: {
        src: '/images/nissai-chat-demo-paneli.png',
        alt: 'Mesaj merkezi ve işlem paneli',
        slot: 'Mesaj merkezi görünümü'
    },
    liveSupport: {
        src: '/images/nissai-canli-destek-paneli.jpg',
        alt: 'Canlı destek ve işlem aksiyonları paneli',
        slot: 'Canlı destek ve işlem aksiyonları'
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

const statCards = [
    {
        label: 'Operasyon Kazancı',
        value: '%268 Daha Hızlı',
        sx: {
            background:
                'linear-gradient(135deg, rgba(46,105,255,0.34), rgba(18,39,89,0.92))',
            border: '1px solid rgba(123,175,255,0.30)',
            boxShadow: '0 18px 44px rgba(34,82,199,0.18)'
        }
    },
    {
        label: 'Ekip Yükü',
        value: '%241 Daha Az Baskı',
        sx: {
            background:
                'linear-gradient(135deg, rgba(35,122,93,0.34), rgba(22,44,40,0.92))',
            border: '1px solid rgba(112,223,179,0.24)',
            boxShadow: '0 18px 44px rgba(31,132,98,0.16)'
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

const trustItems = [
    'Netlify Üzerinde Hızlı Yayın',
    'Neon Destekli Veri Altyapısı',
    'Yönetici Paneli + Mesaj Merkezi',
    'Her Cihazda Erişilebilir Akış',
    'Gerçek Zamanlı Operasyon Görünürlüğü'
]

const heroBullets = [
    'Saatler süren işi dakikalara indir',
    'Daha fazla personel almadan daha fazla işi yönet',
    'Dağınıklığı bırak, kontrolü geri al'
]

const useCases = [
    {
        title: 'Ajanslar',
        text: 'Birden fazla müşteriyi tek panelde topla. Ekip yükünü büyütmeden daha fazla işi çevir.'
    },
    {
        title: 'E-Ticaret',
        text: 'Yoğun mesaj, sipariş ve dönüş akışını görünür hale getir. Bekleyeni kaybetme.'
    },
    {
        title: 'Emlak',
        text: 'Lead sıcaklığını koru. İlk dönüş süresini düşür. Takibi kişilere değil sisteme bağla.'
    },
    {
        title: 'Destek Yoğun İşletmeler',
        text: 'Soruları tek merkezde erit. Kimin ne yaptığını net gör. Yanıt kalitesini koru.'
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
            title: 'Kurulum Yapısını Gör',
            subtitle: '5 dakikalık başlangıç',
            href: '#kurulum',
            icon: BoltRoundedIcon,
            sx: {
                background:
                    'linear-gradient(135deg, rgba(245,158,11,0.95), rgba(180,83,9,0.92))',
                color: '#fff'
            }
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

    return (
        <Box sx={{ background: '#07111f', color: '#111827', overflowX: 'hidden' }}>
            <Box sx={heroShellSx}>
                <Container maxWidth='xl' sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 12 } }}>
                    <Stack spacing={{ xs: 3.5, md: 4.5 }}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            justifyContent='space-between'
                            alignItems={{ xs: 'flex-start', md: 'center' }}
                            spacing={2}
                        >
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

                            <Stack direction='row' spacing={1.2} flexWrap='wrap' useFlexGap>
                                <Chip label='Premium UI' sx={topChipSx} />
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
                                            NISSAI ekip yükünü azaltır, süreci hızlandırır ve kontrolü
                                            tek panelde toplar. Daha fazla personel almadan daha fazla işi
                                            yönetmek isteyen ekipler için kuruldu.
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
                                                {...actionProps('/netlify-lite/admin')}
                                                variant='contained'
                                                endIcon={<ArrowForwardRoundedIcon />}
                                                sx={primaryCtaSx}
                                            >
                                                YÖNETİCİ PANELİNİ AÇ
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

                                        <Grid container spacing={1.5} mt={1.2}>
                                            {heroQuickActions.map((action) => {
                                                const Icon = action.icon
                                                return (
                                                    <Grid item xs={12} sm={6} key={action.title}>
                                                        <Button
                                                            {...actionProps(action.href)}
                                                            fullWidth
                                                            sx={{
                                                                ...heroQuickCtaBaseSx,
                                                                ...action.sx
                                                            }}
                                                        >
                                                            <Stack
                                                                direction='row'
                                                                spacing={1.4}
                                                                alignItems='center'
                                                                width='100%'
                                                            >
                                                                <Box sx={heroQuickIconWrapSx}>
                                                                    <Icon sx={{ fontSize: 22 }} />
                                                                </Box>

                                                                <Stack
                                                                    spacing={0.2}
                                                                    textAlign='left'
                                                                    sx={{ flex: 1, minWidth: 0 }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: 900,
                                                                            fontSize: 14,
                                                                            lineHeight: 1.15
                                                                        }}
                                                                    >
                                                                        {action.title}
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 12.5,
                                                                            opacity: 0.86,
                                                                            lineHeight: 1.25
                                                                        }}
                                                                    >
                                                                        {action.subtitle}
                                                                    </Typography>
                                                                </Stack>
                                                            </Stack>
                                                        </Button>
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>

                                        <Typography
                                            sx={{
                                                mt: 2.4,
                                                color: 'rgba(255,255,255,0.66)',
                                                fontSize: 13.5
                                            }}
                                        >
                                            Hızlı kurulum • Yönetici paneli • Mesaj merkezi • mobil erişim
                                            • tek merkez görünürlük
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Box sx={heroMediaColumnSx}>
                                        <HeroVideoFrame
                                            src={HERO_VIDEO_URL}
                                            poster={LANDING_IMAGES.hero.src}
                                            title='NISSAI operasyon akışı'
                                        />

                                        <Paper elevation={0} sx={authorityBandSx}>
                                            <Stack
                                                direction={{ xs: 'column', sm: 'row' }}
                                                alignItems={{ xs: 'flex-start', sm: 'center' }}
                                                justifyContent='space-between'
                                                spacing={{ xs: 0.75, sm: 2 }}
                                            >
                                                <Stack
                                                    direction='row'
                                                    spacing={1.1}
                                                    alignItems='baseline'
                                                    flexWrap='wrap'
                                                    useFlexGap
                                                >
                                                    <Typography
                                                        sx={{
                                                            color: '#fff7d1',
                                                            fontWeight: 900,
                                                            fontSize: { xs: 18, md: 24 }
                                                        }}
                                                    >
                                                        Kurulum Süresi
                                                    </Typography>
                                                    <Typography
                                                        sx={{
                                                            color: '#fff',
                                                            fontWeight: 900,
                                                            fontSize: { xs: 26, md: 36 },
                                                            lineHeight: 1
                                                        }}
                                                    >
                                                        5 Dakika
                                                    </Typography>
                                                </Stack>

                                                <Typography
                                                    sx={{
                                                        color: 'rgba(255,255,255,0.84)',
                                                        fontSize: { xs: 12.5, md: 15 },
                                                        textAlign: { xs: 'left', sm: 'right' }
                                                    }}
                                                >
                                                    son 100 müşterimizin geri bildirimlerine göre
                                                </Typography>
                                            </Stack>
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

                        <Paper elevation={0} sx={trustBandWrapSx}>
                            <Stack
                                direction={{ xs: 'column', md: 'row' }}
                                spacing={{ xs: 2, md: 3 }}
                                alignItems={{ xs: 'flex-start', md: 'center' }}
                            >
                                <Box sx={{ minWidth: { md: 250 } }}>
                                    <Typography sx={{ fontWeight: 900, fontSize: 22 }}>
                                        Güven Bandı
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

                                    <Stack spacing={1.4} mt={2.5}>
                                        {[
                                            'Panel alanını aç',
                                            'Mesaj akışını bağla',
                                            'Ekip görünürlüğünü aktif et'
                                        ].map((item, index) => (
                                            <Stack
                                                key={item}
                                                direction='row'
                                                spacing={1.4}
                                                alignItems='center'
                                            >
                                                <Box sx={setupIndexSx}>{index + 1}</Box>
                                                <Typography
                                                    sx={{
                                                        color: 'rgba(255,255,255,0.9)',
                                                        fontWeight: 700
                                                    }}
                                                >
                                                    {item}
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>

                                    <Typography
                                        sx={{
                                            mt: 2.4,
                                            color: 'rgba(255,255,255,0.72)',
                                            lineHeight: 1.75
                                        }}
                                    >
                                        Teknik boğulma değil, hızlı başlangıç hedeflenir. Ekip öğrenirken
                                        sistem beklemez.
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

                                <Typography
                                    sx={{
                                        maxWidth: 780,
                                        color: 'rgba(255,255,255,0.84)',
                                        lineHeight: 1.9
                                    }}
                                >
                                    Bu sayfa yalnızca ürün tanıtımı değil. Kararı hızlandıran bir geçiş
                                    alanı olarak çalışmalı. Ziyaretçiyi durdurmalı, problemi
                                    hissettirmeli ve çözümü net biçimde önüne koymalı.
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
                                        border: '1px solid rgba(255,255,255,0.14)',
                                        boxShadow: '0 30px 80px rgba(0,0,0,0.35)'
                                    }}
                                />
                            </Stack>
                        </Paper>
                    </Stack>
                </Container>
            </Box>

            <Box sx={floatingBarSx}>
                <Button
                    {...actionProps('/netlify-lite/admin')}
                    variant='contained'
                    endIcon={<ArrowForwardRoundedIcon />}
                    sx={floatingCtaSx}
                >
                    YÖNETİCİ PANELİNİ AÇ
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
            <Typography
                sx={{
                    color: '#2563eb',
                    fontWeight: 900,
                    letterSpacing: '0.14em',
                    fontSize: 13
                }}
            >
                {top}
            </Typography>

            <Typography
                sx={{
                    mt: 1.2,
                    fontWeight: 900,
                    fontSize: { xs: '2rem', md: '3.2rem' },
                    lineHeight: 1.12
                }}
            >
                {title}
            </Typography>

            <Typography
                sx={{
                    mt: 1.8,
                    color: '#64748b',
                    maxWidth: 860,
                    mx: 'auto',
                    lineHeight: 1.9
                }}
            >
                {text}
            </Typography>
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
                                {...actionProps('/netlify-lite/chat')}
                                variant='outlined'
                                sx={{
                                    ...moduleSecondarySx,
                                    color: dark ? '#fff' : '#111827',
                                    borderColor: dark
                                        ? 'rgba(255,255,255,0.24)'
                                        : '#cbd5e1'
                                }}
                            >
                                AKIŞI İNCELE
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
            <Box
                component='img'
                src={image.src}
                alt={image.alt}
                loading='lazy'
                sx={showcaseSecondaryImageSx}
            />
            <Typography
                sx={{
                    mt: 1.2,
                    px: 0.6,
                    fontWeight: 800,
                    color: dark ? '#fff' : '#1f2937'
                }}
            >
                {image.slot}
            </Typography>
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
        <Paper elevation={0} sx={{ ...statCardBaseSx, ...sx }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.82)', fontSize: 14.5 }}>
                {label}
            </Typography>
            <Typography
                sx={{
                    color: '#fff',
                    fontWeight: 900,
                    fontSize: { xs: 24, md: 30 },
                    mt: 1,
                    lineHeight: 1.1
                }}
            >
                {value}
            </Typography>
        </Paper>
    )
}

const heroShellSx = {
    background:
        'radial-gradient(circle at 15% 10%, rgba(59,130,246,0.16), transparent 26%), radial-gradient(circle at 84% 8%, rgba(168,85,247,0.14), transparent 24%), linear-gradient(180deg, #07111f 0%, #0b1630 100%)'
}

const heroWrapSx = {
    borderRadius: 6,
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.12)',
    background:
        'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 30px 80px rgba(2,6,23,0.30)'
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

const bottomGhostBlueSx = {
    minHeight: 54,
    px: 3.5,
    borderRadius: 999,
    fontWeight: 900,
    color: '#dbeafe',
    borderColor: 'rgba(96,165,250,0.30)'
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
