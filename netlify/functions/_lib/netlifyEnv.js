function readEnv(name) {
    const netlifyEnv = globalThis?.Netlify?.env
    if (netlifyEnv && typeof netlifyEnv.get === 'function') {
        const value = netlifyEnv.get(name)
        if (value !== undefined && value !== null && String(value).trim() !== '') {
            return String(value)
        }
    }

    const processValue = process.env[name]
    if (processValue !== undefined && processValue !== null && String(processValue).trim() !== '') {
        return String(processValue)
    }

    return ''
}

module.exports = {
    readEnv
}
