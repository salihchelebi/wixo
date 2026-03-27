import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Alert,
    Box,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Typography
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded'
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded'
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded'
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded'
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded'

// Bu açılış sayfası satış baskısını, güven öğelerini ve canlı kullanım simülasyonunu tek bileşende toplar.
export default function LandingPage() {
    const navigate = useNavigate()

    const [visibleToast, setVisibleToast] = useState(null)
    const [toastSeed, setToastSeed] = useState(0)
    const [countdown, setCountdown] = useState({
        saat: 11,
        dakika: 43,
        saniye: 18
    })

    const stats = useMemo(
        () => [
            { label: 'Kurulum Süresi', value: '15 Dakika' },
            { label: 'Operasyon Kazancı', value: '%68 Daha Hızlı' },
            { label: 'Ekip Yükü', value: '%41 Daha Az Baskı' },
            { label: 'Mobil Erişim', value: '7/24 Aktif' }
        ],
        []
    )

    const trustItems = useMemo(
        () => ['Netlify Dağıtım Mimarisi', 'Neon Veri Altyapısı', 'Mobil Uyumlu Arayüz', 'Yönetici Paneli + Demo Akışı'],
        []
    )

    const problemItems = useMemo(
        () => [
            'Müşteri akışı dağınık ilerliyor.',
            'Ekip aynı işi tekrar tekrar yapıyor.',
            'Geciken dönüşler güven kaybettiriyor.',
            'İş yükü büyüyor ama kontrol küçülüyor.'
        ],
        []
    )

    const agitationItems = useMemo(
        () => [
            'Bugün kaçan lead, yarın rakibin müşterisi olur.',
            'Manuel takip büyüdükçe görünmeyen maliyet patlar.',
            'Ekibe yeni yük bindirmek büyüme değil, yıpranmadır.',
            'Kontrolsüz süreç, reklam bütçesini sessizce yakar.'
        ],
        []
    )

    const benefitCards = useMemo(
        () => [
            {
                icon: <BoltRoundedIcon />,
                title: 'Daha Hızlı Operasyon',
                text: 'Saatler süren takip işini tek panelde dakikalara indirir.'
            },
            {
                icon: <GroupsRoundedIcon />,
                title: 'Daha Az Ekip Baskısı',
                text: 'Tekrar eden işi sistem taşır, çalışanların omzundaki yük hafifler.'
            },
            {
                icon: <InsightsRoundedIcon />,
                title: 'Daha Net Görünürlük',
                text: 'Kim ne yaptı, ne kaldı, ne tıkandı tek bakışta görünür.'
            },
            {
                icon: <SavingsRoundedIcon />,
                title: 'Daha Akıllı Maliyet',
                text: 'Yeni personel eklemeden daha fazla süreci yönetebilirsin.'
            }
        ],
        []
    )

    const beforeAfter = useMemo(
        () => ({
            before: ['Dağınık takip', 'Yoğun ekip baskısı', 'Geç dönüş', 'Sürekli manuel müdahale', 'Kaçan fırsatlar'],
            after: ['Merkezi kontrol', 'Daha hafif iş akışı', 'Hızlı geri dönüş', 'Sistematik yönetim', 'Daha yüksek dönüşüm']
        }),
        []
    )

    const useCases = useMemo(
        () => [
            {
                title: 'Ajanslar İçin',
                text: 'Birden fazla müşteriyi karışıklık yaşamadan yönet, ekibi boğmadan hız kazan.'
            },
            {
                title: 'E-Ticaret İçin',
                text: 'Yoğun mesaj ve dönüş akışını düzenle, satış fırsatlarını gözden kaçırma.'
            },
            {
                title: 'Emlak İçin',
                text: 'Lead akışını hızlandır, geri dönüş süresini düşür, müşteri ilgisini sıcak tut.'
            },
            {
                title: 'Destek Yoğun İşletmeler İçin',
                text: 'Soruları biriktiği yerde erit, yanıt kalitesini korurken süreyi kısalt.'
            }
        ],
        []
    )

    const faqs = useMemo(
        () => [
            {
                q: 'Teknik bilgi olmadan kullanabilir miyim?',
                a: 'Evet. Bu yapı teknik terimlerle boğmaz. Hedefi nettir: hız, kontrol ve sonuç.'
            },
            {
                q: 'Bu sistem küçük ekipler için uygun mu?',
                a: 'Evet. Hatta en güçlü etkiyi küçük ve orta ekiplerde gösterir çünkü dağınıklığı hızlı toplar.'
            },
            {
                q: 'Mobilde düzgün çalışır mı?',
                a: 'Evet. Sayfa ve demo akışı mobil öncelikli düşünülerek kurgulandı.'
            },
            {
                q: 'Yönetici paneli güvenli mi?',
                a: 'Evet. Yönetici alanı ayrı rota mantığıyla konumlandırılır ve doğrudan genel açılışa karışmaz.'
            },
            {
                q: 'Demoyu görmeden karar vermek zorunda mıyım?',
                a: 'Hayır. Önce demoyu gör, sonra paneli incele, sonra kararı ver. Baskı değil netlik sunuyoruz.'
            }
        ],
        []
    )

    const simulationEvents = useMemo(
        () => [
            'Yeni demo oturumu açıldı.',
            'Yönetici paneli önizlemesi görüntülendi.',
            'Mobil görünüm aktif edildi.',
            'Yeni ajans senaryosu incelendi.',
            'Sohbet demosu başlatıldı.',
            'Hız karşılaştırma kartı açıldı.',
            'Ürün önizleme alanı görüntülendi.',
            'Sistem etkileşim önizlemesi güncellendi.'
        ],
        []
    )

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                let { saat, dakika, saniye } = prev
                saniye -= 1

                if (saniye < 0) {
                    saniye = 59
                    dakika -= 1
                }

                if (dakika < 0) {
                    dakika = 59
                    saat -= 1
                }

                if (saat < 0) {
                    return { saat: 11, dakika: 43, saniye: 18 }
                }

                return { saat, dakika, saniye }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const spawnToast = () => {
            const randomIndex = Math.floor(Math.random() * simulationEvents.length)
            const nextMessage = simulationEvents[randomIndex]
            setVisibleToast({ id: Date.now(), message: nextMessage })
            setToastSeed((prev) => prev + 1)
        }

        spawnToast()
        const interval = setInterval(spawnToast, 4200)

        return () => clearInterval(interval)
    }, [simulationEvents])

    useEffect(() => {
        if (!visibleToast) return

        const timeout = setTimeout(() => {
            setVisibleToast(null)
        }, 3400)

        return () => clearTimeout(timeout)
    }, [visibleToast, toastSeed])

    const formatNumber = (value) => String(value).padStart(2, '0')

    return (
        <Box
            sx={{
                minHeight: '100vh',
                color: '#f8fafc',
                background:
                    'radial-gradient(circle at top, rgba(37,99,235,0.22), transparent 28%), linear-gradient(180deg, #081122 0%, #0b1220 35%, #040814 100%)'
            }}
        >
            <Box
                sx={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    background:
                        'linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                    opacity: 0.2
                }}
            />

            <Container maxWidth='xl' sx={{ position: 'relative', py: { xs: 4, md: 6 } }}>
                <Stack spacing={{ xs: 5, md: 8 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 },
                            borderRadius: 5,
                            border: '1px solid rgba(148,163,184,0.18)',
                            background: 'linear-gradient(180deg, rgba(15,23,42,0.92), rgba(15,23,42,0.72))',
                            backdropFilter: 'blur(18px)',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -80,
                                right: -80,
                                width: 220,
                                height: 220,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(59,130,246,0.45), rgba(59,130,246,0))'
                            }}
                        />

                        <Grid container spacing={4} alignItems='center'>
                            <Grid item xs={12} md={7}>
                                <Stack spacing={3}>
                                    <Stack direction='row' spacing={1} flexWrap='wrap'>
                                        <Chip
                                            label='JVZoo Tarzı Dönüşüm Mimarisi'
                                            sx={{
                                                color: '#dbeafe',
                                                bgcolor: 'rgba(37,99,235,0.18)',
                                                border: '1px solid rgba(96,165,250,0.35)'
                                            }}
                                        />
                                        <Chip
                                            label='Simülasyon Etiketli Canlılık Akışı'
                                            sx={{
                                                color: '#fef3c7',
                                                bgcolor: 'rgba(245,158,11,0.18)',
                                                border: '1px solid rgba(245,158,11,0.35)'
                                            }}
                                        />
                                    </Stack>

                                    <Typography
                                        variant='h1'
                                        sx={{
                                            fontSize: { xs: '2.2rem', md: '4.4rem' },
                                            lineHeight: 1.04,
                                            fontWeight: 900,
                                            letterSpacing: '-0.03em',
                                            maxWidth: 760
                                        }}
                                    >
                                        Dağınık operasyon yüzünden müşteri kaçırmayı bırak.
                                    </Typography>

                                    <Typography
                                        sx={{
                                            fontSize: { xs: '1rem', md: '1.2rem' },
                                            color: 'rgba(226,232,240,0.88)',
                                            maxWidth: 700,
                                            lineHeight: 1.7
                                        }}
                                    >
                                        Netlify-Lite, ekip yükünü azaltır, süreci hızlandırır ve kontrolü tek panelde toplar.
                                        Daha fazla personel almadan daha fazla işi yönetmek isteyenler için tasarlandı.
                                    </Typography>

                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                        <Button
                                            variant='contained'
                                            size='large'
                                            endIcon={<ArrowForwardRoundedIcon />}
                                            onClick={() => navigate('/netlify-lite/admin')}
                                            sx={{
                                                minHeight: 54,
                                                px: 3,
                                                fontWeight: 800,
                                                borderRadius: 3,
                                                background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                                                boxShadow: '0 14px 40px rgba(37,99,235,0.35)'
                                            }}
                                        >
                                            Hemen Başla
                                        </Button>

                                        <Button
                                            variant='outlined'
                                            size='large'
                                            endIcon={<LaunchRoundedIcon />}
                                            onClick={() => navigate('/netlify-lite/chat')}
                                            sx={{
                                                minHeight: 54,
                                                px: 3,
                                                fontWeight: 800,
                                                borderRadius: 3,
                                                color: '#f8fafc',
                                                borderColor: 'rgba(148,163,184,0.35)'
                                            }}
                                        >
                                            Demoyu Gör
                                        </Button>
                                    </Stack>

                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap='wrap'>
                                        <FeatureInline text='Tek panelden yönetim' />
                                        <FeatureInline text='Mobilde akıcı deneyim' />
                                        <FeatureInline text='Hızlı kurulum mantığı' />
                                    </Stack>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={5}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        borderRadius: 4,
                                        border: '1px solid rgba(148,163,184,0.16)',
                                        background: 'linear-gradient(180deg, rgba(15,23,42,0.88), rgba(2,6,23,0.8))'
                                    }}
                                >
                                    <Stack spacing={2.2}>
                                        <Typography variant='overline' sx={{ color: '#93c5fd', fontWeight: 800 }}>
                                            Kısa Bakış / Ürün Önizlemesi
                                        </Typography>

                                        <Box
                                            sx={{
                                                p: 2.2,
                                                borderRadius: 3,
                                                background: 'rgba(15,23,42,0.88)',
                                                border: '1px solid rgba(71,85,105,0.45)'
                                            }}
                                        >
                                            <Stack spacing={1.5}>
                                                <PreviewBar title='Yönetici Paneli' value='Aktif' color='#22c55e' />
                                                <PreviewBar title='Sohbet Demo Akışı' value='Hazır' color='#3b82f6' />
                                                <PreviewBar title='Mobil Görünüm' value='Uyumlu' color='#f59e0b' />
                                                <PreviewBar title='Operasyon Takibi' value='Tek Ekran' color='#8b5cf6' />
                                            </Stack>
                                        </Box>

                                        <Grid container spacing={2}>
                                            {stats.map((item) => (
                                                <Grid item xs={6} key={item.label}>
                                                    <Paper
                                                        elevation={0}
                                                        sx={{
                                                            p: 2,
                                                            height: '100%',
                                                            borderRadius: 3,
                                                            background: 'rgba(255,255,255,0.04)',
                                                            border: '1px solid rgba(148,163,184,0.12)'
                                                        }}
                                                    >
                                                        <Typography sx={{ fontSize: 12, color: 'rgba(226,232,240,0.7)' }}>
                                                            {item.label}
                                                        </Typography>
                                                        <Typography sx={{ fontSize: 20, fontWeight: 900, mt: 0.7 }}>
                                                            {item.value}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>

                                        <Alert
                                            severity='success'
                                            sx={{
                                                bgcolor: 'rgba(34,197,94,0.12)',
                                                color: '#dcfce7',
                                                border: '1px solid rgba(34,197,94,0.28)'
                                            }}
                                        >
                                            Bu yapı bilgi vermek için değil, dönüşüm almak için tasarlandı.
                                        </Alert>
                                    </Stack>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper
                        elevation={0}
                        sx={{
                            p: 2.5,
                            borderRadius: 4,
                            background: 'rgba(15,23,42,0.7)',
                            border: '1px solid rgba(148,163,184,0.14)'
                        }}
                    >
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent='space-between' alignItems='center'>
                            <Typography sx={{ fontWeight: 800, color: 'rgba(226,232,240,0.88)' }}>
                                Güven Bandı
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2} flexWrap='wrap'>
                                {trustItems.map((item) => (
                                    <Chip
                                        key={item}
                                        label={item}
                                        sx={{
                                            color: '#e2e8f0',
                                            bgcolor: 'rgba(255,255,255,0.04)',
                                            border: '1px solid rgba(148,163,184,0.16)'
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Stack>
                    </Paper>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SectionCard
                                eyebrow='Problem Teşhisi'
                                title='Sorun küçük değil. Sessizce para kaybettiriyor.'
                                description='İşler büyürken süreçler aynı hızda toparlanmıyorsa kayıp görünmez ama gerçektir.'
                            >
                                <Stack spacing={1.4}>
                                    {problemItems.map((item) => (
                                        <BulletRow key={item} text={item} />
                                    ))}
                                </Stack>
                            </SectionCard>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SectionCard
                                eyebrow='Ajitasyon'
                                title='Bugün çözülmeyen karmaşa, yarın büyümenin önüne duvar örer.'
                                description='Dönüşüm düşer. Ekip yorulur. Reklam bütçesi sessizce yanar. Sorun tam da burada başlar.'
                            >
                                <Stack spacing={1.4}>
                                    {agitationItems.map((item) => (
                                        <BulletRow key={item} text={item} danger />
                                    ))}
                                </Stack>
                            </SectionCard>
                        </Grid>
                    </Grid>

                    <SectionCard
                        eyebrow='Çözüm'
                        title='Netlify-Lite bu dağınıklığı toplar, hızı geri kazandırır, kontrolü tek ekrana çeker.'
                        description='Bu bir özellik listesi değil. Bu bir sonuç makinesi. Problemi çözer, ekip yükünü hafifletir, sistemi büyümeye hazır hale getirir.'
                    >
                        <Grid container spacing={2}>
                            {benefitCards.map((card) => (
                                <Grid item xs={12} sm={6} md={3} key={card.title}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2.2,
                                            height: '100%',
                                            borderRadius: 3,
                                            bgcolor: 'rgba(255,255,255,0.035)',
                                            border: '1px solid rgba(148,163,184,0.14)'
                                        }}
                                    >
                                        <Stack spacing={1.5}>
                                            <Box
                                                sx={{
                                                    width: 44,
                                                    height: 44,
                                                    display: 'grid',
                                                    placeItems: 'center',
                                                    borderRadius: 2.5,
                                                    bgcolor: 'rgba(37,99,235,0.18)',
                                                    color: '#93c5fd'
                                                }}
                                            >
                                                {card.icon}
                                            </Box>
                                            <Typography sx={{ fontWeight: 800, fontSize: 18 }}>{card.title}</Typography>
                                            <Typography sx={{ color: 'rgba(226,232,240,0.8)', lineHeight: 1.7 }}>
                                                {card.text}
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </SectionCard>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SectionCard
                                eyebrow='Önce'
                                title='Sürekli müdahale isteyen yapı'
                                description='Kişiler iş taşır. Sistem arkadan gelir.'
                            >
                                <Stack spacing={1.2}>
                                    {beforeAfter.before.map((item) => (
                                        <BulletRow key={item} text={item} danger />
                                    ))}
                                </Stack>
                            </SectionCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <SectionCard
                                eyebrow='Sonra'
                                title='Merkezi, hızlı ve ölçülebilir yapı'
                                description='Sistem yük alır. Ekip daha az baskıyla daha çok sonuç üretir.'
                            >
                                <Stack spacing={1.2}>
                                    {beforeAfter.after.map((item) => (
                                        <BulletRow key={item} text={item} />
                                    ))}
                                </Stack>
                            </SectionCard>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <MetricCard
                                icon={<AccessTimeRoundedIcon />}
                                title='Zaman Kazancı'
                                value='3 Saatlik işi 20 dakikaya indir.'
                                text='Dağınık akışı tek bakışta toplar. Manuel takibi sistemle ezer.'
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MetricCard
                                icon={<SavingsRoundedIcon />}
                                title='Maliyet Karşılaştırması'
                                value='Yeni personel yerine daha akıllı sistem.'
                                text='Eğitim, koordinasyon ve tekrar maliyetini aşağı çeker.'
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <MetricCard
                                icon={<SecurityRoundedIcon />}
                                title='Otorite + Güven'
                                value='Hızlı dağıtım. Temiz mimari. Ayrı yönetim akışı.'
                                text='Teknik olarak sağlam, ticari olarak agresif bir kurgu.'
                            />
                        </Grid>
                    </Grid>

                    <SectionCard
                        eyebrow='Kimler İçin'
                        title='Bu sistem herkes için değil. Bu sistem hız isteyenler için.'
                        description='Dağınıklıktan bıkmış, ekip yükünü azaltmak isteyen, daha fazla personel almadan daha fazla işi yönetmek isteyenler için.'
                    >
                        <Grid container spacing={2}>
                            {useCases.map((item) => (
                                <Grid item xs={12} sm={6} md={3} key={item.title}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2.2,
                                            borderRadius: 3,
                                            height: '100%',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(148,163,184,0.14)'
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 800, mb: 1 }}>{item.title}</Typography>
                                        <Typography sx={{ color: 'rgba(226,232,240,0.8)', lineHeight: 1.7 }}>{item.text}</Typography>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </SectionCard>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <SectionCard
                                eyebrow='Hızlı Kurulum Sözü'
                                title='Teknik boğulma yok. Hızlı erişim var.'
                                description='Kurulumu yormayan, sonucu güçlendiren yapı. Teknik bilgi gerektirmeden demoyu inceleyebilir, panele geçebilir, akışı görebilirsin.'
                            >
                                <Stack spacing={1.3}>
                                    <BulletRow text='Hızlı kurulum mantığı' />
                                    <BulletRow text='Sade giriş akışı' />
                                    <BulletRow text='Kısa öğrenme eğrisi' />
                                    <BulletRow text='Mobilde ve masaüstünde güçlü görünüm' />
                                </Stack>
                            </SectionCard>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <SectionCard
                                eyebrow='Kıtlık + Aciliyet'
                                title='Erken erişim avantajı kapanmadan hareket et.'
                                description='Kararsızlık burada pahalıdır. Şimdi incele, şimdi gör, şimdi harekete geç.'
                            >
                                <Stack spacing={2}>
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            bgcolor: 'rgba(239,68,68,0.12)',
                                            border: '1px solid rgba(248,113,113,0.28)'
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 800, color: '#fecaca', mb: 1 }}>
                                            Fiyat artışı öncesi kalan süre
                                        </Typography>
                                        <Stack direction='row' spacing={1.4}>
                                            <CountdownBox value={formatNumber(countdown.saat)} label='Saat' />
                                            <CountdownBox value={formatNumber(countdown.dakika)} label='Dakika' />
                                            <CountdownBox value={formatNumber(countdown.saniye)} label='Saniye' />
                                        </Stack>
                                    </Paper>
                                    <Typography sx={{ color: 'rgba(226,232,240,0.8)' }}>
                                        Avantaj kapanmadan önce sistemi gör. Sonra değil. Şimdi.
                                    </Typography>
                                </Stack>
                            </SectionCard>
                        </Grid>
                    </Grid>

                    <SectionCard
                        eyebrow='Risk İmhası'
                        title='Riski sen değil, sistem taşısın.'
                        description='“Ya bana uymazsa?”, “Ya ekip kullanamazsa?”, “Ya gereksiz çıkarsa?” gibi itirazlar, zayıf ürünün problemidir. Güçlü ürün netlik verir.'
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <MiniAssurance icon={<SupportAgentRoundedIcon />} title='Demo Önce' text='Önce akışı gör. Kör karar verme.' />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MiniAssurance icon={<CampaignRoundedIcon />} title='Sonuç Odaklı' text='Özellik değil, iş değeri gör.' />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <MiniAssurance icon={<PhoneIphoneRoundedIcon />} title='Her Cihazda' text='Mobilde bozulmayan deneyim, dönüşümde avantaj sağlar.' />
                            </Grid>
                        </Grid>
                    </SectionCard>

                    <SectionCard
                        eyebrow='Mini SSS'
                        title='İtirazları en baştan temizleyelim.'
                        description='Kararı yavaşlatan soruların cevabı burada. Net. Kısa. Oyalamadan.'
                    >
                        <Stack spacing={2}>
                            {faqs.map((faq) => (
                                <Paper
                                    key={faq.q}
                                    elevation={0}
                                    sx={{
                                        p: 2.2,
                                        borderRadius: 3,
                                        bgcolor: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(148,163,184,0.12)'
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 800, mb: 0.8 }}>{faq.q}</Typography>
                                    <Typography sx={{ color: 'rgba(226,232,240,0.8)', lineHeight: 1.7 }}>{faq.a}</Typography>
                                </Paper>
                            ))}
                        </Stack>
                    </SectionCard>

                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 5 },
                            borderRadius: 5,
                            border: '1px solid rgba(96,165,250,0.22)',
                            background: 'linear-gradient(135deg, rgba(37,99,235,0.20), rgba(124,58,237,0.16))'
                        }}
                    >
                        <Stack spacing={2.5} alignItems='center' textAlign='center'>
                            <Typography variant='overline' sx={{ color: '#bfdbfe', fontWeight: 800 }}>
                                Final Push
                            </Typography>
                            <Typography
                                variant='h2'
                                sx={{
                                    fontSize: { xs: '1.8rem', md: '3rem' },
                                    fontWeight: 900,
                                    maxWidth: 840,
                                    lineHeight: 1.1
                                }}
                            >
                                Sorun zaten ortada. Yük zaten büyüyor. Şimdi mesele şu: Bunu daha ne kadar taşıyacaksın?
                            </Typography>
                            <Typography sx={{ maxWidth: 760, color: 'rgba(226,232,240,0.85)', lineHeight: 1.8 }}>
                                Bu sayfa bilgi vermek için değil, dönüşüm almak için var. Netlify-Lite; hız, kontrol, görünürlük ve daha az ekip baskısı isteyenler için.
                            </Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button
                                    variant='contained'
                                    size='large'
                                    onClick={() => navigate('/netlify-lite/admin')}
                                    sx={{
                                        minHeight: 54,
                                        px: 3,
                                        fontWeight: 900,
                                        borderRadius: 3,
                                        background: 'linear-gradient(90deg, #2563eb, #7c3aed)'
                                    }}
                                >
                                    Şimdi Eriş
                                </Button>
                                <Button
                                    variant='outlined'
                                    size='large'
                                    onClick={() => navigate('/netlify-lite/chat')}
                                    sx={{
                                        minHeight: 54,
                                        px: 3,
                                        fontWeight: 900,
                                        borderRadius: 3,
                                        color: '#fff',
                                        borderColor: 'rgba(255,255,255,0.28)'
                                    }}
                                >
                                    Paneli İncele
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </Stack>
            </Container>

            {visibleToast && (
                <Paper
                    elevation={0}
                    sx={{
                        position: 'fixed',
                        right: 16,
                        bottom: { xs: 84, md: 24 },
                        width: { xs: 'calc(100vw - 32px)', sm: 360 },
                        p: 2,
                        zIndex: 1300,
                        borderRadius: 3,
                        background: 'rgba(15,23,42,0.94)',
                        border: '1px solid rgba(96,165,250,0.22)',
                        boxShadow: '0 16px 50px rgba(2,6,23,0.45)'
                    }}
                >
                    <Stack spacing={1.4}>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Chip
                                label='Simülasyon'
                                sx={{
                                    color: '#dbeafe',
                                    bgcolor: 'rgba(37,99,235,0.18)',
                                    border: '1px solid rgba(96,165,250,0.28)'
                                }}
                            />
                            <IconButton size='small' onClick={() => setVisibleToast(null)} sx={{ color: '#cbd5e1' }}>
                                <CloseRoundedIcon fontSize='small' />
                            </IconButton>
                        </Stack>
                        <Typography sx={{ fontWeight: 800 }}>Canlı Arayüz Örneği</Typography>
                        <Typography sx={{ color: 'rgba(226,232,240,0.82)', lineHeight: 1.6 }}>{visibleToast.message}</Typography>
                    </Stack>
                </Paper>
            )}

            <Box
                sx={{
                    position: 'fixed',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1200,
                    p: 1.5,
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'linear-gradient(180deg, rgba(2,6,23,0), rgba(2,6,23,0.92))'
                }}
            >
                <Button
                    variant='contained'
                    size='large'
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={() => navigate('/netlify-lite/admin')}
                    sx={{
                        minWidth: { xs: '100%', sm: 360 },
                        maxWidth: 420,
                        minHeight: 54,
                        fontWeight: 900,
                        borderRadius: 999,
                        background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                        boxShadow: '0 14px 40px rgba(37,99,235,0.38)'
                    }}
                >
                    Hemen Başla
                </Button>
            </Box>
        </Box>
    )
}

// Bu yardımcı satır küçük ama güçlü güven/fayda işaretlerini tek biçimde gösterir.
function FeatureInline({ text }) {
    return (
        <Stack direction='row' spacing={1} alignItems='center'>
            <CheckCircleRoundedIcon sx={{ color: '#22c55e', fontSize: 18 }} />
            <Typography sx={{ color: 'rgba(226,232,240,0.82)', fontWeight: 600 }}>{text}</Typography>
        </Stack>
    )
}

// Bu bölüm kart iskeletini tekrar kullanılabilir hale getirir.
function SectionCard({ eyebrow, title, description, children }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 2.4, md: 3.2 },
                borderRadius: 4,
                height: '100%',
                background: 'rgba(15,23,42,0.72)',
                border: '1px solid rgba(148,163,184,0.14)'
            }}
        >
            <Stack spacing={2.2}>
                <Box>
                    <Typography variant='overline' sx={{ color: '#93c5fd', fontWeight: 800 }}>
                        {eyebrow}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { xs: '1.45rem', md: '2rem' },
                            fontWeight: 900,
                            lineHeight: 1.15,
                            mt: 0.5
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography sx={{ mt: 1.2, color: 'rgba(226,232,240,0.82)', lineHeight: 1.8 }}>
                        {description}
                    </Typography>
                </Box>
                <Divider sx={{ borderColor: 'rgba(148,163,184,0.12)' }} />
                {children}
            </Stack>
        </Paper>
    )
}

// Bu madde satırı sorun veya fayda öğelerini görsel olarak ayırır.
function BulletRow({ text, danger = false }) {
    return (
        <Stack direction='row' spacing={1.2} alignItems='flex-start'>
            <Box
                sx={{
                    width: 10,
                    height: 10,
                    mt: '8px',
                    borderRadius: '50%',
                    bgcolor: danger ? '#f87171' : '#22c55e',
                    flexShrink: 0
                }}
            />
            <Typography sx={{ color: 'rgba(226,232,240,0.84)', lineHeight: 1.75 }}>{text}</Typography>
        </Stack>
    )
}

// Bu küçük önizleme satırı ürün durumlarını panel hissiyle gösterir.
function PreviewBar({ title, value, color }) {
    return (
        <Stack spacing={0.7}>
            <Stack direction='row' justifyContent='space-between'>
                <Typography sx={{ fontSize: 13, color: 'rgba(226,232,240,0.8)' }}>{title}</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 800 }}>{value}</Typography>
            </Stack>
            <Box sx={{ height: 9, borderRadius: 999, bgcolor: 'rgba(148,163,184,0.12)', overflow: 'hidden' }}>
                <Box sx={{ width: '78%', height: '100%', bgcolor: color, borderRadius: 999 }} />
            </Box>
        </Stack>
    )
}

// Bu kart kritik metrikleri kısa ama sert bir dille vurgular.
function MetricCard({ icon, title, value, text }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.6,
                borderRadius: 4,
                height: '100%',
                background: 'rgba(15,23,42,0.72)',
                border: '1px solid rgba(148,163,184,0.14)'
            }}
        >
            <Stack spacing={1.4}>
                <Box
                    sx={{
                        width: 46,
                        height: 46,
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: 2.5,
                        bgcolor: 'rgba(37,99,235,0.16)',
                        color: '#93c5fd'
                    }}
                >
                    {icon}
                </Box>
                <Typography sx={{ color: 'rgba(226,232,240,0.72)', fontWeight: 700 }}>{title}</Typography>
                <Typography sx={{ fontSize: 24, fontWeight: 900, lineHeight: 1.2 }}>{value}</Typography>
                <Typography sx={{ color: 'rgba(226,232,240,0.82)', lineHeight: 1.7 }}>{text}</Typography>
            </Stack>
        </Paper>
    )
}

// Bu güven kartı küçük itiraz kırıcı bloklar için kullanılır.
function MiniAssurance({ icon, title, text }) {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.2,
                borderRadius: 3,
                height: '100%',
                bgcolor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(148,163,184,0.14)'
            }}
        >
            <Stack spacing={1.2}>
                <Box sx={{ color: '#93c5fd' }}>{icon}</Box>
                <Typography sx={{ fontWeight: 800 }}>{title}</Typography>
                <Typography sx={{ color: 'rgba(226,232,240,0.82)', lineHeight: 1.7 }}>{text}</Typography>
            </Stack>
        </Paper>
    )
}

// Bu sayaç kutusu aciliyet alanını okunur ve sert gösterir.
function CountdownBox({ value, label }) {
    return (
        <Paper
            elevation={0}
            sx={{
                minWidth: 74,
                px: 1.4,
                py: 1.2,
                borderRadius: 2.5,
                bgcolor: 'rgba(2,6,23,0.42)',
                border: '1px solid rgba(248,113,113,0.18)',
                textAlign: 'center'
            }}
        >
            <Typography sx={{ fontSize: 24, fontWeight: 900, color: '#fff' }}>{value}</Typography>
            <Typography sx={{ fontSize: 12, color: 'rgba(254,202,202,0.84)' }}>{label}</Typography>
        </Paper>
    )
}
