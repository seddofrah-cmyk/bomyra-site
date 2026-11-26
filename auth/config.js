/*
 * BOMYRA Supabase browser configuration.
 * Safe for the browser ONLY with the Supabase publishable/anon key.
 * Never place the service_role key or any server secret in this file.
 */
window.BOMYRA_SUPABASE_URL = "https://vagxeweqihibhcqnsnbe.supabase.co";
window.BOMYRA_SUPABASE_ANON_KEY = "sb_publishable_m3rsQdRt1pFFuSzYiKagiw_kGbeYw56";
// QA checkout runs through the isolated Cloudflare Billing Worker.
window.BOMYRA_CHECKOUT_API_URL = ""; // Billing remains disabled until the final Paddle Production cutover.
