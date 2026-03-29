// Bu listeler yalnızca bu iterasyonda izinli env adlarını görünür tutar.
const envConfig = {
    db: {
        canonical: 'SUPABASE_CONNECT',
        ignoredForRuntime: ['DATABASE_URL', 'NETLIFY_DATABASE_URL', 'NETLIFY_DATABASE_URL_PRODUCTION']
    },
    admin: ['ADMIN_USER_NAME', 'ADMIN_PASSWORD', 'NETLIFY_AUTH_TOKEN'],
    project: [
        'GITHUB_DEFAULT_BRANCH',
        'GITHUB_OWNER',
        'GITHUB_REPO_FULL',
        'GITHUB_REPO_NAME',
        'GITHUB_REPO_URL',
        'NETLIFY_ADMIN_URL',
        'NETLIFY_BRANCH_URL',
        'NETLIFY_MAIN_BRANCH_URL',
        'NETLIFY_PRODUCTION_URL',
        'NETLIFY_PROJECT_URL',
        'NETLIFY_SITE_DOMAIN',
        'NETLIFY_SITE_ID',
        'NETLIFY_SITE_NAME',
        'NETLIFY_SITE_URL',
        'NETLIFY_TEAM_SLUG'
    ]
}

module.exports = {
    envConfig
}
