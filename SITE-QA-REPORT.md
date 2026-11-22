# BOMYRA Site — QA / Work Report

Updated: 2026-11-22 (Africa/Algiers)
Repository: `seddofrah-cmyk/bomyra-site`
Working branch: `feature/site-signin-visual-guide`
Latest recorded commit: `4d5d1c002cbde6d8736387588fb8a8cc0637f11e`

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
- Cloudflare API inspection for deployment `0ab62c71-ccb1-4553-b596-b261647e7df5` showed queued, initialize, and clone_repo successful, while build remained reported as active. A separate automated fetch returned 404 for the page and image despite the user's browser screenshot showing the page. These conflicting signals are recorded, not silently reconciled. The browser screenshot establishes that the user could view the page at that time; the Cloudflare API/fetch verification remains unresolved.

## Deferred work — keep open

1. **Homepage Get Started behavior:** review its behavior and destination in a separate task. It was intentionally not changed during this visual-guide pass. Do not treat it as finalized.
2. **Official extension store URL / installation CTA:** still waiting for the confirmed official store listing. Do not add an installation CTA or guess a destination before the URL is confirmed and the change is separately approved.

## Verification and release boundary

- Working branch remains isolated: `feature/site-signin-visual-guide`.
- Latest source change commit: `4d5d1c002cbde6d8736387588fb8a8cc0637f11e` — `Use the single replacement sign-in guide image`.
- Cloudflare Pages project: `bomyra-site-preview`; deployment ID: `0ab62c71-ccb1-4553-b596-b261647e7df5`.
- User screenshot confirms the guide is visible in the browser. Cloudflare API deployment completion and independent asset-fetch verification are not yet confirmed.
- No merge to the production branch and no production deployment were performed.
- Do not modify the extension pairing/login flow, Workers, backend, Supabase, billing, or production settings as part of this site-only task.
