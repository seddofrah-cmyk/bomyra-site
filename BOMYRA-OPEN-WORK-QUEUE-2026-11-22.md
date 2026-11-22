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

## Priority 5 — subscription expiry lifecycle follow-through

**Status: LOGIC PASS / real-time expiry observation pending**

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
1. **Official Chrome Web Store listing** — waiting for the confirmed official listing URL / publication. Only after verification, prepare a separate installation CTA review. No guessed URL.
2. **Natural subscription expiry observation** — on/after 2026-12-20, check whether the recorded canceled paid-through subscription naturally transitions to Free. This is an observation task, not a reason to rerun the accelerated QA transaction test or alter the unrelated active Sandbox subscription.
3. **Duplicate Chrome installation cleanup** — deferred. The 1.5.139 QA candidate is enabled; an older duplicate installation was previously seen disabled with Errors. Identify it and confirm it is the obsolete copy before removing it; do not delete it by assumption.
4. **Production release/cutover review** — blocked until all applicable release evidence is current and the user gives separate explicit approval. No merge to production, Paddle Live, production traffic, DNS, or service shutdown is authorized by this queue update.

### Evidence and scope
- Site source branch: `feature/site-signin-visual-guide`; latest relevant fix commit: `5dbd4957f857af39a11f9b094283c8c4b22a4fcb`.
- Preview deployment: `https://486f5458.bomyra-site-preview.pages.dev/bomyra-site/` (deployment API reports all stages successful; user confirmed the button works).
- This is a documentation/status update. No extension, Worker, backend, Supabase, Paddle, production, DNS, or Vercel changes were made.
