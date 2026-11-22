# BOMYRA — Ordered Open Work Queue

Updated: 2026-11-22 (Africa/Algiers)
Purpose: current task order based on the latest available project checkpoint, QA reports, repository evidence, and the user's browser confirmation of the site guide.

## Operating rules

- Keep all remaining implementation and acceptance work in isolated QA branches/environments.
- Do not merge to production, change production traffic, use Paddle Live, or disable/remove production services without a separate explicit approval.
- Do not use Vercel for new BOMYRA work; the user explicitly chose to abandon Vercel.
- Never implement account pairing, sign-in, or account switching on the main website. These functions remain inside the BOMYRA extension.
- Preserve successful QA results. Do not rerun completed tests unless a later code change affects the tested path.
- Record each action with timestamp/timezone, environment, resource, action, output/evidence, result, and evidence quality.

## Priority 1 — website visual-guide QA

**Status: PASS — user screenshot + Cloudflare deployment API**

- User screenshot on 2026-11-22 shows the Cloudflare Pages preview page and the new single screenshot rendering inside the guide.
- Deployment `0ab62c71-ccb1-4553-b596-b261647e7df5` subsequently completed successfully; all five stages (queued, initialize, clone_repo, build, deploy) are success.
- The earlier automated 404 occurred while deployment was still building; it is superseded by the completed deployment record and browser screenshot.
- Independent binary/hash verification of the image is not recorded. No source change is required based on current evidence.
- Keep the feature branch isolated; do not promote or merge it as part of this task.

## Priority 2 — homepage Get Started / Sign in navigation

**Status: IMPLEMENTED; Cloudflare Pages preview deployment PASS; browser interaction check pending**

- Root cause confirmed: the three homepage Sign in/Get Started anchors already pointed to `/bomyra-site/auth/`, but `assets/js/bomyra-onboarding.js` intercepted clicks on elements carrying `data-bomyra-onboarding`, called `preventDefault()`, and opened the visual guide instead.
- The authentication page exists at `auth/index.html` and provides Sign in / Create account tabs. Its existing logic preserves the extension pairing continuation path; that flow was not modified.
- Commit `8bed0ba574b3e1345814dc307f49bcdd5a5f13cd` on `feature/site-signin-visual-guide` removes the interception attribute from the three primary CTAs and adds a separate footer **Account guide** link, retaining the visual guide as an independent informational action.
- Cloudflare Pages deployment `c56f2566-84bc-4641-ba55-b876446a304c` for this exact code commit completed successfully (all stages succeeded). The preview is `https://c56f2566.bomyra-site-preview.pages.dev/bomyra-site/`. Remaining acceptance: open it in a browser and confirm the homepage CTAs navigate to `/bomyra-site/auth/` and the separate Account guide still opens. The browser verification is not yet independently observed. No pairing or account linking is added to the main website.

## Priority 3 — official extension distribution destination

**Status: BLOCKED — official store URL not supplied/confirmed**

- Obtain and verify the official store listing URL.
- Only then prepare a separately reviewed installation CTA.
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

1. The site visual guide is complete for this pass. Keep Get Started review separate; no further image-guide change is currently queued.
2. Verify active Cloudflare Billing QA Worker provenance and perform one signed Sandbox event check on the active atomic-claim version.
3. Keep the Get Started behavior review separate from the image-guide work; maintain the extension-only account flow.
4. Wait for/verify the official store listing before any install CTA.
5. On/after 2026-12-20, verify the natural paid-through expiry-to-Free transition.
6. Only after QA gates are complete, prepare a separate production cutover review for explicit approval.


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
