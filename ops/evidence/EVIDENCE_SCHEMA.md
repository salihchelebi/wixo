# Evidence Schema

## Valid Evidence Types
- `command-output`
- `source-reference`
- `ci-log`
- `platform-log`
- `api-response-capture`

## Invalid (alone)
- Empty text files
- README sentence as production proof
- Config existence as runtime proof

## Required Metadata Fields
- `title`
- `date`
- `verifier`
- `sourceType`
- `sourceLocation`
- `relatedChecks`
- `summary`
- `conclusion`
- `fingerprintBasis`

## File Naming Standard
`<check-key>-YYYY-MM-DD.md`

## Registry Evidence Entry Format
```json
{
  "id": "routing-checks/function-route-map-2026-03-29.md",
  "type": "source"
}
```

## Evidence-to-Check Relationship
Each evidence document must list one or more `relatedChecks` and registry must reference that document by `id`.
