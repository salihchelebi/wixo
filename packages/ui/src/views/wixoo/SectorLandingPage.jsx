import { Box, Button, Chip, Container, Paper, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SECTOR_PAGE_CONTENT, getSectorByKey } from './sectors'

export default function SectorLandingPage() {
    const navigate = useNavigate()
    const { sectorKey } = useParams()
    const sector = getSectorByKey(sectorKey || '')

    const content = useMemo(() => {
        if (!sector || !sector.active) return null
        return SECTOR_PAGE_CONTENT[sector.key] || null
    }, [sector])

    if (!content) {
        return (
            <Container maxWidth='md' sx={{ py: 8 }}>
                <Paper sx={{ p: 4 }}>
                    <Stack spacing={2}>
                        <Typography variant='h3'>Bu sektör sayfası yakında yayında.</Typography>
                        <Button variant='outlined' onClick={() => navigate('/wixoo-lite')}>
                            Ana sayfaya dön
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        )
    }

    return (
        <Box sx={{ backgroundColor: '#f8fafc', minHeight: '100vh', py: 8 }}>
            <Container maxWidth='lg'>
                <Paper sx={{ p: { xs: 3, md: 5 } }}>
                    <Stack spacing={3}>
                        <Chip label={content.eyebrow} sx={{ width: 'fit-content' }} />
                        <Typography variant='h1'>{content.heroTitle}</Typography>
                        <Typography variant='body1'>{content.heroDescription}</Typography>

                        <Stack spacing={1.5}>
                            {content.blocks.map((item) => (
                                <Typography key={item} variant='body1'>
                                    • {item}
                                </Typography>
                            ))}
                        </Stack>

                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
                            <Button variant='contained' onClick={() => navigate('/wixoo-lite/chat')}>
                                {content.ctas[1]}
                            </Button>
                            <Button variant='outlined' onClick={() => navigate('/wixoo-lite')}>
                                Ana sayfaya dön
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    )
}
