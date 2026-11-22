# BOMYRA Site — QA / Work Report

Updated: 2026-11-22
Branch: `feature/site-signin-visual-guide`
Base commit: `7ed11b1d1e5afe77c3d5299abb4cbee0de3da9fe`

## Completed in this change
- Reworked the homepage Sign in / Get Started onboarding dialog into a visual, two-step guide.
- Step 1 highlights the `Connect BOMYRA account` control at the bottom of the extension panel.
- Step 2 highlights the `BOMYRA accounts` menu and `Add account` action.
- Added the account-isolation note: each account keeps its own plan and quota; switching does not transfer a subscription.
- Used only the relevant portions of the two user-provided screenshots.
- Kept the existing preview retry destination and its offline-preview behavior unchanged.
- Did not change the extension repository, pairing flow, Workers, backend, or production settings.

## Not completed — waiting for official store URL
- The `Install BOMYRA` button is intentionally disabled and is not wired to a destination.
- Add the official Chrome Web Store URL to this button only after the extension's store listing is available and the URL is confirmed.
- Do not substitute an unofficial or guessed download URL.

## Verification status
- Source changes prepared on an isolated feature branch.
- Browser interaction and visual rendering have not yet been tested.
- No Cloudflare Pages deployment, merge, or production release was performed.
