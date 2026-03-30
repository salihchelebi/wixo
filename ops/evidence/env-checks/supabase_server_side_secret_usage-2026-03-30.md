title: Supabase Server-side Secret Usage Boundary Revalidation
date: 2026-03-30
verifier: codex
sourceType: source-reference
sourceLocation:
  - netlify/functions/_lib/supabaseRest.js
  - wixoo/functions/_lib/supabaseRest.js
  - packages/ui/src/views/netlifyLite/ChatPage.jsx
  - command: rg -n "SUPABASE_SERVICE_ROLE_KEY|supabase-flow" netlify/functions/_lib/supabaseRest.js wixoo/functions/_lib/supabaseRest.js packages/ui/src/views/netlifyLite/ChatPage.jsx
relatedChecks:
  - supabase_server_side_secret_usage
summary: SUPABASE_SERVICE_ROLE_KEY remains server-only in Netlify helper and wixoo helper re-exports server helper; UI calls /api/supabase-flow without embedding service-role secrets.
conclusion: PASS for source-level server/client secret boundary.
fingerprintBasis: usage-scan(2026-03-30)
