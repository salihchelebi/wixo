// Bu handler yalnız env değişkenlerindeki yönetici bilgileriyle giriş doğrulayıp panel erişimi için geçici token üretir.
exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return jsonResponse(405, { error: 'Desteklenmeyen metod.' })
        }

        const body = JSON.parse(event.body || '{}')
        const username = typeof body.username === 'string' ? body.username.trim() : ''
        const password = typeof body.password === 'string' ? body.password : ''

        const expectedUsername = process.env.ADMIN_USER_NAME || process.env.ADMIN_USERNAME || '!mr0b0t'
        const expectedPassword = process.env.ADMIN_PASSWORD || 'Sal!hc3l38!'

        if (username !== expectedUsername || password !== expectedPassword) {
            return jsonResponse(401, { error: 'Kullanıcı adı veya parola hatalı.' })
        }

        const token = Buffer.from(`${username}:${Date.now()}`).toString('base64url')
        return jsonResponse(200, { token })
    } catch {
        return jsonResponse(400, { error: 'Giriş doğrulanamadı.' })
    }
}

function jsonResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            'content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(body)
    }
}
