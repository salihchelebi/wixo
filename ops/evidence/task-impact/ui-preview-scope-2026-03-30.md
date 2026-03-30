title: UI Preview Scope Task Impact
date: 2026-03-30
verifier: codex
sourceType: source-reference
sourceLocation:
  - ops/task-impact-map.md
  - .github/workflows/main.yml
  - packages/ui/src/routes/MainRoutes.jsx
  - packages/ui/src/routes/index.jsx
  - netlify.toml
relatedChecks:
  - build_publish_path_alignment
  - netlify_function_route_mapping
summary: Preview odaklı değişiklikler workflow ve root routing yüzeyine yapıldı. `netlify.toml` publish path korunurken VITE_NETLIFY_LITE build env'den kaldırıldı. Root routing saf Flowise DefaultRedirect akışına döndürüldü.
conclusion: Preview hattı için sadece gerekli kontroller revalidate edildi; platform kanıtı gerektiren kontroller değişmedi.
fingerprintBasis: changed-paths+task-impact-map(2026-03-30)
