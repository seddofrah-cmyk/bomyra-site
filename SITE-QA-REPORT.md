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
- The homepage dialog is informational only: it contains no account-linking, pairing, sign-in redirect, or extension-connect navigation.
- Replaced the former retry action with a Close guide button. Account connection and account switching are performed only inside the BOMYRA extension.
- Did not change the extension repository, pairing flow, Workers, backend, or production settings.

## Not completed — waiting for official store URL
- The website does not initiate extension installation or account linking. Any future installation CTA requires a confirmed official store listing and a separate approved change.

## Verification status
- Source changes prepared on an isolated feature branch.
- Browser interaction and visual rendering have not yet been tested.
- No Cloudflare Pages deployment, merge, or production release was performed.
