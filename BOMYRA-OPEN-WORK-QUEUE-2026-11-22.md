# BOMYRA — Ordered Open Work Queue

Updated: 2026-11-23 (Africa/Algiers)
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
