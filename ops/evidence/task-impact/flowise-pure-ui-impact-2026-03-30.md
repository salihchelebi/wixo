title: Task Impact Analysis for Flowise Pure UI
date: 2026-03-30
verifier: codex
sourceType: source-reference
sourceLocation:
  - ops/task-impact-map.md
  - netlify.toml
  - wixoo/functions/supabase-flow.js
  - wixoo/functions/_lib/supabaseRest.js
relatedChecks:
  - build_publish_path_alignment
  - netlify_function_route_mapping
  - supabase_server_side_secret_usage
  - local_function_smoke_behavior
  - github_netlify_repo_linkage
  - production_runtime_reachability
summary: netlify.toml and wixoo/functions changes trigger partial revalidation for build path, route mapping, server-side secret boundary, and local function smoke. Platform checks remain outside local verification scope.
conclusion: Impacted checks were revalidated locally where possible; platform checks remain UNCERTAIN pending Netlify/GitHub evidence.
fingerprintBasis: task-impact-map+changed-paths(2026-03-30)
