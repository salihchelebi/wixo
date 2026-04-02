# Runtime vs Config Boundary

- **Repo config:** `netlify.toml`, README, `.env.example`.
- **Expected env:** names documented in repo.
- **Platform env:** values configured in Netlify/GitHub settings.
- **Deploy metadata:** build/deploy logs, preview/prod URL metadata.
- **Runtime result:** actual endpoint/UI behavior from live or local execution.
- **Production truth:** platform-verified runtime behavior after deployment.

Rule: config or docs can inform expectations, but cannot alone prove production truth.
