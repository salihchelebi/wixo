import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
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
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

export default function LandingPage() {
    const navigate = useNavigate()
    const [visibleToast, setVisibleToast] = useState(null)
    const [countdown, setCountdown] = useState({ h: 11, m: 43, s: 18 })

    const trustItems = [
        'Netlify Destekli Dağıtım',
        'Neon Veri Altyapısı',
        'Mobil Uyumlu Deneyim',
        'Yönetici Paneli + Demo Akışı',
        'Hızlı Kurulum Yapısı'
    ]

    const heroBullets = [
        'Saatler süren işi dakikalara indir',
        'Daha fazla personel almadan daha fazla işi yönet',
        'Dağınıklığı bırak, kontrolü geri al'
    ]

    const floatingEvents = useMemo(
        () => [
            'Yeni demo oturumu açıldı',
            'Yönetici paneli önizlemesi görüntülendi',
            'Mobil görünüm aktif edildi',
            'E-ticaret kullanım senaryosu incelendi',
            'Sohbet demosu başlatıldı',
            'Hız karşılaştırma modülü görüntülendi',
            'Ürün önizleme alanı açıldı',
            'Simülasyon akışı yenilendi'
        ],
        []
    )

    const modules = [
        {
            badge: 'Operasyon Kontrolü',
            title: 'Dağınık süreci topla. Hızı geri kazan.',
            text: 'Netlify-Lite, iş akışını tek merkezde toplar. Ekip baskısını düşürür, görünürlüğü artırır ve operasyonu daha az müdahale ile yönetmeni sağlar.',
            visual: '/marketingblocks-ref/module-operations-main.webp',
            theme: 'light',
            items: [
                { image: '/marketingblocks-ref/op-1.webp', text: 'İş takibini tek bakışta görünür hale getir' },
                { image: '/marketingblocks-ref/op-2.webp', text: 'Ekip üzerindeki tekrar yükünü azalt' },
                { image: '/marketingblocks-ref/op-3.webp', text: 'Geciken dönüşleri hızlandır' },
                { image: '/marketingblocks-ref/op-4.webp', text: 'Müşteri akışını düzenli yönet' },
                { image: '/marketingblocks-ref/op-5.webp', text: 'Daha az kaos, daha çok kontrol kur' },
                { image: '/marketingblocks-ref/op-6.webp', text: 'Süreçleri kişilere değil sisteme bağla' }
            ]
        },
        {
            badge: 'Yönetici Paneli',
            title: 'Karar vermeyi kolaylaştıran net görünüm.',
            text: 'Kimin ne yaptığı, hangi işin tıkandığı, neyin hızlandırılması gerektiği tek panelde görünür. Bu sayede kör yönetim değil, kontrollü büyüme başlar.',
            visual: '/marketingblocks-ref/module-admin-main.webp',
            theme: 'dark',
            items: [
                { image: '/marketingblocks-ref/admin-1.webp', text: 'Yönetim görünümü ile darboğazları erken gör' },
                { image: '/marketingblocks-ref/admin-2.webp', text: 'Yoğunluğu dağıt, ekibi rahatlat' },
                { image: '/marketingblocks-ref/admin-3.webp', text: 'Süreçleri tek merkezden takip et' },
                { image: '/marketingblocks-ref/admin-4.webp', text: 'Daha yüksek görünürlük ile daha hızlı karar al' },
                { image: '/marketingblocks-ref/admin-5.webp', text: 'Operasyonun neresinde kayıp var hemen fark et' },
                { image: '/marketingblocks-ref/admin-6.webp', text: 'Manuel kontrol yerine sistematik yönetim kur' }
            ]
        },
        {
            badge: 'Sohbet + Demo',
            title: 'Müşteri akışını kaçırma. Yanıt hızını yükselt.',
            text: 'Demo ve sohbet katmanı, kullanıcının sistemi hissetmesini sağlar. Hızlı yanıt, daha az bekleme ve daha yüksek etkileşim ile dönüşüm baskısını artırır.',
            visual: '/marketingblocks-ref/module-chat-main.webp',
            theme: 'light',
            items: [
                { image: '/marketingblocks-ref/chat-1.webp', text: 'Demo akışı ile ürünü hemen hissettir' },
                { image: '/marketingblocks-ref/chat-2.webp', text: 'İkinci CTA ile kararsız kullanıcıyı kaybetme' },
                { image: '/marketingblocks-ref/chat-3.webp', text: 'Sohbet deneyimini ürün kanıtına dönüştür' },
                { image: '/marketingblocks-ref/chat-4.webp', text: 'Kullanıcıyı inceleyen değil harekete geçen yap' },
                { image: '/marketingblocks-ref/chat-5.webp', text: 'Mobilde de güçlü deneyim sun' },
                { image: '/marketingblocks-ref/chat-6.webp', text: 'Canlılık hissi ile güven oluştur' }
            ]
        },
        {
            badge: 'Fayda + Büyüme',
            title: 'Daha fazla yük değil, daha fazla sonuç.',
            text: 'Bu yapı özellik satmak için değil, iş değeri üretmek için var. Daha hızlı operasyon, daha düşük ekip baskısı, daha net görünürlük ve daha akıllı maliyet sağlar.',
            visual: '/marketingblocks-ref/module-growth-main.webp',
            theme: 'dark',
            items: [
                { image: '/marketingblocks-ref/growth-1.webp', text: '3 saatlik işi 20 dakikaya indir' },
                { image: '/marketingblocks-ref/growth-2.webp', text: 'Yeni personel maliyeti yerine sistem kur' },
                { image: '/marketingblocks-ref/growth-3.webp', text: 'Ajanslar için daha güçlü kontrol' },
                { image: '/marketingblocks-ref/growth-4.webp', text: 'E-ticaret için daha hızlı geri dönüş' },
                { image: '/marketingblocks-ref/growth-5.webp', text: 'Emlak ve destek ekipleri için daha net akış' },
                { image: '/marketingblocks-ref/growth-6.webp', text: 'Mobil, hızlı ve premium görünüm ile güven ver' }
            ]
        }
    ]

    const comparisons = {
        before: [
            'Dağınık takip',
            'Yoğun ekip baskısı',
            'Geç dönüş',
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
            a: 'Evet. Deneyim mobil öncelikli düşünülerek tasarlandı.'
        },
        {
            q: 'Yönetici paneli güvenli mi?',
            a: 'Evet. Yönetici alanı ayrı rota mantığıyla çalışır ve genel açılışla karışmaz.'
        },
        {
            q: 'Demoyu görmeden karar vermek zorunda mıyım?',
            a: 'Hayır. Önce demoyu gör, sonra incele, sonra karar ver.'
        },
        {
            q: 'Memnun kalmazsam ne olur?',
            a: 'Risk senin değil, sistemin üzerinde olmalı. Garanti dilini ve itiraz kırıcı yapıyı bunun için ekliyoruz.'
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                let { h, m, s } = prev
                s -= 1
                if (s < 0) {
                    s = 59
                    m -= 1
                }
                if (m < 0) {
                    m = 59
                    h -= 1
                }
                if (h < 0) return { h: 11, m: 43, s: 18 }
                return { h, m, s }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const spawn = () => {
            const message = floatingEvents[Math.floor(Math.random() * floatingEvents.length)]
            setVisibleToast({ id: Date.now(), message })
        }

        spawn()
        const interval = setInterval(spawn, 4500)
        return () => clearInterval(interval)
    }, [floatingEvents])

    useEffect(() => {
        if (!visibleToast) return
        const timeout = setTimeout(() => setVisibleToast(null), 3200)
        return () => clearTimeout(timeout)
    }, [visibleToast])

    const fmt = (n) => String(n).padStart(2, '0')

    return (
        <Box
            sx={{
                background: '#fff',
                color: '#111827',
                overflowX: 'hidden'
            }}
        >
            <HeroBackground />

            <Box
                sx={{
                    background:
                        'linear-gradient(180deg, #081225 0%, #101f3d 42%, #ffffff 42%, #ffffff 100%)'
                }}
            >
                <Container maxWidth='xl' sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 10 } }}>
                    <Stack spacing={4}>
                        <Stack
                            direction={{ xs: 'column', md: 'row' }}
                            justifyContent='space-between'
                            alignItems='center'
                            spacing={2}
                        >
                            <Stack direction='row' alignItems='center' spacing={1.5}>
                                <Box
                                    component='img'
                                    src='/marketingblocks-ref/logo.webp'
                                    alt='Netlify Lite'
                                    sx={{ width: 44, height: 44, borderRadius: 2 }}
                                />
                                <Typography sx={{ color: '#fff', fontSize: 24, fontWeight: 900 }}>
                                    Netlify-Lite
                                </Typography>
                            </Stack>

                            <Stack direction='row' spacing={1.2} flexWrap='wrap'>
                                <Chip label='Premium UI' sx={topChipSx} />
                                <Chip label='CRO Odaklı' sx={topChipSx} />
                                <Chip label='Simülasyonlu Demo' sx={topChipSx} />
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
                                            Netlify-Lite; ekip yükünü azaltır, süreci hızlandırır ve kontrolü tek panelde toplar.
                                            Daha fazla personel almadan daha fazla işi yönetmek isteyenler için tasarlandı. Bu
                                            sayfa bilgi vermek için değil, dönüşüm almak için var.
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
                                                onClick={() => navigate('/netlify-lite/admin')}
                                                variant='contained'
                                                endIcon={<ArrowForwardRoundedIcon />}
                                                sx={primaryCtaSx}
                                            >
                                                HEMEN BAŞLA
                                            </Button>

                                            <Button
                                                onClick={() => navigate('/netlify-lite/chat')}
                                                variant='outlined'
                                                startIcon={<PlayCircleRoundedIcon />}
                                                sx={secondaryCtaSx}
                                            >
                                                DEMOYU GÖR
                                            </Button>
                                        </Stack>

                                        <Typography sx={{ mt: 2.5, color: 'rgba(255,255,255,0.68)', fontSize: 13 }}>
                                            Hızlı kurulum • Mobil uyumlu • Yönetici paneli • Demo akışı • Simülasyon etiketi
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
                                            <Box component='img' src='/marketingblocks-ref/hero-main.webp' alt='Hero preview' sx={mockImageSx} />
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
                                        Modern altyapı. Hızlı erişim. Premium görünüm. Güven veren akış.
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

                    {modules.map((module, index) => (
                        <FeatureMegaSection
                            key={module.title}
                            reverse={index % 2 === 1}
                            badge={module.badge}
                            title={module.title}
                            text={module.text}
                            visual={module.visual}
                            items={module.items}
                            dark={module.theme === 'dark'}
                        />
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
                                        Kuru vaat değil, güven veren yapı. “Ya uymazsa?”, “Ya ekip kullanamazsa?”,
                                        “Ya gereksiz çıkarsa?” gibi itirazlar için sayfanın bu alanı kullanıcıyı rahatlatmalı.
                                        Riski kullanıcı değil, sistem taşıyor hissi burada açıkça verilmeli.
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper elevation={0} sx={countdownCardSx}>
                                <Typography sx={{ color: '#b91c1c', fontWeight: 900, fontSize: 18 }}>
                                    Fiyat artışı öncesi kalan süre
                                </Typography>
                                <Stack direction='row' spacing={1.5} mt={2.5}>
                                    <CountBox value={fmt(countdown.h)} label='Saat' />
                                    <CountBox value={fmt(countdown.m)} label='Dakika' />
                                    <CountBox value={fmt(countdown.s)} label='Saniye' />
                                </Stack>
                                <Typography sx={{ mt: 2.5, color: '#6b7280', lineHeight: 1.8 }}>
                                    Kararsızlık burada pahalıdır. Şimdi incele. Şimdi gör. Şimdi harekete geç.
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

                    <Paper elevation={0} sx={finalCtaWrapSx}>
                        <Stack spacing={2.5} alignItems='center' textAlign='center'>
                            <Chip label='FINAL PUSH' sx={finalChipSx} />
                            <Typography sx={{ fontWeight: 900, fontSize: { xs: '2rem', md: '3.8rem' }, lineHeight: 1.08, maxWidth: 920 }}>
                                Sorun zaten ortada. Yük zaten büyüyor. Şimdi mesele şu: Bunu daha ne kadar taşıyacaksın?
                            </Typography>
                            <Typography sx={{ maxWidth: 780, color: 'rgba(255,255,255,0.84)', lineHeight: 1.9 }}>
                                Bu sayfa klasik ürün tanıtımı değil. Dönüşüm makinesi olarak çalışmalı. Ziyaretçiyi durdurmalı,
                                problemi hissettirmeli, çözümü güçlü biçimde sunmalı ve sonunda kullanıcıyı karara zorlamalı.
                            </Typography>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <Button variant='contained' onClick={() => navigate('/netlify-lite/admin')} sx={bottomPrimarySx}>
                                    ŞİMDİ ERİŞ
                                </Button>
                                <Button variant='outlined' onClick={() => navigate('/netlify-lite/chat')} sx={bottomSecondarySx}>
                                    PANELİ İNCELE
                                </Button>
                            </Stack>

                            <Box
                                component='img'
                                src='/marketingblocks-ref/final-proof.webp'
                                alt='Final preview'
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

            {visibleToast && (
                <Paper elevation={0} sx={toastSx}>
                    <Stack spacing={1.2}>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <Chip label='Simülasyon' sx={toastChipSx} />
                            <IconButton size='small' onClick={() => setVisibleToast(null)} sx={{ color: '#d1d5db' }}>
                                <CloseRoundedIcon fontSize='small' />
                            </IconButton>
                        </Stack>
                        <Typography sx={{ fontWeight: 900, color: '#fff' }}>Canlı Arayüz Örneği</Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.76)', lineHeight: 1.7 }}>{visibleToast.message}</Typography>
                    </Stack>
                </Paper>
            )}

            <Box sx={floatingBarSx}>
                <Button
                    variant='contained'
                    endIcon={<ArrowForwardRoundedIcon />}
                    onClick={() => navigate('/netlify-lite/admin')}
                    sx={floatingCtaSx}
                >
                    HEMEN BAŞLA
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
            <Typography sx={{ mt: 1.2, fontWeight: 900, fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.12 }}>
                {title}
            </Typography>
            <Typography sx={{ mt: 1.8, color: '#6b7280', maxWidth: 860, mx: 'auto', lineHeight: 1.9 }}>{text}</Typography>
        </Box>
    )
}

function FeatureMegaSection({ badge, title, text, visual, items, dark = false, reverse = false }) {
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

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3.5}>
                            <Button variant='contained' sx={modulePrimarySx}>
                                HEMEN BAŞLA
                            </Button>
                            <Button variant='outlined' sx={moduleSecondarySx}>
                                DEMOYU GÖR
                            </Button>
                        </Stack>
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Box sx={{ p: { xs: 2.5, md: 4 }, height: '100%' }}>
                        <Paper elevation={0} sx={{ ...mockFrameSx, background: dark ? '#0b1220' : '#fff' }}>
                            <Box component='img' src={visual} alt={title} sx={mockImageSx} />
                        </Paper>
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ px: { xs: 2.5, md: 4 }, pb: { xs: 3, md: 4 } }}>
                <Grid container spacing={2}>
                    {items.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.text}>
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: 4,
                                    p: 2,
                                    height: '100%',
                                    background: dark ? 'rgba(255,255,255,0.04)' : '#ffffff',
                                    border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #e5e7eb'
                                }}
                            >
                                <Stack spacing={1.3}>
                                    <Box
                                        component='img'
                                        src={item.image}
                                        alt={item.text}
                                        sx={{
                                            width: '100%',
                                            borderRadius: 3,
                                            aspectRatio: '16/10',
                                            objectFit: 'cover',
                                            border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid #eef2f7'
                                        }}
                                    />
                                    <Typography sx={{ fontWeight: 800, lineHeight: 1.6, color: dark ? '#fff' : '#1f2937' }}>
                                        {item.text}
                                    </Typography>
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
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

function CountBox({ value, label }) {
    return (
        <Paper
            elevation={0}
            sx={{
                minWidth: 88,
                px: 2,
                py: 1.8,
                borderRadius: 3,
                textAlign: 'center',
                background: '#fff',
                border: '1px solid #fee2e2'
            }}
        >
            <Typography sx={{ fontWeight: 900, fontSize: 28, color: '#111827' }}>{value}</Typography>
            <Typography sx={{ color: '#6b7280', fontSize: 12 }}>{label}</Typography>
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
    objectFit: 'cover'
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

const toastSx = {
    position: 'fixed',
    right: 16,
    bottom: { xs: 84, md: 24 },
    zIndex: 1200,
    width: { xs: 'calc(100vw - 32px)', sm: 360 },
    p: 2,
    borderRadius: 3,
    background: 'rgba(15,23,42,0.96)',
    border: '1px solid rgba(255,255,255,0.10)',
    boxShadow: '0 20px 50px rgba(0,0,0,0.30)'
}

const toastChipSx = {
    color: '#fff',
    background: 'rgba(37,99,235,0.28)',
    border: '1px solid rgba(96,165,250,0.28)',
    fontWeight: 800
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
