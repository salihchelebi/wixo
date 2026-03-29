## Purpose
This folder stores evidence artifacts for verification checks in this category.

## Supports checks
See `ops/verification-registry.json` evidence links and related check IDs.

## Valid evidence
- Must follow `ops/evidence/EVIDENCE_SCHEMA.md`
- Must include required metadata
- Must reference concrete source location or command output

## Invalid evidence
- Empty placeholder files
- Claims without source or command output
- Config/docs-only proof for runtime assertions

## File name standard
`<check-key>-YYYY-MM-DD.md`

## Minimum metadata
- title
- date
- verifier
- sourceType
- sourceLocation
- relatedChecks
- summary
- conclusion
- fingerprintBasis
