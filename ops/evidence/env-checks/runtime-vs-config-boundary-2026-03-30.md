title: Runtime vs Config Boundary Application
date: 2026-03-30
verifier: codex
sourceType: source-reference+command-output
sourceLocation:
  - ops/runtime-vs-config-boundary.md
  - netlify.toml
  - command: node -e "...wixoo/functions/supabase-flow..."
relatedChecks:
  - local_function_smoke_behavior
  - production_runtime_reachability
summary: Config review was paired with local runtime execution output; production truth remains unproven without platform evidence.
conclusion: Rule applied: config/docs are insufficient alone; runtime evidence required for PASS.
fingerprintBasis: boundary-rule+runtime-output(2026-03-30)
