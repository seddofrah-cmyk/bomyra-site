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

## Priority 1 — close the current website QA evidence discrepancy

**Status: PARTIAL / browser-visible PASS**

- User screenshot on 2026-11-22 shows the Cloudflare Pages preview page and the new single screenshot rendering inside the guide.
- Cloudflare deployment `0ab62c71-ccb1-4553-b596-b261647e7df5` was still reported as build-active by the API; automated fetch returned 404 for page and asset.
- Reconcile deployment status and verify the asset is served by the deployed Preview URL. Do not change site source unless this verification reveals a real defect.
- Do not promote or merge this branch as part of this task.

## Priority 2 — review homepage Get Started behavior (separate site task)

**Status: OPEN / intentionally deferred**

- Review the existing homepage button behavior and destination.
- Preserve the user's requirement that the sign-in/create-account screen must be shown when starting the account flow, including when a user is already signed in, so another account can be added.
- Important boundary: the website must not pair, link, or manage BOMYRA accounts. The actual sign-in, account addition, and switching flow remains inside the extension. Design the button destination accordingly; do not add a website-side pairing flow.
- Do not change this button during the completed visual-guide pass.

## Priority 3 — official extension distribution destination

**Status: BLOCKED — official store URL not supplied/confirmed**

- Obtain and verify the official store listing URL.
- Only then prepare a separately reviewed installation CTA.
- Do not invent or use an unconfirmed store URL.

## Priority 4 — Cloudflare Billing QA release evidence

**Status: QA implementation/CI largely complete; release evidence still gated**

- Backend isolated QA branch: `fix/webhook-atomic-claim-qa`; draft PR #6 remains open/unmerged in the latest recorded checkpoint.
- Recorded commit with `subscription.past_due` source synchronization and regression test: `e222b9311c56340c1d25d5f4cc9d16eb90e13a8a`; GitHub Actions run `44938568679` passed (37 Billing Worker tests, plus typecheck/backend/Worker checks).
- Atomic Paddle webhook claim/lease migration and Worker hardening were implemented on QA; DB concurrency claim/reclaim/fencing checks passed with a synthetic event.
- A signed `subscription.past_due` Sandbox event was processed successfully; duplicate replay was acknowledged without a second processing attempt. Unauthenticated checkout rejection also passed.
- Next: verify the currently deployed QA Worker version/source corresponds to the intended final branch commit and that the atomic-claim implementation is the active version; then run one controlled signed Sandbox webhook against that active version and verify the event/lease lifecycle in Supabase QA. Do not repeat already successful unrelated checkout, duplicate replay, or regression checks.
- Production cutover remains blocked until the QA evidence is reconciled and reviewed.

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

1. Resolve the Cloudflare Pages deployment-status / automated-fetch discrepancy without changing source prematurely.
2. Verify active Cloudflare Billing QA Worker provenance and perform one signed Sandbox event check on the active atomic-claim version.
3. Keep the Get Started behavior review separate from the image-guide work; maintain the extension-only account flow.
4. Wait for/verify the official store listing before any install CTA.
5. On/after 2026-12-20, verify the natural paid-through expiry-to-Free transition.
6. Only after QA gates are complete, prepare a separate production cutover review for explicit approval.
