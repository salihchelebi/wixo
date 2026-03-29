// Bu yardımcı yalnızca bu aşamada gereken Wixoo envlerini ayırıp Neon değişkenlerini pasif not olarak tutar.
const envConfig = {
    required: [],
    optional: ['NETLIFY_AUTH_TOKEN', 'NETLIFY_SITE_ID'],
    futureNeon: [
        'NEON_URL',
        'DATABASE_URL',
        'NEON_DATABASE_URL',
        'NEON_API_URL',
        'NEON_EMAIL',
        'Neon_Project_ID',
        'Neon_Project_name',
        'NEON_PERSONAL_API_KEY',
        'NETLIFY_DATABASE_URL',
        'NETLIFY_DATABASE_URL_PRODUCTION',
        'NETLIFY_DATABASE_URL_DEPLOY_PREVIEWS',
        'NETLIFY_DATABASE_URL_BRANCH_DEPLOYS',
        'NETLIFY_DATABASE_URL_PREVIEW_SERVER_AND_AGENT_RUNNERS',
        'NETLIFY_DATABASE_URL_LOCAL_DEVELOPMENT'
    ]
}

module.exports = {
    envConfig
}
