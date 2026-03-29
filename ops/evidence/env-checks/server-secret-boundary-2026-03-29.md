title: Server-side Secret Boundary
date: 2026-03-29
verifier: codex
sourceType: source-reference
sourceLocation:
  - netlify/functions/_lib/supabaseRest.js
  - packages/ui/src/views/netlifyLite/ChatPage.jsx
relatedChecks:
  - supabase_server_side_secret_usage
summary: SUPABASE_SERVICE_ROLE_KEY is consumed in server helper; UI only calls API endpoint.
conclusion: PASS for source-level secret boundary.
fingerprintBasis: import+usage-scan(2026-03-29)
