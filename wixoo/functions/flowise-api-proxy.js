exports.handler = async (event) => {
    try {
        if (event.httpMethod === 'OPTIONS') {
            return jsonResponse(204, null)
        }

        const proxyPath = resolveProxyPath(event)
        const baseUrl = process.env.FLOWISE_API_BASE_URL || process.env.VITE_API_BASE_URL

        if (!baseUrl) {
            if (proxyPath === 'v1/settings') {
                return jsonResponse(200, {
                    PLATFORM_TYPE: 'openSource'
                })
            }

            if (proxyPath === 'v1/resolve-login') {
                return jsonResponse(200, {
                    redirectUrl: '/signin'
                })
            }

            return jsonResponse(200, {
                error: null,
                data: {}
            })
        }

        const cleanBase = baseUrl.replace(/\/$/, '')
        const query = buildQueryString(event.queryStringParameters)
        const upstreamUrl = `${cleanBase}/api/${proxyPath}${query}`

        const upstreamResponse = await fetch(upstreamUrl, {
            method: event.httpMethod,
            headers: buildForwardHeaders(event.headers),
            body: canHaveBody(event.httpMethod) ? event.body : undefined
        })

        const responseBody = await upstreamResponse.text()
        return {
            statusCode: upstreamResponse.status,
            headers: buildResponseHeaders(upstreamResponse.headers),
            body: responseBody
        }
    } catch (error) {
        return jsonResponse(502, {
            error: String(error?.message || 'Proxy isteği başarısız oldu.')
        })
    }
}

function resolveProxyPath(event) {
    const fromSplat = event.pathParameters?.splat
    if (fromSplat) return trimLeadingSlash(fromSplat)

    const rawPath = event.path || event.rawUrl || ''
    const pathOnly = rawPath.split('?')[0]

    if (pathOnly.startsWith('/api/')) {
        return trimLeadingSlash(pathOnly.replace('/api/', ''))
    }

    return 'v1/settings'
}

function trimLeadingSlash(value = '') {
    return value.replace(/^\/+/, '')
}

function buildForwardHeaders(headers = {}) {
    const forwarded = {}
    const allowed = ['content-type', 'authorization', 'cookie', 'accept', 'x-request-id']
    for (const name of allowed) {
        const value = headers[name] ?? headers[name.toLowerCase()] ?? headers[name.toUpperCase()]
        if (value) {
            forwarded[name] = value
        }
    }
    return forwarded
}

function buildResponseHeaders(headers) {
    const out = {
        'content-type': headers.get('content-type') || 'application/json; charset=utf-8',
        ...corsHeaders()
    }
    const setCookie = headers.get('set-cookie')
    if (setCookie) {
        out['set-cookie'] = setCookie
    }
    return out
}

function buildQueryString(queryStringParameters) {
    if (!queryStringParameters || Object.keys(queryStringParameters).length === 0) {
        return ''
    }
    const searchParams = new URLSearchParams(queryStringParameters)
    return `?${searchParams.toString()}`
}

function canHaveBody(method) {
    return method !== 'GET' && method !== 'HEAD'
}

function jsonResponse(statusCode, body) {
    const normalizedBody = body === null ? '' : JSON.stringify(body)
    return {
        statusCode,
        headers: {
            'content-type': 'application/json; charset=utf-8',
            ...corsHeaders()
        },
        body: normalizedBody
    }
}

function corsHeaders() {
    return {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
        'access-control-allow-headers': 'Content-Type, Authorization, X-Request-Id'
    }
}
