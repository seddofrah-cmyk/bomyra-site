/*
 * BOMYRA Supabase browser configuration.
 * Safe for the browser ONLY with the Supabase publishable/anon key.
 * Never place the service_role key or any server secret in this file.
 */
window.BOMYRA_SUPABASE_URL = "https://xbtcmfstzpculiqckvnc.supabase.co";
window.BOMYRA_SUPABASE_ANON_KEY = "sb_publishable_6e1xeqY5XUSn2ZTG-3aIKw_a4CdKdoP";
// QA checkout runs through the isolated Cloudflare Billing Worker.
window.BOMYRA_CHECKOUT_API_URL = "https://bomyra-billing-qa-v2.seddofrah.workers.dev/api/paddle/checkout";
