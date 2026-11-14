# BOMYRA Paddle Sandbox demo

This is a static Jekyll-compatible addition for the existing `bomyra-site` repository.

## Files
- `pricing/index.html` — bilingual English/Arabic plan selector.
- `pay/index.html` — Paddle.js Sandbox checkout launcher.
- `pay/success/index.html` — post-checkout confirmation page (does not activate Pro access).

## Existing subscription setup to preserve
- Pro Monthly: USD 5.99 / month
- Pro Yearly: USD 39.99 / year
- Paddle environment: Sandbox only
- Checkout: one-page Paddle checkout
- Payment methods configured in Paddle: Cards, PayPal, Apple Pay, Google Pay
- Bancontact: off
- Saved cards: off
- Marketing consent: off
- Discounts: off
- Recovery: on
- Statement descriptor: BOMYRA

## Required configuration
Edit `pay/index.html` and replace:
- `PASTE_SANDBOX_CLIENT_SIDE_TOKEN_HERE` with the existing Paddle Sandbox client-side token (`test_...`)
- `PASTE_PRO_MONTHLY_PRICE_ID_HERE` with the active monthly Sandbox price ID (`pri_...`)
- `PASTE_PRO_YEARLY_PRICE_ID_HERE` with the active yearly Sandbox price ID (`pri_...`)

Only the Paddle **client-side token** belongs in this browser file. Never put an API secret in the repository or browser code.

## Deploy
Copy the three directories into the root of `seddofrah-cmyk/bomyra-site` and commit them to `main`. GitHub Pages is configured for Jekyll from the repository root.

Expected routes:
- `/pricing/`
- `/pay/?plan=monthly`
- `/pay/?plan=yearly`
- `/pay/success/`

## Important production boundary
This is a Sandbox-only checkout demonstration. A successful redirect is not proof that a subscription is active. Before production, implement a server-side Paddle webhook endpoint, verify Paddle's webhook signature, map the verified customer/subscription to a BOMYRA account, and grant/revoke Pro entitlements from verified subscription events. Do not rely on the browser success page for access control.
