title: UI Preview Workflow Simplification Evidence
date: 2026-03-30
verifier: codex
sourceType: source-reference+command-output
sourceLocation:
  - .github/workflows/main.yml
  - .github/workflows/test_docker_build.yml
  - command: rg -n "pnpm --filter flowise-ui build|cypress-io/github-action|pnpm lint|pnpm build" .github/workflows/main.yml
relatedChecks:
  - build_publish_path_alignment
summary: `ui-preview` job push/PR için yalnızca install + `pnpm --filter flowise-ui build` çalıştıracak şekilde ayrıldı. Tam kalite hattı `full-build` job içinde yalnızca workflow_dispatch tetiklemeli bırakıldı. Test Docker build workflow'u da manuel tetiklemeye çekildi.
conclusion: Preview pipeline artık monorepo full quality gate'leri olmadan UI build odaklı.
fingerprintBasis: workflow-diff+grep(2026-03-30)
