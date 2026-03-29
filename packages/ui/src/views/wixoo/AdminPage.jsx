import { useEffect, useState } from 'react'
import { Alert, Box, Button, Checkbox, FormControlLabel, Paper, Stack, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getWixooLiteTexts } from './texts'

const defaultForm = {
    assistantName: '',
    assistantRole: '',
    systemPrompt: '',
    welcomeMessage: '',
    primaryColor: '#2563eb',
    provider: 'ollama',
    baseUrl: 'http://localhost:11434',
    apiKey: '',
    model: '',
    temperature: 0.2,
    sectorKey: 'lawyers',
    landingVariant: 'general',
    ctaTarget: '/wixoo-lite/sektor/avukatlar',
    theme: 'light',
    enabled: true
}

export default function WixooLiteAdminPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState(defaultForm)
    const t = getWixooLiteTexts()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const ensureAuth = async () => {
        const response = await fetch('/api/admin-session', { credentials: 'include' })
        if (response.ok) return true
        navigate('/wixoo-lite/login', { replace: true })
        return false
    }

    const loadConfig = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await fetch('/api/admin-config', { credentials: 'include' })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || t.fetchConfigError)
            setForm((prev) => ({ ...prev, ...data.config }))
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const boot = async () => {
            const authenticated = await ensureAuth()
            if (!authenticated) return
            await loadConfig()
        }
        boot()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate])

    const onChange = (key) => (event) => {
        const value = key === 'enabled' ? event.target.checked : event.target.value
        setForm((prev) => ({ ...prev, [key]: value }))
    }

    const onSave = async () => {
        setLoading(true)
        setMessage('')
        setError('')
        try {
            const response = await fetch('/api/admin-config', {
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    temperature: Number(form.temperature)
                })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || t.saveError)
            setMessage(t.saveSuccess)
            setForm((prev) => ({ ...prev, ...data.config }))
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const onReset = async () => {
        setLoading(true)
        setMessage('')
        setError('')
        try {
            const response = await fetch('/api/admin-config', {
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ action: 'reset' })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || t.resetError)
            setMessage(t.resetSuccess)
            setForm((prev) => ({ ...prev, ...data.config }))
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const onLogout = async () => {
        await fetch('/api/admin-session', { method: 'DELETE', credentials: 'include' })
        navigate('/wixoo-lite/login', { replace: true })
    }

    return (
        <Box sx={{ maxWidth: 960, mx: 'auto', py: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <Typography variant='h3'>{t.adminTitle}</Typography>
                        <Button variant='text' onClick={onLogout}>
                            {t.logout}
                        </Button>
                    </Stack>
                    <Typography variant='body2'>{t.adminSubtitle}</Typography>
                    {message && <Alert severity='success'>{message}</Alert>}
                    {error && <Alert severity='error'>{error}</Alert>}
                    <TextField label={t.assistantName} value={form.assistantName} onChange={onChange('assistantName')} fullWidth />
                    <TextField label={t.assistantRole} value={form.assistantRole} onChange={onChange('assistantRole')} fullWidth />
                    <TextField
                        label={t.systemPrompt}
                        value={form.systemPrompt}
                        onChange={onChange('systemPrompt')}
                        multiline
                        minRows={3}
                        fullWidth
                    />
                    <TextField
                        label={t.welcomeMessage}
                        value={form.welcomeMessage}
                        onChange={onChange('welcomeMessage')}
                        multiline
                        minRows={2}
                        fullWidth
                    />
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField label={t.provider} value={form.provider} onChange={onChange('provider')} fullWidth />
                        <TextField label={t.baseUrl} value={form.baseUrl} onChange={onChange('baseUrl')} fullWidth />
                        <TextField label={t.apiKey} value={form.apiKey} onChange={onChange('apiKey')} fullWidth />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField label={t.primaryColor} value={form.primaryColor} onChange={onChange('primaryColor')} fullWidth />
                        <TextField label={t.model} value={form.model} onChange={onChange('model')} fullWidth />
                        <TextField
                            label={t.temperature}
                            type='number'
                            value={form.temperature}
                            onChange={onChange('temperature')}
                            inputProps={{ min: 0, max: 1, step: 0.1 }}
                            fullWidth
                        />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                        <TextField label={t.sectorKey} value={form.sectorKey} onChange={onChange('sectorKey')} fullWidth />
                        <TextField label={t.landingVariant} value={form.landingVariant} onChange={onChange('landingVariant')} fullWidth />
                        <TextField label={t.ctaTarget} value={form.ctaTarget} onChange={onChange('ctaTarget')} fullWidth />
                        <TextField label={t.theme} value={form.theme} onChange={onChange('theme')} fullWidth />
                    </Stack>
                    <FormControlLabel
                        control={<Checkbox checked={Boolean(form.enabled)} onChange={onChange('enabled')} />}
                        label={t.enabled}
                    />
                    <Stack direction='row' spacing={2}>
                        <Button variant='contained' onClick={onSave} disabled={loading}>
                            {t.save}
                        </Button>
                        <Button variant='outlined' onClick={onReset} disabled={loading}>
                            {t.reset}
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}
