title: Local Function Smoke Behavior
date: 2026-03-29
verifier: codex
sourceType: command-output
sourceLocation:
  - command: node invoke netlify/functions/supabase-flow handler
relatedChecks:
  - local_function_smoke_behavior
summary: GET returned 405, POST returned controlled 500 JSON error when external fetch unavailable.
conclusion: PASS for local handler guard/error path behavior.
fingerprintBasis: command-output(2026-03-29)
