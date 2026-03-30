title: Build Job Recovery Report (ubuntu-latest, node 18.15.0)
date: 2026-03-30
verifier: codex
sourceType: source-reference+command-output
sourceLocation:
  - .github/workflows/main.yml
  - package.json
  - pnpm-lock.yaml
  - packages/ui/src/views/netlifyLite/LandingPage.jsx
  - packages/ui/src/views/netlifyLite/ChatPage.jsx
  - packages/ui/src/views/netlifyLite/demoEvents.js
  - ops/evidence/deploy-checks/build_ubuntu_latest_18_15_0-2026-03-30.md
relatedChecks:
  - build_publish_path_alignment
summary: Build job failure root cause identified as blocked tarball dependency source and lint-blocking syntax/format issues. Dependencies and UI files corrected; local CI-equivalent commands now pass.
conclusion: Build recovery completed for repository scope; GitHub-hosted run should be re-triggered for platform confirmation.
fingerprintBasis: workflow+commands(2026-03-30)

## 1. Task summary
`build (ubuntu-latest, 18.15.0)` zinciri için install/lint/build adımları lokalde yeniden üretildi ve kırılan noktalar düzeltildi.

## 2. Files changed
- package.json
- pnpm-lock.yaml
- packages/ui/src/views/netlifyLite/LandingPage.jsx
- packages/ui/src/views/netlifyLite/ChatPage.jsx
- packages/ui/src/views/netlifyLite/demoEvents.js

## 3. Why these files changed
- `xlsx` kaynağı erişim hatası verdiği için güvenilir npm kaynağına geçildi.
- Lint’i kıran JSX/format sorunları düzeltildi.

## 4. Impacted checks
- build_publish_path_alignment

## 5. Checks revalidated
- build_publish_path_alignment (publish path değişmedi, build başarıyla tamamlandı)

## 6. Checks skipped
- Platform koşumu (GitHub Actions dashboard log doğrulaması) yerel ortamda yapılamadı.

## 7. Evidence added
- deploy-checks/build_ubuntu_latest_18_15_0-2026-03-30.md

## 8. Checks still uncertain
- GitHub Actions remote run sonucu (yeniden tetikleme sonrası doğrulanmalı)

## 9. Risks
- `xlsx` major/minor farkı davranış farklılığı yaratabilir; export/import akışları smoke test edilmelidir.

## 10. Next required platform-side verification
- PR sonrası GitHub Actions `build (ubuntu-latest, 18.15.0)` job sonuç ekranı doğrulaması.
