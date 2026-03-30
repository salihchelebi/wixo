title: Root UI First Failing Request Chain and Fail-soft Fix
date: 2026-03-30
verifier: codex
sourceType: source-reference+command-output
sourceLocation:
  - packages/ui/src/store/context/ConfigContext.jsx
  - packages/ui/src/api/platformsettings.js
  - packages/ui/src/api/client.js
  - netlify.toml
  - wixoo/functions/flowise-api-proxy.js
  - command: node invoke flowise-api-proxy with splat=v1/settings (no env)
  - command: node invoke flowise-api-proxy with splat=v1/chatflows (no env)
relatedChecks:
  - netlify_function_route_mapping
  - build_publish_path_alignment
summary: Root yüklenişinde ilk çağrı ConfigContext içinden `platformsettingsApi.getSettings()` ile `/api/v1/settings` endpoint'ine gidiyor. Preview'da upstream env yoksa proxy bu çağrıyı daha önce 500'e düşürüp config zincirini kırıyordu. `v1/settings` için open-source fallback 200 dönecek şekilde proxy ve ConfigContext fail-soft akışı eklendi.
conclusion: İlk kritik hata zinciri kontrol altına alındı; root shell config fetch başarısızlığında da render edebilir duruma geldi.
fingerprintBasis: request-chain+local-proxy-output(2026-03-30)
