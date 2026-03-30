title: Local Function Smoke Behavior Revalidation
date: 2026-03-30
verifier: codex
sourceType: command-output
sourceLocation:
  - command: node -e "const fn=require('./wixoo/functions/supabase-flow').handler; fn({httpMethod:'GET',body:''})..."
  - command: node -e "const fn=require('./wixoo/functions/supabase-flow').handler; fn({httpMethod:'POST',body:JSON.stringify({message:'smoke'})})..."
relatedChecks:
  - local_function_smoke_behavior
summary: Local invocation now loads dependencies correctly; GET returns 405 guard and POST returns controlled JSON 500 on unavailable external fetch.
conclusion: PASS for local function smoke behavior (handler executes without module-resolution crash).
fingerprintBasis: node-command-output(2026-03-30)
