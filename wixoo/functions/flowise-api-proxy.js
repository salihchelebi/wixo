exports.handler = async (event) => {
    try {
        if (event.httpMethod === 'OPTIONS') {
            return jsonResponse(204, null)
        }

        const proxyPath = resolveProxyPath(event)
        const baseUrl = process.env.FLOWISE_API_BASE_URL || process.env.VITE_API_BASE_URL

        if (!baseUrl) {
            // DEBUG FALLBACK (Netlify preview): keep Flowise UI from crashing when upstream API is not configured.
            // Remove once FLOWISE_API_BASE_URL points to a real Flowise server.
            const method = (event.httpMethod || 'GET').toUpperCase()
            const requiresBackendWrite = () =>
                jsonResponse(501, {
                    message: 'Write operation requires backend. Set FLOWISE_API_BASE_URL.'
                })

            if (proxyPath === 'v1/settings') {
                return jsonResponse(200, {
                    PLATFORM_TYPE: 'openSource'
                })
            }

            if (proxyPath === 'v1/auth/resolve' || proxyPath === 'v1/resolve-login') {
                return jsonResponse(200, {
                    redirectUrl: '/signin'
                })
            }

            if (proxyPath === 'v1/auth/login') {
                if (method !== 'POST') {
                    return jsonResponse(405, { message: 'Method Not Allowed' })
                }
                const credentials = parseJsonBody(event)
                const expectedIdentifiers = collectEnvValues([
                    'ADMIN_EMAIL',
                    'ADMIN_USER_NAME',
                    'ADMIN_USERNAME',
                    'FLOWISE_ADMIN_EMAIL',
                    'NETLIFY_ADMIN_EMAIL',
                    'user'
                ])
                const expectedPassword = pickFirstEnv([
                    'ADMIN_PASSWORD',
                    'FLOWISE_ADMIN_PASSWORD',
                    'NETLIFY_ADMIN_PASSWORD',
                    'PASSWORD'
                ])

                if (expectedIdentifiers.length === 0 || !expectedPassword) {
                    return jsonResponse(401, {
                        message: 'Preview admin credentials are not configured.'
                    })
                }

                const loginIdentifier = normalizeCredentialIdentifier(credentials.email || credentials.username)
                const isValidEmail = expectedIdentifiers.some((candidate) => normalizeCredentialIdentifier(candidate) === loginIdentifier)
                const isValidPassword = credentials.password === expectedPassword

                if (!isValidEmail || !isValidPassword) {
                    return jsonResponse(401, {
                        message: 'Invalid email or password.'
                    })
                }

                const primaryEmail = pickFirstEnv(['ADMIN_EMAIL']) || expectedIdentifiers[0]
                return jsonResponse(200, buildLocalAdminLoginPayload(primaryEmail))
            }

            if (proxyPath.startsWith('v1/auth/permissions/')) {
                return jsonResponse(200, [])
            }

            if (proxyPath === 'v1/apikey') {
                if (method !== 'GET') {
                    return requiresBackendWrite()
                }
                return jsonResponse(200, { data: [], total: 0 })
            }

            if (proxyPath.startsWith('v1/apikey/')) {
                return requiresBackendWrite()
            }

            if (proxyPath === 'v1/variables') {
                if (method !== 'GET') {
                    return requiresBackendWrite()
                }
                return jsonResponse(200, { data: [], total: 0 })
            }

            if (proxyPath.startsWith('v1/variables/')) {
                return requiresBackendWrite()
            }

            if (proxyPath === 'v1/credentials') {
                if (method !== 'GET') {
                    return requiresBackendWrite()
                }
                return jsonResponse(200, [])
            }

            if (proxyPath.startsWith('v1/credentials/')) {
                if (method === 'GET') {
                    return jsonResponse(200, {
                        id: 'stub',
                        name: 'stub',
                        credentialName: 'stub',
                        createdAt: null,
                        updatedAt: null
                    })
                }
                return requiresBackendWrite()
            }

            if (proxyPath === 'v1/components-credentials') {
                return jsonResponse(200, [])
            }

            if (proxyPath.startsWith('v1/components-credentials/')) {
                return jsonResponse(200, [])
            }

            if (proxyPath === 'v1/assistants' || proxyPath.startsWith('v1/assistants?')) {
                if (method !== 'GET') {
                    return requiresBackendWrite()
                }
                return jsonResponse(200, [])
            }

            if (proxyPath.startsWith('v1/assistants/')) {
                if (proxyPath.startsWith('v1/assistants/components/')) {
                    return jsonResponse(200, [])
                }
                if (method === 'GET') {
                    return jsonResponse(200, {
                        id: 'stub-assistant',
                        name: 'Stub Assistant',
                        type: 'CUSTOM',
                        details: '{}',
                        iconSrc: null
                    })
                }
                return requiresBackendWrite()
            }

            if (proxyPath.startsWith('v1/assistants/components/')) {
                return jsonResponse(200, [])
            }

            if (proxyPath.startsWith('v1/openai-assistants-vector-store/') || proxyPath.startsWith('v1/openai-assistants-file/')) {
                if (method === 'GET') {
                    return jsonResponse(200, [])
                }
                return requiresBackendWrite()
            }

            if (proxyPath === 'v1/openai-assistants' || proxyPath.startsWith('v1/openai-assistants?')) {
                return jsonResponse(200, [])
            }

            if (proxyPath.startsWith('v1/openai-assistants/')) {
                return jsonResponse(200, {})
            }

            if (proxyPath.startsWith('v1/marketplaces/')) {
                if (proxyPath === 'v1/marketplaces/custom' && method !== 'GET') {
                    return requiresBackendWrite()
                }
                if (proxyPath.startsWith('v1/marketplaces/custom/') && method !== 'GET') {
                    return requiresBackendWrite()
                }
                return jsonResponse(200, [])
            }

            if (proxyPath === 'v1/nodes') {
                return jsonResponse(200, [])
            }

            if (proxyPath === 'v1/chatflows') {
                if (method !== 'GET') {
                    return requiresBackendWrite()
                }
                return jsonResponse(200, { data: [], total: 0 })
            }

            if (proxyPath.startsWith('v1/chatflows/has-changed/')) {
                return jsonResponse(200, { hasChanged: false })
            }

            if (proxyPath.startsWith('v1/chatflows/')) {
                if (method === 'GET') {
                    return jsonResponse(200, {
                        id: 'stub-flow',
                        name: 'Untitled Chatflow',
                        type: 'CHATFLOW',
                        flowData: '{"nodes":[],"edges":[]}',
                        updatedDate: null
                    })
                }
                return requiresBackendWrite()
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

function parseJsonBody(event) {
    if (!event?.body) {
        return {}
    }

    const rawBody = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString('utf8') : event.body
    try {
        return JSON.parse(rawBody)
    } catch {
        return {}
    }
}

function buildLocalAdminLoginPayload(email) {
    return {
        id: 'local-preview-admin',
        email,
        name: 'Preview Admin',
        status: 'active',
        role: 'admin',
        isSSO: false,
        isOrganizationAdmin: true,
        permissions: ['*'],
        features: [],
        token: 'local-preview-token'
    }
}

function pickFirstEnv(keys = []) {
    const values = collectEnvValues(keys)
    return values[0] || ''
}

function collectEnvValues(keys = []) {
    const values = []
    for (const key of keys) {
        const value = process.env[key]
        if (typeof value === 'string' && value.trim()) {
            values.push(value.trim())
        }
    }
    return Array.from(new Set(values))
}

function normalizeCredentialIdentifier(value = '') {
    return String(value).trim().toLowerCase()
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
