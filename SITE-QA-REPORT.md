# BOMYRA Site — QA / Work Report

Updated: 2026-11-22 (Africa/Algiers)
Repository: `seddofrah-cmyk/bomyra-site`
Working branch: `feature/site-signin-visual-guide`
Visual-guide source commit: `4d5d1c002cbde6d8736387588fb8a8cc0637f11e`

## Completed — visual sign-in guide

- Replaced the two earlier screenshots with the single user-supplied image `assets/images/signin-guide.png`.
- Removed the old image references `signin-connect-account.jpg` and `signin-add-account.jpg` from the guide markup.
- The guide now contains one visual step: **Manage your BOMYRA accounts**.
- Kept the account-isolation explanation: each account keeps its own plan and quota; switching accounts never transfers a subscription.
- Kept the guide informational only. Account sign-in, account addition, and switching happen only inside the browser extension; the website does not connect or pair accounts.
- Kept **Close guide** as the only guide action. No retry, install, pairing, or sign-in redirect was added.
- Did not modify the extension, Workers, backend, Supabase, checkout, production configuration, or the homepage **Get Started** behavior.

## Visual verification — user supplied browser evidence

- On 2026-11-22, the user supplied a browser screenshot showing the Cloudflare Pages preview at `https://0ab62c71.bomyra-site-preview.pages.dev/bomyra-site/`.
- The screenshot visibly confirms that the guide opens and the new single image renders inside the guide; **Close guide** is visible.
- Result: **PASS — user-confirmed visual rendering in the actual browser**.
- Evidence boundary: this is a user-provided browser screenshot, not an independently captured browser test or a binary hash comparison from the deployment.
- Cloudflare API recheck on 2026-11-22 confirmed deployment `0ab62c71-ccb1-4553-b596-b261647e7df5` completed successfully: queued, initialize, clone_repo, build, and deploy all reported success. The earlier automated fetch had returned 404 while the deployment was still building; this is superseded by the completed deployment record and the user's browser screenshot. The separate report-only commit `b99e864a2971ac606e74c8c41c3aa7ee817b08b1` has triggered a subsequent Pages preview build; it contains documentation changes only.

## Deferred work — keep open

1. **Homepage Get Started behavior:** review its behavior and destination in a separate task. It was intentionally not changed during this visual-guide pass. Do not treat it as finalized.
2. **Official extension store URL / installation CTA:** still waiting for the confirmed official store listing. Do not add an installation CTA or guess a destination before the URL is confirmed and the change is separately approved.

## Verification and release boundary

- Working branch remains isolated: `feature/site-signin-visual-guide`.
- Latest source change commit: `4d5d1c002cbde6d8736387588fb8a8cc0637f11e` — `Use the single replacement sign-in guide image`.
- Cloudflare Pages project: `bomyra-site-preview`; deployment ID: `0ab62c71-ccb1-4553-b596-b261647e7df5`.
- User screenshot confirms the guide is visible in the browser. Cloudflare deployment `0ab62c71-ccb1-4553-b596-b261647e7df5` is API-confirmed successful. Independent binary/hash verification of the image is still not recorded.
- No merge to the production branch and no production deployment were performed.
- Do not modify the extension pairing/login flow, Workers, backend, Supabase, billing, or production settings as part of this site-only task.


## Addendum — homepage account CTA navigation correction (2026-11-22, Africa/Algiers)

- Root cause: homepage Sign in/Get Started anchors already targeted `/bomyra-site/auth/`, but `assets/js/bomyra-onboarding.js` intercepted every element with `data-bomyra-onboarding`, called `preventDefault()`, and opened the informational visual guide instead of following the link.
- Confirmed the account page exists at `auth/index.html`; it provides Sign in and Create account tabs. Existing `next` and pending extension-pairing continuation logic was inspected and left unchanged.
- Commit `8bed0ba574b3e1345814dc307f49bcdd5a5f13cd` on isolated branch `feature/site-signin-visual-guide` removes the interception attribute from the three primary Sign in/Get Started CTAs and adds a distinct footer **Account guide** link so the guide remains available independently.
- No extension pairing, auth implementation, Supabase configuration, checkout, Worker, or production configuration was changed.
- Cloudflare Pages preview deployment for this commit was created as `c56f2566-84bc-4641-ba55-b876446a304c` at `https://c56f2566.bomyra-site-preview.pages.dev`. At the latest check it was still in the `build` stage (active); therefore deployment success and browser behavior are **not yet verified**. Do not describe the fix as accepted until the deployment completes and the homepage CTA plus separate guide are checked.


### Preview deployment result — code commit (2026-11-22, Africa/Algiers)

- Cloudflare Pages deployment `c56f2566-84bc-4641-ba55-b876446a304c` for code commit `8bed0ba574b3e1345814dc307f49bcdd5a5f13cd` completed successfully. Queued, initialize, clone_repo, build, and deploy stages all report success.
- Preview URL: `https://c56f2566.bomyra-site-preview.pages.dev/bomyra-site/`.
- This confirms build/deployment only. Automated browser inspection was unavailable; user/browser confirmation is still required for the CTA navigation and independent Account guide interaction. Do not mark behavioral acceptance PASS yet.
