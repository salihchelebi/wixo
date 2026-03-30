title: Runtime vs Config Boundary Application (Proxy)
date: 2026-03-30
verifier: codex
sourceType: source-reference+command-output
sourceLocation:
  - ops/runtime-vs-config-boundary.md
  - .env.example
  - wixoo/functions/flowise-api-proxy.js
  - command: node -e "(local upstream + flowise-api-proxy invoke)"
relatedChecks:
  - local_function_smoke_behavior
  - production_runtime_reachability
summary: Sadece config değil, flowise-api-proxy için yerel upstream sunucu ile gerçek runtime çağrısı çalıştırıldı; production URL tarafında platform doğrulaması halen yok.
conclusion: Local runtime behavior proven; production truth remains UNCERTAIN without live Netlify evidence.
fingerprintBasis: boundary-rule+local-runtime(2026-03-30)
