# BOMYRA Supabase Auth integration

The account UI is a static GitHub Pages addition and uses Supabase Auth from the browser.

## Routes
- `/auth/` — sign in and create account
- `/auth/callback/` — email confirmation return page
- `/extension/connect/` — authenticated approval page for connecting the browser extension

## Browser configuration
Edit `auth/config.js` and replace:
Project URL and the Supabase publishable key have been configured in `auth/config.js`.

Only the publishable/anon key may be used in browser code. Never use the `service_role` key, Paddle API key, webhook secret, or any other server secret here.

## Supabase dashboard
In Authentication → URL Configuration:
- Site URL: `https://seddofrah-cmyk.github.io/bomyra-site/`
- Add this exact Redirect URL: `https://seddofrah-cmyk.github.io/bomyra-site/auth/callback/`

Keep email confirmation enabled. The account page requests that confirmation links return to the callback route.

## Browser extension account pairing

1. The extension requests a short-lived pairing code from `POST /api/extension/pair/start`.
2. The backend stores only the SHA-256 hash of that code and returns the public approval URL at `/extension/connect/?code=…`.
3. The approval page checks the existing Supabase browser session. If the user is signed out, it sends them through `/auth/` and returns to the approval page afterward.
4. The page sends only the one-time pairing code and the signed-in user's Supabase access token to `POST /api/extension/pair/approve`.
5. The extension polls `POST /api/extension/pair/poll` and receives an opaque 30-day extension session token once. The backend stores only the token's SHA-256 hash.

The pairing code expires after 10 minutes. The page removes it from the address bar after reading it and uses a no-referrer policy. Account linking does not send conversation content. Keep the Supabase publishable key in the browser; all service-role credentials and signing secrets remain server-side.

## Important boundary
The account and checkout pages use Supabase Auth, but checkout remains disabled until the production backend URL and required Vercel Sandbox environment variables are configured. Do not grant Pro access based on browser state. Subscription access must be granted only by the signed server-side Paddle webhook.

## Paddle Sandbox checkout integration

The checkout page now requires a Supabase session and calls the server-side endpoint. It does not send a user UUID or a Paddle price ID from the browser.

Before enabling the flow:
1. Set `BOMYRA_CHECKOUT_API_URL` in `auth/config.js` to the exact deployed backend URL ending in `/api/paddle/checkout`.
2. Deploy the backend checkout endpoint from the `bomyra-backend` repository.
3. In Vercel, configure server-only `PADDLE_API_KEY` using a Paddle Sandbox API key with transaction write permission. Do not put this key in this repository or in browser code.
4. Confirm `PADDLE_ENVIRONMENT=sandbox`, `PADDLE_MONTHLY_PRICE_ID`, and `PADDLE_YEARLY_PRICE_ID` are set in the backend Vercel environment and match the Paddle Sandbox catalog.
5. Confirm `CHECKOUT_ALLOWED_ORIGINS=https://seddofrah-cmyk.github.io`.

The checkout page sends the current Supabase access token and the selected plan key (`monthly` or `yearly`). The backend validates the token, resolves the UUID from Supabase Auth, creates the Paddle Sandbox transaction with `custom_data.user_id`, and returns its transaction ID. Paddle.js opens that server-created transaction.

Only the signed Paddle webhook can activate or change Pro access. A browser success page or Paddle.js event is not proof of an active subscription. Keep all Paddle API secrets and the Supabase service-role key server-side.
