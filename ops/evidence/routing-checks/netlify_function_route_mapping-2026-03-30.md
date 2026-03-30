title: Netlify Function Route Mapping Revalidation
date: 2026-03-30
verifier: codex
sourceType: source-reference
sourceLocation:
  - netlify.toml
  - wixoo/functions/supabase-flow.js
  - command: rg -n "redirects|supabase-flow|functions" netlify.toml wixoo/functions/supabase-flow.js
relatedChecks:
  - netlify_function_route_mapping
summary: /api/* redirects now consistently target /.netlify/functions/* and supabase-flow handler exists in wixoo/functions.
conclusion: PASS for netlify_function_route_mapping at repository routing level.
fingerprintBasis: source-lines(2026-03-30)
