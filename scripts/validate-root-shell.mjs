const previewUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:4173'

const rootResponse = await fetch(previewUrl)
if (!rootResponse.ok) {
    throw new Error(`Root page is not reachable: ${rootResponse.status} ${rootResponse.statusText}`)
}

const html = await rootResponse.text()
if (!/<div[^>]*id=["']root["'][^>]*>/i.test(html)) {
    throw new Error('Root HTML does not include <div id="root">.')
}

if (!/<script\b[^>]*>/i.test(html)) {
    throw new Error('Root HTML does not include any script tag.')
}

const settingsUrl = `${previewUrl.replace(/\/$/, '')}/api/v1/settings`
const settingsResponse = await fetch(settingsUrl)
const contentType = settingsResponse.headers.get('content-type') || ''

if (settingsResponse.ok && contentType.includes('application/json')) {
    const settingsJson = await settingsResponse.json()
    if (!settingsJson || typeof settingsJson !== 'object') {
        throw new Error('Settings payload is not an object.')
    }

    if (!('PLATFORM_TYPE' in settingsJson) && !('data' in settingsJson)) {
        throw new Error('Settings payload does not contain PLATFORM_TYPE or data keys.')
    }

    console.log(`Root HTML and settings checks passed for ${previewUrl}`)
} else {
    console.warn(
        `Root HTML checks passed for ${previewUrl}, but ${settingsUrl} is not JSON (status=${settingsResponse.status}, content-type=${
            contentType || 'unknown'
        }).`
    )
}
