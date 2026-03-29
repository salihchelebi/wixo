import { useState } from 'react'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getWixooLiteTexts } from './texts'

export default function AdminLoginPage() {
    const t = getWixooLiteTexts()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const onLogin = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await fetch('/api/admin-login', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || t.loginError)
            navigate('/wixoo-lite/admin')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box sx={{ maxWidth: 520, mx: 'auto', py: 6 }}>
            <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Typography variant='h3'>{t.loginTitle}</Typography>
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
        </Box>
    )
}
