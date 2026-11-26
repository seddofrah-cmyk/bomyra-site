# BOMYRA — Ordered Open Work Queue

Updated: 2026-11-26 (Africa/Algiers)
Purpose: current task order based on the latest available project checkpoint, QA reports, repository evidence, and the user's browser confirmation of the site guide.

## Operating rules

- Keep all remaining implementation and acceptance work in isolated QA branches/environments.
- Do not merge to production, change production traffic, use Paddle Live, or disable/remove production services without a separate explicit approval.
- Do not use Vercel for new BOMYRA work; the user explicitly chose to abandon Vercel.
- Never implement account pairing, sign-in, or account switching on the main website. These functions remain inside the BOMYRA extension.
- Preserve successful QA results. Do not rerun completed tests unless a later code change affects the tested path.
- Record each action with timestamp/timezone, environment, resource, action, output/evidence, result, and evidence quality.

## Priority 1 — website visual guide and six-step Product Tour

**Status: PASS — source, Cloudflare preview deployment, and user browser confirmation (2026-11-23)**

- The one-image Sign in guide remains separate from the homepage Product Tour. The separate Sign in navigation destination remains `/bomyra-site/auth/`.
- The Product Tour uses the six original screenshot assets in the approved order: Floating controls → Quick actions → Export formats → Export selection and preview → Summary → Archive. `03-export-formats.png` is intentionally unblurred; the other five are the approved blurred copies.
- The user uploaded all six named PNG files to `assets/images/tour/` on `feature/site-signin-visual-guide`.
- A post-migration JavaScript guard still required six deleted `.bomyra-tour-scene` elements, preventing the event handlers from being registered. This was corrected by commit `5dbd4957f857af39a11f9b094283c8c4b22a4fcb` (`Fix product tour controls after screenshot migration`). The script now switches the screenshot source and no longer depends on the removed scene elements.
- Cloudflare Pages deployment `486f5458-cd4a-44f8-87a6-5baebf49b41f` for that commit completed successfully; queued, initialize, clone_repo, build, and deploy all report success.
- The user subsequently confirmed that the button works. Record the interactive behavior as **user-confirmed PASS**. Do not repeat the same button test absent a relevant change.
- Keep the feature branch isolated; do not promote or merge it as part of this task.

## Priority 2 — start account pairing from the website

**Status: OPEN — blocked on website-to-extension bridge implementation**

- The homepage CTAs currently open the informational onboarding dialog because `assets/js/bomyra-onboarding.js` intercepts `data-bomyra-onboarding`. A previous CTA-only change was reverted; do not treat the auth page as a completed connection flow.
- The account page `/auth/` only authenticates a Supabase web session. It does not create an extension session or store an extension token in the browser extension.
- The site contains an unfinished/orphaned `assets/js/bomyra-pairing.js` bridge client. It expects a `data-bomyra-pair` trigger and a same-window bridge response, but the homepage does not load this script or provide those triggers.
- The current extension manifest injects content scripts only on ChatGPT, Claude, and Gemini origins; it does not include the BOMYRA website origin or an `externally_connectable` bridge. The extension's existing `aixConnectBomyraAccount()` pairing is initiated inside the extension account menu and polls the QA Worker itself.
- Therefore, website-initiated pairing cannot complete end-to-end in the current code. A valid implementation must connect website CTA → extension bridge → QA Worker `/pair/start` → site authentication/approval → extension `/pair/poll` → save/activate extension token and refresh account UI.
- Preserve the existing in-extension Add account flow and multi-account isolation. Do not replace it with website-only Supabase sign-in. Do not touch production or Paddle Live.
- The previous CTA-only code commit `8bed0ba574b3e1345814dc307f49bcdd5a5f13cd` was reverted in `b89f86c465b01cb81a43aead5c80c62bc1bea80e`; its preview deployment is not an accepted fix.

## Priority 3 — official extension distribution destination

**Status: BLOCKED — official store URL not supplied/confirmed**

- Await the official Chrome Web Store listing URL from the user / store publication process.
- Verify the listing before preparing a separately reviewed installation CTA.
- Do not invent or use an unconfirmed store URL.

## Priority 4 — Cloudflare Billing QA release evidence

**Status: QA evidence PASS; PR #6 superseded and closed; production cutover still blocked**

- PR #6 was closed without merge after exact source, migration, test-coverage, and QA-state comparison. Its branch `fix/webhook-atomic-claim-qa` remains preserved. See the PR #6 disposition addendum at the end of this queue and the backend QA report.
- Target branch `migration/cloudflare-billing-qa` already contains the same Worker entrypoint, the applied QA atomic-claim migration `20261121122153`, and the essential lease/in-flight duplicate and `subscription.past_due` regression coverage.
- The redundant PR-only migration `20261121130000` was not copied or applied because it duplicates the target migration and broadly drops CHECK constraints.
- Active Worker provenance, signed Sandbox `subscription.past_due`, duplicate replay protection, and unauthenticated checkout rejection are already verified. Do not repeat these successful checks absent a relevant code change.
- Production cutover remains blocked and requires a separate explicit approval.

## Post-release follow-up — subscription expiry lifecycle observation

**Status: NOT A RELEASE BLOCKER — scheduled observation on/after 2026-12-20**

- QA transaction test simulated the canceled subscription's paid-through date as expired; entitlement logic returned Free and allowed a new checkout. Transaction rollback restored the original canceled state and no reservation remained.
- Extension UI showed Free for the canceled/no-period account and Pro for the paid-through account.
- This proves the stored-period entitlement calculation under controlled QA conditions; it does not prove that calendar time elapsed or that Paddle emitted an end-of-term webhook.
- The recorded paid-through date is 2026-12-20. At/after that date, verify the actual account's entitlement naturally transitions to Free. Do not modify the unrelated active Sandbox subscription or repeat the accelerated test without cause.

## Priority 6 — final extension 1.5.139 QA acceptance record

**Status: USER-CONFIRMED PASS for previously exercised account/quota behavior; no-repeat**

- The 2026-11-21 checkpoint records user-confirmed PASS for Free quota boundary (5 successful exports per UTC day; sixth denied; clipboard unmetered; no rollover), account switching/separation/persistence, Paddle Sandbox monthly checkout and Pro activation, and duplicate/parallel checkout protection.
- The 1.5.139 candidate is on `rebuild/cloudflare-v1.5.139`; do not substitute the stale 1.5.137 QA branch.
- Do not repeat those successful tests without a relevant code change. Any remaining release review must use the actual current candidate and preserve account ownership by authenticated Supabase user ID.

## Priority 7 — production migration / release decision

**Status: BLOCKED — not approved**

- Keep production extension, production Supabase, production domain/routes, and Paddle Live untouched.
- Do not merge draft QA PRs or promote QA Workers/site until all relevant QA gates are documented and the user explicitly approves the release/cutover.
- Vercel is not to be used for new work; do not infer permission to perform any production shutdown or cutover from that decision alone.

## Completed items — do not reopen without cause

- The site sign-in guide was changed to one user-provided image and is visibly rendering in the user's browser (user-confirmed evidence).
- Previously completed Free quota boundary, account-switcher, checkout/Pro activation, duplicate-checkout protection, webhook duplicate handling, and `subscription.past_due` QA checks are recorded as PASS in the 2026-11-21 checkpoint/report. Preserve their evidence; do not repeat them merely to refresh a checklist.

## Next execution order

The historical sequence above has been superseded by the **Current status update — Product Tour button fix and remaining work (2026-11-23)** at the end of this file. Use that section as the authoritative open-work order. The previously completed Worker provenance and signed Sandbox event checks are not open tasks; preserve their PASS evidence and do not repeat them without a relevant change.


## PR #6 disposition — superseded and closed (2026-11-22, Africa/Algiers)

**Status: CLOSED — verified superseded; NOT MERGED.** This supersedes the earlier Priority 4 wording that PR #6 remained open/Draft and required review.

- PR #6: https://github.com/seddofrah-cmyk/bomyra-backend/pull/6 — closed without merge. Head branch `fix/webhook-atomic-claim-qa` was retained; no branch deletion.
- The branches diverged 9 commits each from their common merge base; this was investigated rather than assumed to mean missing work.
- Exact comparison confirmed the Worker entrypoint is content-identical between target `migration/cloudflare-billing-qa` and PR head. Target has the required atomic claim and `subscription.past_due` handling.
- Target contains the applied QA migration `20261121122153_atomic_paddle_webhook_claim.sql`. The PR-only migration is redundant and includes an unsafe broad CHECK-constraint drop loop; it was deliberately not transferred or applied.
- Target tests already cover an event held by another lease and `subscription.past_due` lifecycle processing. The PR test file has textual/structural differences, but no unique essential behavior was identified as missing from target.
- No source, migration, deployment, database, Paddle, production, DNS, or Vercel changes were made. No previously passed QA tests were repeated.

### Updated Billing QA status

- Active QA Worker provenance and signed Sandbox event evidence are verified and recorded; do not repeat those successful checks without a relevant code change.
- PR #6 is no longer an open task. Keep the branch for traceability; do not merge or delete it.
- Production cutover remains blocked and requires a separate explicit approval.

## Next execution item after PR #6 closure

Resume the independent website task: inspect the homepage `Get Started` / `Sign in` click handling and establish the intended authentication destination. Do not add website-side pairing, account linking, or account management; those remain extension-only. Do not invent an auth route or change the CTA until the actual supported destination is verified.


## Website Get Started — replaced by the six-step product tour (2026-11-23)

**Status: IMPLEMENTED IN SOURCE; preview/browser QA pending.**

- The previous website-pairing task is explicitly superseded. The user confirmed that the website must not initiate extension pairing, account linking, or account management. Those functions remain exclusively inside the extension.
- Get Started now opens the visual product tour; it does not navigate to auth or communicate with the extension.
- The separate Sign in navigation link continues to point to the existing website auth route `/bomyra-site/auth/`.
- The six approved tour steps are: Floating controls → Quick actions → Export formats → Export selection and preview → Summary → Archive.
- The tour uses a changing bottom navigation bar with Previous / Next and Finish on the final step, plus a changing explanatory panel, progress, focused UI preview, Escape/backdrop close and focus restoration.
- Current tour scenes are CSS/HTML illustrations based on the supplied screenshots; original screenshots have not yet been uploaded as site assets.
- Commits: homepage `6cfab24797225df9ff7c50ae008cfdad8794dfb2`; tour controller `d33ec6f97bbaf536b889f9fa8546a14cc88c7849`.
- No pairing bridge, extension code, authentication flow, Worker, backend, database, billing or production configuration was changed.
- Next: wait for/check the branch preview deployment, then browser-test all six stages, navigation, close behavior, responsive layout and Sign in isolation. Do not mark PASS before browser evidence.

### Superseded website-pairing instruction

The earlier “Priority 2 — start account pairing from the website” and the older queue item describing a website-to-extension bridge are obsolete and must not be resumed. The user explicitly rejected website-side pairing. Do not implement or revive the orphaned `assets/js/bomyra-pairing.js` flow.


## Current status update — Product Tour button fix and remaining work (2026-11-23, Africa/Algiers)

### Completed and closed
- Product Tour original screenshot integration and six-step order: PASS.
- Product Tour Get Started/button interaction: user-confirmed PASS after commit `5dbd4957f857af39a11f9b094283c8c4b22a4fcb`; Cloudflare Pages deployment `486f5458-cd4a-44f8-87a6-5baebf49b41f` completed successfully.
- The button defect was caused by a stale JavaScript guard that still required six removed mock scene elements. The guard and obsolete scene-render loop were removed; the screenshot-switching logic and Previous/Next handlers remain.
- No further Product Tour code or test work is open. Preserve the user-confirmed result; do not retest without a relevant change.
- Website account pairing remains explicitly rejected and closed as a work item. Do not implement it.

### Ordered remaining work

1. **Production extension configuration and Cloudflare cutover review — BLOCKER.** The current GitHub default-branch extension source is version 1.5.139 but points to `bomyra-entitlements-qa.seddofrah.workers.dev` and the `/extension/connect-qa/` page. The backend default-branch README still documents Vercel Functions and Paddle Sandbox; Cloudflare billing is only evidenced on the QA migration branch / draft PR #5. Do not publish the QA package or build the public extension from the current default-branch QA configuration. A production-specific Cloudflare Worker, production Supabase bindings, approved billing environment, extension production endpoints, and end-to-end production release review must be established before public distribution. Do not switch Paddle Live or production traffic without separate explicit approval.
2. **Promote the approved site experience — separate website release gate.** The inspected site default-branch homepage still links Get Started to `/auth/`. The approved six-step Product Tour with separate Sign in behavior exists on `feature/site-signin-visual-guide` and its Cloudflare preview, with the button already user-confirmed PASS. Review and promote that site branch only as a separately approved website change; do not add website-initiated account pairing or account management.
3. **Official Chrome Web Store listing and installation CTA — LAST.** No official listing URL has been supplied or verified in the current release evidence. Publish only a production-configured and approved extension package, obtain the official listing URL, verify it, and only then prepare the website installation CTA for separate review. Never guess the URL.

**Closed items (do not reopen without new evidence):**
- **1.5.139 QA package build and icon verification — PASS.** GitHub Actions run #22 / `45077825899` built from `7266dd61fbdf4e429422bf35bded869620f8597e`; artifact ID `14775798045`. Independent inspection verified embedded build metadata, 29/29 packaged payload files byte-for-byte against the supplied candidate archive, 27/27 manifest resources, 24/24 JavaScript syntax checks, ZIP integrity, and exact source matches for all three icons. This closes only the QA package verification gate, not production release.
- **Duplicate Chrome installation — CLOSED (user-confirmed in the extension QA report).** Do not remove anything else or reopen absent new evidence.
- **Functional QA groups** for quota, account switching/pairing, export/PDF and Escape behavior remain closed. Do not repeat successful tests just to refresh the checklist.

**Post-release follow-up (not a release gate):** On/after 2026-12-20, observe whether the recorded canceled paid-through subscription naturally transitions to Free. This does not block publication, does not justify rerunning the accelerated QA transaction test, and must not alter the unrelated active Sandbox subscription.

### Evidence and scope
- Site source branch: `feature/site-signin-visual-guide`; latest relevant fix commit: `5dbd4957f857af39a11f9b094283c8c4b22a4fcb`.
- Preview deployment: `https://486f5458.bomyra-site-preview.pages.dev/bomyra-site/` (deployment API reports all stages successful; user confirmed the button works).
- This is a documentation/status update. No extension, Worker, backend, Supabase, Paddle, production, DNS, or Vercel changes were made.


## Final release-readiness review — 2026-11-23 (Africa/Algiers)

### Decision
**The 1.5.139 QA package is verified, but BOMYRA is not ready for public production publication.** This is a source/configuration decision, not a failure of the package build. No production changes were made.

### Source evidence inspected
- Extension default branch `main` resolves to commit `a39377370c26393b2acefe8f29d1b384372c92ce`. Its `manifest.json` is version `1.5.139`, and its manifest host permission plus `src/quota.js` target the QA extension Worker and QA connect page. The extension README heading still identifies `v1.5.137`; this inconsistency must be reconciled before any release build.
- Extension PR #3 remains Draft/open, with head `rebuild/cloudflare-v1.5.139` and base `feature/free-export-quota`; it is not an approval to publish. Older extension PR #2 is also Draft/open and targets a separate older QA branch. Do not merge either blindly.
- Backend default-branch README still describes a private Vercel Functions backend and Paddle Sandbox. Backend PR #5 (`migration/cloudflare-billing-qa` → `feature/cloudflare-extension-api-qa`) is Draft/open and documents QA migration work, not production cutover. Older backend PRs #3 and #4 are also Draft/open. PR #6 remains closed without merge as previously recorded.
- Site default-branch `index.md` still routes both Sign in and Get Started to `/auth/`. The approved Product Tour behavior is present on `feature/site-signin-visual-guide` and its preview, not the inspected default-branch homepage. The site PR #3 proposes website-driven extension pairing, which the user rejected; do not merge or revive that behavior.
- The extension QA candidate's pairing starts inside the extension and opens the QA consent page. Keep that extension-initiated flow distinct from the rejected website-initiated pairing/account-management design.

### Release constraints
- QA Worker and QA connect endpoints must never be shipped as public production endpoints.
- Backend production routing, production Supabase, Cloudflare production bindings, Paddle Live, site publication, and Chrome Web Store submission each need their own verified release plan and explicit approval.
- Version 1.5.139 remains the current QA candidate. The user-approved 1.6.0 is only the next version-number decision; it does not authorize changing the manifest or publishing.
- The 2026-12-20 natural subscription-expiry observation is post-release follow-up, not a release blocker.

### Actions taken in this review
- Verified and closed the QA package/icon inclusion task.
- Reconciled the duplicate-installation status as closed based on the user-confirmed QA report.
- Updated the ordered work queue to distinguish QA package PASS from production-release blockers.
- No code, Worker deployment, Supabase row, Paddle configuration, DNS record, production route, PR merge/closure, Chrome Web Store listing, or production traffic was changed.


## Current status update — extension-initiated Add account route restored (2026-11-23, Africa/Algiers)

### Decision boundary
- **The public website must not initiate account connection, sign-in, pairing, or account management.** The earlier historical website-pairing Priority 2 remains superseded/rejected. Do not revive the orphaned website bridge or change Get Started / SIGN IN GUIDE.
- Account addition remains initiated only by **Add account inside the BOMYRA extension**.
- The complete extension-initiated path is present: extension Add account → QA Worker `/pair/start` → Cloudflare Pages `/bomyra-site/extension/connect-qa/` sign-in/approval → QA Worker `/pair/approve` → extension `/pair/poll` → `/account` verification → save/activate account in extension.

### Completed restoration — QA only
- Extension `main` is manifest `1.5.139`; `aixConnectBomyraAccount()` already implements the in-extension start/open/poll/save sequence. No extension code change was necessary.
- The live `bomyra-site-preview.pages.dev/bomyra-site/extension/connect-qa/` endpoint was fetched successfully. The deployed page source uses the normal extension authorization path when no site-preview flow flag is supplied.
- Corrected the deployed QA Worker `bomyra-entitlements-qa` so `/pair/start` returns the existing Cloudflare Pages URL rather than GitHub Pages.
- Active Worker deployment: `1d7a1012-86a2-4c46-9f20-bf4d83e75431`; version `88c466b3-9de1-42ed-afb9-9ea14fa5c20a`; 100% traffic; created `2026-11-23T20:35:01.185531Z`.
- Preserved AES-GCM token encryption/decryption and all current Worker bindings, including the existing Cloudflare Pages CORS origin and secret binding.
- No Supabase rows, account data, schema, extension package, website source, homepage behavior, billing, production services, or production traffic were modified.

### Acceptance status
- **PASS:** Worker endpoint destination is corrected and active; Cloudflare Pages connection page responds; static source confirms the extension-initiated approval/poll/save path is wired; security and binding preservation were checked after deployment.
- **PENDING — one authenticated live test:** the user must complete Add account in the installed QA extension with a signed-in BOMYRA account. Do not mark full end-to-end acceptance PASS until the extension shows the verified account and plan after approval.
- No synthetic `/pair/start` call was made because it writes a pairing row. No database mutation was performed for this verification.

### Next execution order
1. **Complete one live QA Add account acceptance test** from inside the extension. Verify that the opened tab uses the Cloudflare Pages connection URL, approve the intended BOMYRA account, and confirm the extension shows the saved account/plan. If an error occurs, capture its exact message/status and inspect only that failing segment; do not repeat unrelated successful quota/account-switcher tests.
2. **Production extension/Worker cutover review — BLOCKED / not approved.** QA endpoints must not be shipped publicly. Prepare a separate production Worker, production Supabase bindings, production extension endpoints, and release evidence; obtain explicit approval before any production change.
3. **Official Chrome Web Store listing / installation CTA — LAST.** Use only a verified official listing URL after the production package and release are approved.
4. **Post-release subscription-expiry observation — 2026-12-20 or later.** Keep this as a scheduled follow-up, not a current release blocker.

### Evidence and release safety
- The older queue entries about website-initiated pairing are historical only; the authoritative decision remains extension-only account management.
- The Product Tour and one-image SIGN IN GUIDE remain accepted and untouched.
- Preserve the existing successful quota, multi-account isolation, checkout, webhook, and export QA evidence. Do not rerun those tests without a relevant change.
- Full authenticated Add account acceptance remains pending the single user/browser test above. Production remains NOT APPROVED.


## Diagnostic update — Add account approval blocked before Worker invocation (2026-11-23, Africa/Algiers)

- User browser evidence: the old Cloudflare Pages connection page renders and identifies the signed-in account; pressing **Continue with this account** enters the authorizing state and then shows **Failed to fetch**.
- Read-only Worker telemetry for `2026-11-23T20:35:00Z`–`20:45:00Z`: extension `/pair/poll` calls and OPTIONS preflights arrive from `https://chatgpt.com` with HTTP 200 / 204. No events were observed from Origin `https://bomyra-site-preview.pages.dev`; no `/pair/approve` request reached the Worker.
- The active Worker binding already allows the old Cloudflare Pages origin, and source includes the OPTIONS handler and `POST /api/extension/pair/approve` route. Do not modify CORS or the approval handler without further evidence.
- Root cause is not yet proven; failure occurs before the Worker records the approval request. The next required evidence is the exact browser DevTools Console error from the connection tab (without secrets or request payloads).
- **Status:** technical route restored, but authenticated Add account acceptance remains **BLOCKED / PENDING browser-side request diagnosis**. Do not claim full end-to-end PASS.
- No source, Worker settings, database rows, account sessions, extension package, or website controls changed during this diagnostic.


## Diagnostic update — extension Add account approval fails in the browser (2026-11-23, Africa/Algiers)

- User-provided screenshots confirm the restored Cloudflare Pages page loads and displays the signed-in BOMYRA account. Clicking **Continue with this account** changes the page to **Authorizing … with the Cloudflare QA Worker…**, then the browser reports **Failed to fetch**.
- Read-only telemetry shows extension-originated requests to `/api/extension/pair/poll` reached Worker and returned 200, with their OPTIONS preflights returning 204.
- Earlier `/api/extension/pair/approve` OPTIONS 204 and POST 200 events exist from the former GitHub Pages origin; they are historical, not evidence that the screenshot attempt succeeded.
- For the screenshot time window, no `OPTIONS` or `POST` for `/api/extension/pair/approve` from `https://bomyra-site-preview.pages.dev` appears in Worker telemetry. The active Worker CORS allowlist does include this exact Pages origin, and its handler allows POST/OPTIONS plus Authorization/Content-Type. No cause is yet proven for why the browser request does not reach Worker.
- **Do not change CORS or deploy another Worker version speculatively.** The next required evidence is the failed browser request in Chrome DevTools Network, or the exact Console error. Capture only the error/status and request URL. Do not share HAR, Authorization headers, access tokens, pairing codes, cookies, or credentials.
- No source, deployment, CORS binding, Supabase record, or account data was changed during this diagnostic. Keep full authenticated Add account acceptance **BLOCKED / PENDING** until the real browser approval and extension account save are confirmed.

### Immediate next action
1. On the already-open connection page, open DevTools (F12) → Network, enable Preserve log, then click **Continue with this account** once.
2. Inspect the `OPTIONS` or `POST` request to `bomyra-entitlements-qa.seddofrah.workers.dev/api/extension/pair/approve`. Share a screenshot of its General section/status or the exact Console error only. Never expose Authorization or Cookie values.
3. Resume the narrow fix based on that evidence; preserve the active Worker version and all passing extension tests.


## Corrective restoration — preserve the historically successful Add account route (2026-11-23, Africa/Algiers)

- User-provided Chrome screenshots identify the normally working installed unpacked extension as **1.5.139**, loaded from `F:\bomyra-extension-rebuild-cloudflare-v1.5.139`; its QA Worker host permission is present. No extension package or permission change was made.
- The previous Worker-only switch to the Cloudflare Pages connection host was rolled back. The active QA Worker `startPairing()` now returns the historical GitHub Pages connect URL:
  `https://seddofrah-cmyk.github.io/bomyra-site/extension/connect-qa/`.
- Corrective Worker deployment: `ae75a673-42b2-4a58-a5d6-d858d3314ce7`; version `83f6e0d5-2ebf-4645-a4c1-93751da367ab`; 100% traffic; created `2026-11-23T20:54:47.598659Z`.
- The restored GitHub Pages connection endpoint was fetched successfully and returns the expected BOMYRA QA connection page.
- Historical Worker telemetry records successful GitHub Pages-origin `OPTIONS 204` and `POST 200` for `/api/extension/pair/approve`. Those successful earlier events are the evidence used to select this restored route. The newer Cloudflare Pages attempt timed out in the user's browser.
- AES-GCM token encryption/decryption remains intact. No extension, site source, CORS binding, Worker secrets, Supabase rows, account data, or database schema were changed during restoration.
- The latest Chrome screenshot visibly shows the extension's global enable switch as **Off**. Before the next Add account test, ensure it is On. Do not change site permissions, reinstall or reload an alternate package.
- The one-time code exposed in the user's screenshot must not be reused. Start a fresh Add account attempt once the extension is enabled.
- **Status:** restored historical route / previous successful evidence available; one fresh end-to-end Add account confirmation remains pending. Do not mark PASS until the extension shows the account and plan.

### Next action
1. Turn the existing 1.5.139 extension On (only if it is still Off), then start Add account inside that extension to generate a fresh one-time code.
2. Confirm the opened page is on the historical GitHub Pages host, approve the intended account, and verify the extension displays the saved account and plan.
3. If it still fails, preserve the exact error and inspect only that failing request. Do not rerun prior successful quota, export, multi-account, or billing QA.


## Final integration status — correct 1.5.139 extension + official site (2026-11-23, Africa/Algiers)

### Completed
1. Verified the user-uploaded `bomyra-extension-rebuild-cloudflare-v1.5.139 (1)(2).zip`: manifest version 1.5.139; exact `manifest.json` and `src/quota.js` Git blob hashes match the 1.5.139 reference source. Archive SHA-256: `0511a040466be4cb3bbeea583fcb582545d998750180a4ef49248252c337bbe9`.
2. On the approved site branch `feature/site-signin-visual-guide`, corrected only the nav and hero `Get Started` href fallback targets to the existing Product Tour dialog `#bomyra-product-tour`. This removes the former auth-route fallback and the nonexistent anchor fallback.
3. Kept `SIGN IN GUIDE` targeting `#bomyra-install-dialog`, with its one-image guide; six-step Product Tour remains in place.
4. Deployed the corrected site to the official `bomyra-site` Pages project: deployment `63694ad9-09c8-4dfb-b436-85aa861878eb`, all stages success, branch `feature/site-signin-visual-guide`. Official URL: `https://bomyra-site.pages.dev/bomyra-site/`.
5. Connected the extension's existing `Add account` flow to the official site's `/bomyra-site/extension/connect-qa/` route by updating the QA Worker `connectUrl` and adding `https://bomyra-site.pages.dev` to CORS allow-origin logic. Active Worker deployment `b2e8c73b-435e-43b9-a0a4-fa9fa85e95ef`, version `ceb1985f-1787-489b-9752-e098d5ad435a`, 100% traffic.
6. Verified current Worker source still includes AES-GCM token encryption/decryption and all existing bindings/secrets remain present.

### Architecture boundary
- `Get Started` opens the six-step Product Tour.
- `SIGN IN GUIDE` opens the single-image informational guide only.
- No homepage or public-site account pairing was added. Only the existing `Add account` action inside the extension starts pairing.
- No extension source/package replacement, Supabase row/schema change, account-data change, billing change, production Worker, DNS, or production traffic change was made.

### One remaining live acceptance
1. Ensure the installed BOMYRA 1.5.139 extension is On.
2. Start a new `Add account` attempt inside the extension. Do not reuse any old one-time code shown in prior screenshots.
3. Confirm the opened page is `bomyra-site.pages.dev/bomyra-site/extension/connect-qa/`, approve the intended account, and verify the saved account and plan appear in the extension.
4. Mark PASS only after the extension UI shows the account and plan. Do not repeat previously accepted quota/export/multi-account tests.



## Current status update — Add account flow verified; resume planned work (2026-11-24, Africa/Algiers)

This update is authoritative over earlier Add account pending/diagnostic entries above where they conflict.

### Add account — current disposition
- The active extension QA candidate is **1.5.139**, branch `feature/account-switcher-1.5.139-qa`; latest documented source commit: `f40aa3454bc9044d1bccd6d2745567237f8b77dc`.
- The user confirmed that Add account pairing succeeded and that the behavior was **100/100** in the completed check.
- The flow order is settled and must not be changed: Add account → temporary `about:blank` → `POST /pair/start` → navigate to returned `start.connectUrl` → connect page checks its Supabase session → user approval → extension polls `/pair/poll` → account verification/save.
- The connect page URL constant in `src/quota.js` was updated to `https://bomyra-site.pages.dev/bomyra-site/extension/connect-qa/` in commit `f40aa3454bc9044d1bccd6d2745567237f8b77dc`. This source commit was not deployed as part of this work.
- QA Worker `bomyra-entitlements-qa` remains Version 18 (version ID `9feee266-8a3a-4a25-b252-8555feb55d23`; deployment `7c5cb5fb-2be0-4052-8c0d-a6b213928b47`; 100% traffic). No Worker deployment or configuration change occurred.
- The no-session/auth path briefly appeared unavailable and then worked again without any project change. The user suspects a local network issue. This is not established as a project defect, is not an open queue item, and must not be logged as a BOMYRA incident.
- The user is still completing broader checks of the operation, domains, and buttons. Do not mark the entire browser acceptance stage finally closed until the user confirms completion.

### Work-order correction
1. Continue only the user's remaining browser verification of the current Add account operation, actual domains, and buttons. Do not alter the settled flow order or repeat unrelated successful QA.
2. After the user confirms this verification is complete, resume the previously ordered roadmap: production extension/Worker cutover review (blocked; separate approval required), then the separate site-experience promotion review, then official Chrome Web Store listing/installation CTA last.
3. Preserve the approved Product Tour and one-image SIGN IN GUIDE. The public website must not initiate pairing, sign-in, account linking, or account management.
4. Keep all production services, production Supabase, Paddle Live, DNS, and public extension publication untouched unless the user gives separate explicit approval.

### No-regression / no-reopen rules
- Do not return to the previously encountered project regression path or reintroduce changes that reduce paid-plan behavior or weaken security.
- Do not reopen the settled Add account ordering.
- Do not repeat successful quota, export, account-switching, checkout, webhook, or pairing checks without a relevant code change.
- The transient no-session observation is deliberately excluded from the defect list; no project change was made in response to it.

### Evidence and scope
- Extension source commit: `f40aa3454bc9044d1bccd6d2745567237f8b77dc`.
- `src/quota.js` SHA: `d3eada7dbd5d45890a0a296c289afe71f8a8e458`.
- No source beyond the documented constant update, Worker, site deployment, database, billing, DNS, production configuration, or release state was changed by this status update.


## Authoritative status update — Add account verification closed (2026-11-24, Africa/Algiers)

This entry supersedes the 2026-11-24 status entry above wherever it says the user is still completing browser verification or instructs continuing that verification.

### Priority 1 — Add account browser acceptance

**Status: PASS — CLOSED by explicit user confirmation (2026-11-24).**

- The user confirmed that verification of the Add account operation, the domains, and the related buttons is complete and the result is good.
- Pairing behavior had already been confirmed by the user as **100/100**.
- The established in-extension flow order remains accepted and closed: Add account → temporary `about:blank` → `POST /pair/start` → navigate to returned `start.connectUrl` → connect page checks its Supabase session → user approval → extension polls `/pair/poll` → account verification/save.
- Do not reopen the flow order, repeat the completed browser acceptance, or treat the transient no-session observation as a project defect. It later worked without a project change; its root cause was not established.
- No code, Worker, site, Supabase, billing, DNS, production, or release change was made to close this item.

### Updated remaining work — authoritative execution order

1. **Production extension / Cloudflare cutover review — BLOCKED; separate approval required.** Review the production-specific Worker, production Supabase bindings, approved billing environment, production extension endpoints, and end-to-end release evidence. QA endpoints must not be shipped publicly. Do not change production traffic, Paddle Live, DNS, or production services without explicit approval.
2. **Approved site-experience promotion review — separate release gate.** Review the approved `feature/site-signin-visual-guide` experience and its production-promotion implications. Keep the Product Tour and one-image SIGN IN GUIDE behavior intact. Do not add website-initiated pairing, sign-in, account linking, or account management.
3. **Official Chrome Web Store distribution and installation CTA — last.** Requires an approved production-configured extension package and a verified official listing URL. Do not invent the URL or publish before the production gates are approved.
4. **Post-release subscription-expiry observation — on/after 2026-12-20.** Follow-up only; not a current release blocker.

### No-regression / no-reopen rules
- Add account acceptance is closed. Reopen only if new, reproducible evidence shows a regression.
- Preserve all successful QA evidence; do not rerun unrelated quota, export, account-switching, checkout, webhook, or pairing tests without a relevant change.
- Keep production services, production Supabase, Paddle Live, DNS, and public extension publication untouched absent separate explicit approval.
- The public website remains informational/onboarding only; account pairing and account management remain inside the extension.

### Documentation scope
- This is a status/report update only. It does not change application source, deployment, Worker configuration, database state, billing, DNS, production traffic, or publication status.


## Authoritative queue correction — 2026-11-26 (Africa/Algiers)

The following items are **COMPLETED / CLOSED by explicit user confirmation**. This entry supersedes every earlier queue instruction or status in this file that describes these same items as pending, blocked, unverified, or required. Remove them from active work; do not repeat tests or request evidence unless the user explicitly reopens an item.

- **Live Add account browser acceptance after the latest production site deployment — CLOSED.** The site fix was merged through PR #13 (merge commit ecb7628a91980c74cfdb89f4a09207a61b18b059) and deployed as Cloudflare Pages production deployment dd840506-3fe2-464b-a493-874ae055bfc5. The user explicitly closed the live acceptance item. The merged fix branch fix/production-add-account-chooser-20261126 has been deleted from GitHub; the merged commits and PR remain intact. Protected backup backup/pre-add-account-fix-20261126 remains retained.
- **Extension ZIP package 1.5.140 — CLOSED** by explicit user confirmation.
- **Supabase Auth Site URL and Redirect URL update — CLOSED** by explicit user confirmation.

No other queue item is changed by this correction. Preserve the existing order, status, and scope of all remaining work. This update is documentation-only and does not authorize code, service, database, billing, DNS, deployment, or production changes.


## Documentation PR #14 closeout record — 2026-11-26 (Africa/Algiers)

- **Pre-merge backup created:** `backup/pre-docs-closeout-20261126`, from the default-branch commit `ecb7628a91980c74cfdb89f4a09207a61b18b059`. GitHub confirmed the backup branch exists; preserve it unchanged.
- **PR #14 merged:** `docs: close confirmed BOMYRA QA items`, into `feature/site-signin-visual-guide`; merge commit `93167517b8bfe8ea9ce58cd0fabcf8894b11b40e`.
- **Post-merge verification:** PR #14 reports closed/merged, and both `SITE-QA-REPORT.md` and this queue contain the 2026-11-26 authoritative status corrections.
- **Merged working branch deleted:** `docs/closeout-status-2026-11-26`. The user confirmed deletion; GitHub branch search verified it is absent.
- The protected backup `backup/pre-docs-closeout-20261126` remains present. The earlier `backup/pre-add-account-fix-20261126` also remains a separately protected backup.
- Documentation/Git lifecycle only. No code, tests, services, database, billing, DNS, deployment, or production changes.


## Backend Vercel isolation — Git closeout and remaining external integration check (2026-11-26, Africa/Algiers)

### Completed
- Backend PR #10 was merged with explicit user approval into `store-readiness/cloudflare-qa`; merge commit: `aeb4fccb5ae6ea30ad35a49b6b1fe9e210af0ce3`.
- Vercel runtime/configuration and legacy Vercel backend handlers/dependencies were removed from the Backend repository. CI now checks/tests the Production Cloudflare Workers only.
- Post-merge Production Worker CI passed: [run 45877923334](https://github.com/seddofrah-cmyk/bomyra-backend/actions/runs/45877923334).
- The user deleted `chore/final-vercel-isolation-20261126`. GitHub branch search subsequently returned zero matches for that exact name.
- Protected Backend backup `backup/pre-vercel-isolation-20261126` remains retained and must not be changed or deleted.

### Remaining — external GitHub/Vercel integration
- A `vercel[bot]` comment was observed on PR #10 after it was opened, referencing the former Vercel project/deployment.
- This is evidence of an external GitHub-side Vercel integration still emitting a comment at that time. Whether the GitHub App installation, repository webhook, or organization-level integration has since been removed is **not verified**.
- Keep this item open as **external integration removal/verification pending**. Inspect the repository/organization GitHub App installations and webhooks, identify the exact Vercel integration associated with this repository, and only then remove it with explicit user authorization. Do not remove unrelated integrations.

### Safety boundary
- No Cloudflare Worker deployment, Supabase change, Paddle change, DNS change, secret change, or production traffic change was part of PR #10 or this report update.
- Do not create or deploy `bomyra-billing-prod`, enable Paddle Live, or alter production CORS as part of this closeout.


## Active checkpoint — missing Terms of Service and Refund Policy (2026-11-26, Africa/Algiers)

**Status: CONFIRMED GAP — implementation not started; user approval required.**

- Inspected `seddofrah-cmyk/bomyra-site` default branch `feature/site-signin-visual-guide` at `c50f6ec433e599fbf92d24fb801042227e44400c`.
- `privacy.md` exists. No Terms of Service or Refund Policy file/page exists in the complete tracked tree; exact-term repository searches returned no matches.
- `_layouts/default.html` footer links only Plans, Privacy, and Support. The homepage footer also has no Terms or Refund link.
- **Next action:** after the user approves, establish the factual subscription/legal terms, draft Terms of Service and Refund Policy, then add both pages and their footer links. Preserve existing design, Product Tour, SIGN IN GUIDE, and protected CTA behavior. Do not invent business identity, legal address, jurisdiction, or refund/cancellation terms.
- **Stop point:** do not draft or modify site source until the user approves the policy drafting/update scope and supplies any missing factual terms.
- Paddle Live account-side review remains partially unverified because no Paddle connector/account access was available. Do not claim Paddle readiness. No Paddle or production settings were changed.
- No application code, Worker, Supabase, billing, DNS, deployment, or production traffic was changed by this inspection.
