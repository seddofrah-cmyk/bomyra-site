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


## Authoritative update — store-readiness work completed 2026-11-23

This section supersedes earlier statements above where they describe candidate Workers, QA migrations, and production source readiness. It does not authorize production publication.

### Verified QA and candidate evidence
- Extension QA package build after source hardening: GitHub Actions run `45097459350`, artifact ID `14783478894`; its source build contains the account disconnect warning, transient pairing retry, bounded export finalization retry, and CSS sanitizer hardening. Browser regression for these new branches remains outstanding.
- Separate production-endpoint extension candidate: [run #45100265507](https://github.com/seddofrah-cmyk/bomyra-extension/actions/runs/45100265507), artifact ID `14785585190`, commit `93e8bd510e45d0590e4e77f0812012133d3b9a7d`. The artifact was downloaded and inspected: 1.5.139, Manifest v3, 24 JavaScript files pass syntax checks, no QA Worker or QA pairing URL in runtime source. It is explicitly marked `PRODUCTION_CANDIDATE_NOT_STORE_APPROVED`; the target Worker is not deployed.
- Backend CI [run #45099567497](https://github.com/seddofrah-cmyk/bomyra-backend/actions/runs/45099567497) passed: 27 backend tests, 19 Extension API Worker tests, 38 Billing QA Worker tests, 21 Production Extension Worker candidate tests, and 39 Production Billing Worker candidate tests. TypeScript and Worker JavaScript checks passed.
- Supabase migration-chain validation [run #45099567546](https://github.com/seddofrah-cmyk/bomyra-backend/actions/runs/45099567546) passed on clean PostgreSQL 17 databases for QA and the isolated Production migration chain.
- QA Supabase project `xbtcmfstzpculiqckvnc` now records migration versions `20261123021647` and `20261123021700`. A rollback-only integration transaction passed: older Paddle events were rejected as stale, newer lifecycle events applied, export finalization was idempotent, and a completed reservation could not be reversed. After rollback, no test subscription/reservation remained.
- QA Worker `bomyra-entitlements-qa` updated to version `1f41b929-0c7d-4b80-88d7-799597ab6007`, deployment `d7be9ea1-89d5-4156-b811-00fa1e22bed0`, 100% QA traffic. It now includes account/revoke routes and encrypted transient pairing tokens.
- QA Billing Worker `bomyra-billing-qa-v2` updated to version `0395f4e7-f955-427a-b842-7cebd62ea7fb`, deployment `a6c1240d-b9fd-43eb-8f3f-c7ca577f0a4d`, 100% QA traffic. It includes monotonic event application and retryable webhook failure responses.
- Production Worker source candidates now exist in backend branch `store-readiness/cloudflare-qa`: `cloudflare-extension-production/` and `cloudflare-billing-production/`. They are not deployed; no production Worker is currently listed in the Cloudflare account.
- The production Supabase project `vagxeweqihibhcqnsnbe` is active and contains the bootstrap plus the first eight QA-aligned migrations; the two latest hardening migrations remain pending there. No production rows were inserted or changed.
- Site branch `store-readiness/site` now uses the production Supabase publishable key for browser Auth, excludes internal/QA documentation and QA routes from Jekyll output, removes the hard-coded Sandbox Paddle checkout, and keeps checkout and extension approval fail-closed because production Worker endpoints are not deployed.

### Remaining release gates — in this order
1. **Deploy and verify Production Entitlements Worker** with the exact HTTPS production connect URL, exact origin allowlist, production Supabase secret, and observability settings. Do not route extension users to it until the dedicated QA-to-production acceptance is complete.
2. **Apply Production Supabase migrations** `20261123021647` and `20261123021700` only after the production dry-run is confirmed against project ref `vagxeweqihibhcqnsnbe` and the user separately approves the database change.
3. **Provision Paddle Live**: verify the monthly/yearly Live catalog IDs, Live API key, notification destination, signing secret, and webhook URL. Do not reuse Sandbox values.
4. **Deploy and verify Production Billing Worker** with Live-only guard, production Supabase binding, exact site origin, Live price IDs, and secrets. Exercise duplicate checkout protection, failed/replayed webhook handling, event ordering, and subscription lifecycle with controlled acceptance accounts.
5. **Verify Production Supabase Auth settings**: allowed site/callback URLs, email confirmation, recovery flow, and production email delivery. The production project settings were not changed or verified in this work.
6. **Targeted end-to-end browser acceptance**: extension pairing, account identity/switch/disconnect, quota, all exports, payment, webhook activation, cancellation/paid-period access, and sign-in/recovery. No production endpoints are currently enabled in the site.
7. **Promote the approved site branch** with the Product Tour and separate Sign in behavior. Keep website-initiated account pairing/account management out of scope.
8. **Chrome Web Store submission — LAST**. Change the Manifest version to the approved next release only after all prior gates, create the final store package, complete permission disclosures, obtain the official listing URL, and then add the installation CTA.

### Important test limitation
- An external HTTP smoke test from the connected tools was blocked before reaching either QA Worker (tool-origin 403 / URL inaccessible). This is not evidence of a Worker response. The new code and settings were verified through Cloudflare metadata and CI; browser/runtime acceptance of the new pairing encryption and webhook retries remains to be performed from an allowed browser/client.
- The production-endpoint extension archive is a candidate only. Never submit it while `bomyra-entitlements-prod` is not deployed.
- The 2026-12-20 natural subscription-expiry observation remains a post-release follow-up, not a launch blocker.
- Duplicate Chrome installation cleanup remains CLOSED based on the user-confirmed QA report.

### Scope of completed actions
QA-only Worker deployments and QA Supabase migrations were changed. No production Worker, production Supabase migration, Paddle Live key/catalog/notification, site publication, DNS, main-branch merge, Chrome Web Store listing, or production traffic was changed.
