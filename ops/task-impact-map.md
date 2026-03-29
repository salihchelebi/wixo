# Task Impact Map

Use this map to revalidate only impacted checks.

| changed path/pattern | affected checks | why | revalidation level | skip allowed? | notes |
|---|---|---|---|---|---|
| `netlify.toml` | `build_publish_path_alignment`, `netlify_function_route_mapping` | Build output + function redirects defined here | partial | no | high-risk deploy surface |
| `wixoo.toml` | `build_publish_path_alignment`, `netlify_function_route_mapping` | Legacy/alternate naming may affect deploy assumptions | partial | yes | only if file absent in active architecture |
| `packages/ui/vite.config.js` | `build_publish_path_alignment` | Defines actual UI build outDir | partial | no | source of truth for output folder |
| `.env.example` | `supabase_server_side_secret_usage` | Documents expected env boundaries | partial | yes | documentation-only unless runtime usage changed |
| `netlify/functions/**` | `netlify_function_route_mapping`, `supabase_server_side_secret_usage`, `local_function_smoke_behavior` | Runtime handler logic and imports | partial/full | no | run smoke + syntax checks |
| `wixoo/functions/**` | same as above | Alternative path mapping risk | partial | yes | apply if exists |
| `packages/ui/src/views/**` | `supabase_server_side_secret_usage`, `local_function_smoke_behavior` | UI may expose secrets or break flow integration | partial | no | verify no secret usage client-side |
| `README.md` | all doc-linked checks | May drift from runtime truth | partial | yes | docs are not runtime proof |
| `ops/verification-rules.md` | all checks | Rule changes may change interpretation | full | no | governance surface |
| `ops/verification-registry.json` | changed checks only | Status/evidence cache update | partial | no | never rewrite unaffected checks |
| `ops/evidence/**` | related checks | New/updated evidence links | partial | no | verify metadata schema compliance |
| `docker/**`, `*.yml`, CI config | build/deploy checks | Pipeline behavior may change | full/partial | no | evaluate by scope |

## Full Recheck Triggers
- Architecture path rename (`netlify` <-> `wixoo`) across runtime files.
- Build tool change (Vite/webpack output semantics).
- Deployment platform switch.

## Partial Recheck Triggers
- Single function handler change.
- Single UI API call change.
- Documentation-only update.

## Skip Guidance
Skip is allowed only when no mapped check is impacted. Must include explicit reason in task report.
