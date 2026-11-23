/*
 * BOMYRA production-candidate browser configuration.
 * The Supabase publishable key is intended for public browser use.
 * Never place service_role, Supabase secret, Paddle API, or webhook keys here.
 */
window.BOMYRA_SITE_ENVIRONMENT = "production-candidate";
window.BOMYRA_SUPABASE_URL = "https://vagxeweqihibhcqnsnbe.supabase.co";
window.BOMYRA_SUPABASE_ANON_KEY = "sb_publishable_m3rsQdRt1pFFuSzYiKagiw_kGbeYw56";

// Production Cloudflare services are intentionally unset until deployed and verified.
// Checkout and extension approval must stay unavailable rather than fall back to QA/Vercel.
window.BOMYRA_CHECKOUT_API_URL = "";
window.BOMYRA_EXTENSION_PAIR_APPROVE_API_URL = "";
