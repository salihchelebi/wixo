import { useMemo, useState } from 'react'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { demoEvents } from './demoEvents'
import { getNetlifyLiteTexts } from './texts'

// Bu ekran açılışta değer önerisini gösterip yalnız yetkili kullanıcıyı admin paneline güvenli biçimde geçirir.
export default function NetlifyLiteLandingPage() {
    const t = getNetlifyLiteTexts()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const eventPreview = useMemo(() => demoEvents.slice(0, 3), [])

    const onLogin = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await fetch('/api/admin-login', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || t.loginError)
            sessionStorage.setItem('netlifyLiteAdminToken', data.token)
            navigate('/netlify-lite/admin', { replace: true })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ maxWidth: 1100, mx: 'auto', py: 5, px: 2 }}>
            <Stack spacing={3}>
                <Paper sx={{ p: 4 }}>
                    <Stack spacing={2}>
                        <Typography variant='h2'>{t.landingHeadline}</Typography>
                        <Typography variant='body1'>{t.landingSubheadline}</Typography>
                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                            {eventPreview.map((event) => (
                                <Paper key={event.id} variant='outlined' sx={{ p: 2, flex: 1 }}>
                                    <Typography variant='subtitle2'>{event.type}</Typography>
                                    <Typography variant='body2'>{event.detail}</Typography>
                                </Paper>
                            ))}
                        </Stack>
                    </Stack>
                </Paper>

                <Paper sx={{ p: 4 }}>
                    <Stack spacing={2}>
                        <Typography variant='h4'>{t.loginTitle}</Typography>
                        <Typography variant='body2'>{t.loginSubtitle}</Typography>
                        {error && <Alert severity='error'>{error}</Alert>}
                        <TextField label={t.loginUsername} value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
                        <TextField
                            label={t.loginPassword}
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                        <Button variant='contained' onClick={onLogin} disabled={loading}>
                            {t.loginButton}
                        </Button>
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    )
}
