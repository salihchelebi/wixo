title: Build (ubuntu-latest, 18.15.0) Failure Reproduction and Fix
date: 2026-03-30
verifier: codex
sourceType: command-output
sourceLocation:
  - command: pnpm install (failed with ERR_PNPM_FETCH_403 for xlsx tarball)
  - package.json (pnpm overrides xlsx source)
  - pnpm-lock.yaml (resolved xlsx package source)
  - command: pnpm lint (PASS after formatting/syntax fixes)
  - command: pnpm build (PASS)
relatedChecks:
  - build_publish_path_alignment
summary: CI-benzeri kurulumda `xlsx` bağımlılığının `cdn.sheetjs.com` tarball kaynağı 403 verdi. Override `xlsx:^0.18.5` olarak güncellenince install/build zinciri çalıştı; lint hataları da netlifyLite dosyalarında düzeltilerek CI build akışı restore edildi.
conclusion: Repository-side build pipeline blocker kaldırıldı; `pnpm install`, `pnpm lint`, `pnpm build` başarılı.
fingerprintBasis: install+lint+build-outputs(2026-03-30)
