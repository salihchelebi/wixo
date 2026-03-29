title: Build/Publish Alignment
date: 2026-03-29
verifier: codex
sourceType: source-reference+command-output
sourceLocation:
  - packages/ui/vite.config.js
  - netlify.toml
  - README.md
  - command: rg -n "outDir|publish|packages/ui/build|packages/ui/dist" packages/ui/vite.config.js netlify.toml README.md
relatedChecks:
  - build_publish_path_alignment
summary: Vite build output is ./build and Netlify publish is packages/ui/build.
conclusion: PASS for alignment in repository config.
fingerprintBasis: files+pattern-match(2026-03-29)
