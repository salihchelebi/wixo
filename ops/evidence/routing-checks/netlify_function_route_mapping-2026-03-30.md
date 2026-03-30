title: Netlify Function Route Mapping Revalidation (Flowise API)
date: 2026-03-30
verifier: codex
sourceType: source-reference+command-output
sourceLocation:
  - netlify.toml
  - wixoo/functions/flowise-api-proxy.js
  - command: rg -n "from = \"/api/v1/\*\"|to = \"/.netlify/functions/flowise-api-proxy|from = \"/api/supabase-flow\"" netlify.toml
relatedChecks:
  - netlify_function_route_mapping
summary: /api/v1/* artık flowise-api-proxy fonksiyonuna yönleniyor; /api/supabase-flow ve admin/chat uçları ayrı function mapping'lerini koruyor.
conclusion: PASS for netlify_function_route_mapping at repository routing level.
fingerprintBasis: source-lines+route-scan(2026-03-30)
