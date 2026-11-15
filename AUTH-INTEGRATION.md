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
