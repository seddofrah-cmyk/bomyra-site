# BOMYRA Production Auth + Cloudflare Extension integration

The account UI is a static Cloudflare Pages site and uses the Production Supabase project from the browser. Extension account, pairing, entitlement, and export requests use the Cloudflare Production Entitlements Worker. Billing remains disconnected until the final Paddle Production cutover.

## Routes

- `/auth/` — sign in and create account
- `/auth/callback/` — email confirmation return page
- `/extension/connect/` — Production account-confirmation page opened only by extension-initiated pairing
- `/pay/` — checkout page currently unavailable pending Paddle Production cutover

## Browser configuration

`auth/config.js` contains only:
- The Supabase project URL
- The Supabase publishable/anon key
- The public Cloudflare checkout endpoint URL

Never place the Supabase `service_role` key, Paddle API key, Paddle webhook secret, or other server secrets in browser code or Git.

The checkout endpoint is intentionally unset until the final Paddle Production cutover.

The extension pairing and entitlement endpoint is:
`https://bomyra-entitlements-prod.seddofrah.workers.dev`

## Supabase dashboard

In Authentication → URL Configuration:
- Site URL: `https://bomyra-site.pages.dev/bomyra-site/`
- Add this exact Redirect URL: `https://bomyra-site.pages.dev/bomyra-site/auth/callback/`

Keep email confirmation enabled. The account page requests that confirmation links return to the callback route.

## Extension account pairing

1. The extension requests a short-lived pairing code from `POST /api/extension/pair/start` on the Cloudflare Entitlements Production Worker.
2. The Worker stores only the SHA-256 hash of that code and returns the approval URL at `/extension/connect/?code=…`.
3. The approval page checks the existing Supabase browser session. If the user is signed out, it sends them through `/auth/` and returns to the approval page afterward.
4. The page sends only the one-time pairing code and the signed-in user's Supabase access token to `POST /api/extension/pair/approve`.
5. The extension polls `POST /api/extension/pair/poll` and receives an opaque 30-day extension session token once. The Worker stores only the token's SHA-256 hash.

The pairing code expires after 10 minutes. The page removes it from the address bar after reading it and uses a no-referrer policy. Account linking does not send conversation content. Keep the Supabase publishable key in the browser; all service-role credentials and signing secrets remain server-side in Cloudflare Worker secrets.

The Worker also exposes account inspection/revocation, entitlement lookup, and export reservation/completion/release endpoints.

## Production billing (pending final cutover)

The public checkout route is intentionally unavailable during the Production account and extension cutover. The browser checkout endpoint remains unset. Do not send Production Supabase access tokens to either QA Billing Worker.

Paddle Production will be configured only in the final billing step, after the Production Billing Worker, Live API key, Live webhook secret, monthly/yearly price IDs, and notification destination have been confirmed. No Live billing credentials or identifiers are stored in browser code or Git.

When enabled, the browser must send only the signed-in Supabase access token and selected plan key to the Production Billing Worker. The Worker must resolve the user identity and price server-side and create the Paddle transaction. Only the signed Paddle webhook may activate or change Pro access; a browser success page or Paddle.js event is not proof of an active subscription.

## Vercel isolation

The published extension approval page uses the Cloudflare Production Entitlements Worker. Checkout remains disabled until the final Paddle Production cutover. The former Vercel backend is not a dependency of these browser flows. Keep the Vercel project disabled after the Cloudflare webhook destination has been verified; do not restore its secrets or route browser requests back to it.
