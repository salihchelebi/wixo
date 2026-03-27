import { useEffect, useState } from 'react'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getNetlifyLiteTexts } from './texts'

// Bu ekran tek chat/demo akışını config renk ve asistan adıyla Netlify uyumlu şekilde çalıştırır.
export default function NetlifyLiteChatPage() {
    const navigate = useNavigate()
    const [assistantName, setAssistantName] = useState('Asistan')
    const [primaryColor, setPrimaryColor] = useState('#2563eb')
    const [welcomeMessage, setWelcomeMessage] = useState(getNetlifyLiteTexts().loading)
    const [message, setMessage] = useState('')
    const [reply, setReply] = useState('')
    const [error, setError] = useState('')
    const t = getNetlifyLiteTexts()

    useEffect(() => {
        const load = async () => {
            // Bu kontrol sohbet ekranına yalnız giriş tokenı olan kullanıcının erişmesini güvenli biçimde sağlar.
            if (!sessionStorage.getItem('netlifyLiteAdminToken')) {
                navigate('/netlify-lite', { replace: true })
                return
            }
            try {
                const response = await fetch('/api/admin-config')
                const data = await response.json()
                if (!response.ok) throw new Error(data.error || t.fetchConfigError)
                setAssistantName(data.config.assistantName)
                setPrimaryColor(data.config.primaryColor)
                setWelcomeMessage(data.config.welcomeMessage)
            } catch (err) {
                setError(err.message)
            }
        }
        load()
    }, [navigate])

    const onSend = async () => {
        setError('')
        setReply('')
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ message })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || t.chatError)
            setReply(data.reply)
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Typography variant='h3' sx={{ color: primaryColor }}>
                        {assistantName} {t.chatTitleSuffix}
                    </Typography>
                    <Typography variant='body1'>{welcomeMessage}</Typography>
                    {error && <Alert severity='error'>{error}</Alert>}
                    <TextField
                        label={t.userMessage}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <Button variant='contained' onClick={onSend} sx={{ backgroundColor: primaryColor }}>
                        {t.send}
                    </Button>
                    <TextField label={t.assistantReply} value={reply} multiline minRows={4} fullWidth InputProps={{ readOnly: true }} />
                </Stack>
            </Paper>
        </Box>
    )
}
