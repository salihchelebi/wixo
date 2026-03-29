function readEnv(name) {
    const wixooEnv = globalThis?.Wixoo?.env
    if (wixooEnv && typeof wixooEnv.get === 'function') {
        const value = wixooEnv.get(name)
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
