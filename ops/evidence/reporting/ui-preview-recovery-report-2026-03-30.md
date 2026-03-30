title: UI Preview Recovery Report (Minimal Pipeline)
date: 2026-03-30
verifier: codex
sourceType: source-reference+command-output
sourceLocation:
  - ops/codex-report-template.md
  - .github/workflows/main.yml
  - .github/workflows/test_docker_build.yml
  - netlify.toml
  - Dockerfile
  - docker/Dockerfile
  - docker/worker/Dockerfile
  - packages/ui/src/routes/MainRoutes.jsx
  - packages/ui/src/routes/index.jsx
  - command: pnpm --filter flowise-ui build
relatedChecks:
  - build_publish_path_alignment
  - netlify_function_route_mapping
summary: Preview hattı sadeleştirildi: push/PR için yalnızca UI build, root route saf Flowise yönlendirme, docker katmanlarında chromium dışı ağır paketler kaldırıldı.
conclusion: Repo-level preview hedefi sağlandı; Netlify dashboard/deploy ekranı olmadan production reachability UNCERTAIN kalır.
fingerprintBasis: workflow+routing+build-output(2026-03-30)

## 1. Task summary
UI preview hattı, tam monorepo kalite kapıları yerine minimum build zinciri ile çalışacak şekilde ayrıldı.

## 2. Files changed
- .github/workflows/main.yml
- .github/workflows/test_docker_build.yml
- netlify.toml
- packages/ui/src/routes/MainRoutes.jsx
- packages/ui/src/routes/index.jsx
- Dockerfile
- docker/Dockerfile
- docker/worker/Dockerfile

## 3. Why these files changed
- Push/PR preview akışını yalnızca UI build'e indirgemek.
- Netlify Lite root davranışını kaldırıp saf Flowise DefaultRedirect'a dönmek.
- Docker preview tarafında chromium dışı ağır Linux paketlerini geçici olarak kapatmak.

## 4. Impacted checks
- build_publish_path_alignment
- netlify_function_route_mapping

## 5. Checks revalidated
- build_publish_path_alignment (PASS)
- netlify_function_route_mapping (source-level PASS)

## 6. Checks skipped
- Platform taraflı canlı URL/Netlify dashboard doğrulaması.

## 7. Evidence added
- deploy-checks/ui-preview-workflow-2026-03-30.md
- routing-checks/root-flowise-routing-2026-03-30.md
- task-impact/ui-preview-scope-2026-03-30.md

## 8. Checks still uncertain
- github_netlify_repo_linkage
- production_runtime_reachability

## 9. Risks
- Docker minimizasyonu tam ürün/worker senaryolarında ek paket ihtiyacı doğurabilir.

## 10. Next required platform-side verification
- Netlify preview URL ana sayfa ve `/chatflows` ekran görüntüleri.
- Netlify environment ekranında `VITE_NETLIFY_LITE` unset doğrulaması.
