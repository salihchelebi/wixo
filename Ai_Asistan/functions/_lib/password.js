const crypto = require('crypto')

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex')
        crypto.scrypt(password, salt, 64, (err, key) => {
            if (err) return reject(err)
            resolve(`scrypt$${salt}$${Buffer.from(key).toString('hex')}`)
        })
    })
}

function verifyPassword(password, storedHash) {
    return new Promise((resolve) => {
        try {
            const [alg, salt, hex] = String(storedHash || '').split('$')
            if (alg !== 'scrypt' || !salt || !hex) return resolve(false)
            crypto.scrypt(password, salt, 64, (err, key) => {
                if (err) return resolve(false)
                const left = Buffer.from(hex, 'hex')
                const right = Buffer.from(key)
                if (left.length !== right.length) return resolve(false)
                resolve(crypto.timingSafeEqual(left, right))
            })
        } catch {
            resolve(false)
        }
    })
}

module.exports = {
    hashPassword,
    verifyPassword
}
