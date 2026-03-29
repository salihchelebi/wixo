# Verification Rules

## System Purpose
Maintain a persistent, evidence-driven verification memory in-repo so each task revalidates only impacted areas.

## Core Principles
1. No PASS without evidence.
2. Repository config is not runtime truth.
3. Only revalidate impacted checks unless a full recheck trigger is hit.
4. Unverified platform/runtime behavior stays `UNCERTAIN`.
5. If prior evidence is invalidated by delta, mark `STALE`.

## Status Definitions
- `PASSED`: Acceptance criteria met with current evidence.
- `FAILED`: Criteria disproven by evidence.
- `UNCERTAIN`: Not enough valid evidence.
- `STALE`: Previously verified, but changed dependencies invalidate confidence.
- `NOT_APPLICABLE`: Check does not apply to current scope.

## Evidence Acceptance Rules
- Valid: command output logs, CI logs, platform screenshots/log URLs, source-code references with matching runtime proof.
- Invalid alone: README text, `.env.example`, config presence without execution proof, empty text files.
- Every evidence item must include metadata defined in `ops/evidence/EVIDENCE_SCHEMA.md`.

## Check Acceptance Criteria (Baseline)
- Build/Publish path checks: must match build tool output path and be shown via source refs.
- Function routing checks: route mapping exists and target handler exists.
- Runtime checks: endpoint behavior proven by command/log outputs.
- Platform checks (Netlify/GitHub linkage): require platform-side evidence; otherwise `UNCERTAIN`.

## Recheck / Stale Triggers
- Changes in `netlify.toml`/`wixoo.toml`, function files, UI API call points, env schema, CI/deploy scripts.
- Any change in verification rules/registry/evidence schema requires at least partial revalidation.

## Task Closure Rules
A task can be closed only when:
- impacted checks are re-evaluated,
- evidence added/linked,
- skipped checks have explicit reason,
- unresolved platform checks remain explicitly `UNCERTAIN`.
