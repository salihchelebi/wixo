import { useEffect, useState } from 'react'
import { Alert, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { getAiAsistanTexts } from './texts'

export default function AiAsistanChatPage() {
    const [assistantName, setAssistantName] = useState('Asistan')
    const [primaryColor, setPrimaryColor] = useState('#2563eb')
    const [welcomeMessage, setWelcomeMessage] = useState(getAiAsistanTexts().loading)
    const [message, setMessage] = useState('')
    const [reply, setReply] = useState('')
    const [error, setError] = useState('')
    const [sessionId, setSessionId] = useState('')
    const [sessionMeta, setSessionMeta] = useState({})
    const t = getAiAsistanTexts()

    useEffect(() => {
        const load = async () => {
            try {
                const response = await fetch('/api/admin-config', { credentials: 'include' })
                const data = await response.json()
                if (!response.ok) throw new Error(data.error || t.fetchConfigError)
                setAssistantName(data.config.assistantName)
                setPrimaryColor(data.config.primaryColor)
                setWelcomeMessage(data.config.welcomeMessage)
                setSessionMeta({
                    workspaceId: data.config.workspaceId,
                    sectorKey: data.config.sectorKey,
                    landingVariant: data.config.landingVariant
                })
            } catch {
                setWelcomeMessage('Merhaba, NISSAI mesaj merkezine hoş geldiniz. Mesajınızı iletebilirsiniz.')
            }
        }
        load()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const existing = window.localStorage.getItem('ai_asistan_session_id')
        const next = existing || crypto.randomUUID()
        if (!existing) window.localStorage.setItem('ai_asistan_session_id', next)
        setSessionId(next)
    }, [])

    const onSend = async () => {
        setError('')
        setReply('')
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ message, sessionId, sessionMeta })
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
