import { useEffect, useState } from 'react'
import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import { getNetlifyLiteTexts } from './texts'

const defaultForm = {
    assistantName: '',
    systemPrompt: '',
    welcomeMessage: '',
    primaryColor: '#2563eb',
    model: '',
    temperature: 0.2,
    enabled: true
}

// Bu ekran tek admin paneli için asistan ayarlarını Türkçe alanlarla okuyup kaydetme akışını sağlar.
export default function NetlifyLiteAdminPage() {
    const [form, setForm] = useState(defaultForm)
    const t = getNetlifyLiteTexts()
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const loadConfig = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await fetch('/api/admin-config')
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || t.fetchConfigError)
            setForm({
                assistantName: data.config.assistantName,
                systemPrompt: data.config.systemPrompt,
                welcomeMessage: data.config.welcomeMessage,
                primaryColor: data.config.primaryColor,
                model: data.config.model,
                temperature: data.config.temperature,
                enabled: data.config.enabled
            })
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Bu çağrı admin ekranını doğrudan erişimde de yükleyip rota ayrımını güvenli biçimde korur.
        loadConfig()
    }, [])

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

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Typography variant='h3'>{t.adminTitle}</Typography>
                    <Typography variant='body2'>{t.adminSubtitle}</Typography>
                    {message && <Alert severity='success'>{message}</Alert>}
                    {error && <Alert severity='error'>{error}</Alert>}
                    <TextField label={t.assistantName} value={form.assistantName} onChange={onChange('assistantName')} fullWidth />
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
