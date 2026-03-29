const { readEnv } = require('./netlifyEnv')

function getSupabaseConfig() {
    const url = readEnv('NEXT_PUBLIC_SUPABASE_URL')
    const serviceRoleKey = readEnv('SUPABASE_SERVICE_ROLE_KEY')

    if (!url) {
        throw new Error('NEXT_PUBLIC_SUPABASE_URL tanımlanmadı.')
    }

    if (!serviceRoleKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY tanımlanmadı.')
    }

    return { url, serviceRoleKey }
}

async function insertDemoMessage({ message, source }) {
    const { url, serviceRoleKey } = getSupabaseConfig()
    const endpoint = `${url.replace(/\/$/, '')}/rest/v1/netlify_lite_messages`

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            apikey: serviceRoleKey,
            authorization: `Bearer ${serviceRoleKey}`,
            prefer: 'return=representation'
        },
        body: JSON.stringify([
            {
                message,
                source
            }
        ])
    })

    const data = await response.json().catch(() => null)
    if (!response.ok) {
        const details = data?.message || data?.error || `Supabase isteği başarısız oldu (${response.status}).`
        throw new Error(details)
    }

    return Array.isArray(data) ? data[0] : data
}

module.exports = {
    insertDemoMessage
}
