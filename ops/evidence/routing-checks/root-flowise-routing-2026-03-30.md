title: Root Routing Returned to Flowise DefaultRedirect
date: 2026-03-30
verifier: codex
sourceType: source-reference
sourceLocation:
  - packages/ui/src/routes/MainRoutes.jsx
  - packages/ui/src/routes/index.jsx
  - packages/ui/src/config.js
relatedChecks:
  - netlify_function_route_mapping
summary: MainRoutes artık env-conditional netlify-lite layout yerine doğrudan MainLayout kullanıyor ve `/` route'u DefaultRedirect'a gidiyor. NetlifyLiteRoutes route seti route index kaydından çıkarıldı.
conclusion: Root behavior saf Flowise yönlendirmesine döndürüldü (`defaultPath` zaten `/chatflows`).
fingerprintBasis: route-source-lines(2026-03-30)
