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
summary: Root yüklenişinde ilk çağrı ConfigContext içinden `platformsettingsApi.getSettings()` ile `/api/v1/settings` endpoint'ine gidiyor. Preview'da upstream env yoksa proxy bu çağrıyı daha önce 500'e düşürüp config zincirini kırıyordu. `v1/settings` için open-source fallback 200 ve diğer `/api/v1/*` çağrıları için boş JSON 200 dönecek şekilde proxy fail-soft genişletildi; ConfigContext de open-source fallback ile loading kilidini kırıyor.
conclusion: İlk kritik hata zinciri kontrol altına alındı; upstream yokken bile root shell ve config bağımlı UI akışı fail-soft devam ediyor.
fingerprintBasis: request-chain+local-proxy-output(2026-03-30)
