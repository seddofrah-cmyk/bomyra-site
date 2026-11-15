# BOMYRA Supabase Auth integration

The account UI is a static GitHub Pages addition and uses Supabase Auth from the browser.

## Routes
- `/auth/` — sign in and create account
- `/auth/callback/` — email confirmation return page

## Browser configuration
Edit `auth/config.js` and replace:
Project URL and the Supabase publishable key have been configured in `auth/config.js`.

Only the publishable/anon key may be used in browser code. Never use the `service_role` key, Paddle API key, webhook secret, or any other server secret here.

## Supabase dashboard
In Authentication → URL Configuration:
- Site URL: `https://seddofrah-cmyk.github.io/bomyra-site/`
- Add this exact Redirect URL: `https://seddofrah-cmyk.github.io/bomyra-site/auth/callback/`

Keep email confirmation enabled. The account page requests that confirmation links return to the callback route.

## Important boundary
The account UI is not yet connected to the Paddle checkout endpoint. Do not enable paid subscriptions or grant Pro access based on browser state. The next integration step is to require an authenticated Supabase session when starting checkout, call the server-side checkout endpoint, and pass the verified Supabase user ID into Paddle transaction custom data. Subscription access must still be granted only by the signed server-side Paddle webhook.

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
