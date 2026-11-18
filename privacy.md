---
layout: page
title: "Privacy & Data Notice"
permalink: /privacy.html
---


# Privacy & Data Notice

Last updated: 14 November 2026


### 1. Overview

BOMYRA — AI Chat Saver & Exporter runs in your browser on supported chat websites. Exports and selection processing are performed locally unless you explicitly choose a feature that contacts the relevant chat platform, media host, local model server, or cloud AI provider. The extension package has no developer-operated content relay for AI summaries.

### 2. Data stored in your browser profile

The extension uses `chrome.storage.local` for:

* Preferences such as language, provider selection, model names, custom summary prompt, and optional remote selectors URL.
* The optional Anthropic workspace ID, provider-consent flags and timestamps, and the local archive of up to 50 entries. Each archive entry contains a shortened title, type/template, date, and up to approximately 500 characters of saved output/content.

Gemini, OpenAI, and Anthropic API keys, plus the optional local-model authentication token, are stored in `chrome.storage.session` rather than persistent local storage. Chrome clears this session storage when the browser restarts or the extension is disabled, reloaded, or updated, so you must enter these credentials again after those events. This reduces how long credentials remain on the device; it is **not encryption**. Malware or compromised extension code may still access a credential while the extension is active and using it. Access to session storage is restricted to trusted extension contexts.

Other local preferences and archive data are not end-to-end encrypted by this extension. Someone with access to your browser profile or malware running as your user may be able to access those persistent values. Do not use API keys on shared or untrusted devices.

### 3. What leaves your device

**Cloud AI summaries (Gemini, OpenAI, Claude):** only after the provider is enabled, its separate consent has been accepted, and you request a cloud summary. The selected message text and your custom summarization prompt are sent directly from the browser to the selected provider API. Your API key is sent as authentication. If configured, the optional Anthropic workspace ID is sent only with Claude requests. Cloud summary requests have no fixed extension-side timeout; you can cancel an active request from the result panel. The extension may retry explicit rate-limit/overload rejections, HTTP 503, and Anthropic `api_error` 500 responses up to two times, while avoiding ambiguous network/timeout and generic server failures that could duplicate provider work. Images and file attachments are not included in this summary request. The provider processes submitted content under its own terms, account type, and settings. The extension cannot control provider retention, human review, or model-training practices.

**Local model summaries:** selected message text is sent to the loopback API server you configured (`localhost`, `127.0.0.1`, or `::1`). Ollama context length (`num_ctx`) is a user-configurable local setting (2,048–262,144; default 8,192); larger values may increase local memory use. The extension rejects non-loopback URLs for this local-provider path and does not automatically fall back to a cloud provider. The local runtime is separate software and may maintain its own logs or data.

**Chat-site retrieval:** Select All flows may make requests to the currently open chat platform using your signed-in browser session to retrieve conversation data. When PDF timestamp metadata is missing from manually selected ChatGPT messages, the PDF export can make the same-origin lookup as a best-effort attempt to attach source-provided creation times. On ChatGPT, the extension may read the short-lived `accessToken` returned by the same-origin `/api/auth/session` endpoint and attach it as a Bearer authorization header to same-origin ChatGPT conversation API requests. The token is held only in the active operation's memory; this code path does not save it in extension storage or send it to Gemini, OpenAI, Anthropic, or another external host. If a stable message match and valid source time are unavailable, the timestamp is omitted. The destination is ChatGPT itself; its own privacy policy and terms apply.

**Manual-selection source metadata (ChatGPT and Claude):** When a manual-selection export includes independently selected images alongside selected messages, BOMYRA may retrieve source conversation metadata directly from the currently open ChatGPT or Claude website using same-origin HTTPS requests and the browser's existing signed-in session. On ChatGPT, it may read the short-lived `accessToken` from the same-origin `/api/auth/session` endpoint and use it only for same-origin conversation API requests. It may try the same-origin `/backend-api/conversation/{id}`, `/backend-api/conversations/{id}`, or `/backend-api/conversations/{id}/messages` endpoint. On Claude, it may request the current conversation from the same-origin `/api/organizations/{organization_id}/chat_conversations/{conversation_id}` endpoint using the current conversation and organization identifiers. The responses are analyzed locally to match selected messages and selected image items using a unique source message ID or, when unique, role plus exact normalized message text. **The platform response may contain message text from the current conversation, including messages you did not select; BOMYRA reads this response transiently in the active operation's memory to perform matching. That response is not saved to extension storage or the local archive, is not sent to cloud summary providers or an extension-developer server, and unselected message text is not included in your export.** An image is matched only through an explicit stable media identifier or exact URL identity found in image-typed source data; filenames, alt text, and nearby page elements are not used as identity. Timeline order is accepted only from the active conversation ancestry, explicit API indices, or complete source timestamps. Unknown array order is not assumed to be reliable. This resolver retrieves metadata only; it does not download image bytes. If a source response is available but no unique media match or reliable order can be established, the image remains unassociated. The DOM-position fallback is used only when the provider API request could not be completed. The owner message's text is not added to the export unless that message's own checkbox is selected. The ChatGPT token remains in active-operation memory and is not saved in extension storage or sent to a cloud summary provider or another host. These requests go to ChatGPT or Claude themselves and are subject to their respective terms and privacy policies; their undocumented endpoints may change.

**ChatGPT Resource Timing metadata:** for generated-image discovery, the extension reads the current page's browser-provided Resource Timing entries (`performance.getEntriesByType('resource')`). It considers only completed same-origin `fetch`/XHR entries for ChatGPT's Estuary content path, and retains the opaque file ID and timing order only. It does not read response bodies through Resource Timing, issue a request to those URLs, or send these timing entries or IDs to a cloud summary provider.

**Images and attachments during export:** when you choose an export that includes media, the extension may fetch images/files from the chat platform or its media hosts and save them into the export on your device. These media are not included in cloud summary requests by this feature. Unsupported attachments may be listed by name or retained as links, depending on what the page exposes.

**Optional remote selectors:** if you enter a selectors URL, Chrome asks you to grant optional host access to that exact HTTPS origin before the extension can download it. The request omits credentials and rejects redirects; only a JSON response up to 256 KiB is accepted. The host can observe the request. Conversation text and chat cookies are not sent with it. The downloaded file is treated as data, validated field by field, and not executed as code. Local/IP hosts, custom ports, URL credentials, and fragments are rejected. Clearing all extension data or removing/changing the URL revokes the previously granted origin permission where applicable.

### 4. Local archive behavior

Some generated summaries and export/context outputs are saved automatically to the local archive. The archive is limited to 50 entries and stores up to approximately 500 characters of content per entry. You can delete the archive separately from Settings → Privacy & Data, revoke cloud consents without deleting keys, or delete all extension storage. Exported files already downloaded to your computer are outside extension storage and are not removed by these controls.

### 5. Provider terms

Provider policies and retention practices may change and may differ between free and paid API usage. Review the current terms before sending content:

* Google Gemini API: https://ai.google.dev/terms
* OpenAI API data usage policies: https://openai.com/policies/api-data-usage-policies/
* Anthropic commercial terms: https://www.anthropic.com/legal/commercial-terms

Do not send passwords, financial identifiers, confidential business information, or other sensitive content unless you have assessed the provider terms and have permission to share it.

### 6. Permissions and network destinations

The extension uses Chrome storage for settings and local archive; supported chat-site access for message selection/retrieval; media-host access for exports that include images/files; provider API access for explicitly requested cloud summaries; and loopback access for local model discovery and summarization. Optional remote selectors are fetched only when configured and after the user grants host access to that exact origin; they do not use a broad permanent host permission. No content relay to an extension-developer server is configured in this package.

### 7. Your controls

* Disable each cloud provider in Settings → AI Providers.
* Revoke all saved cloud consents in Settings → Privacy & Data. The next cloud summary attempt asks for consent again.
* Delete only the local archive in Settings → Privacy & Data.
* Delete all extension data in Settings → Privacy & Data. This removes extension settings, stored API keys/tokens, archive entries, provider enablement, and consent flags from this browser profile. It does not delete downloaded exports, chat-site data, provider-side data, browser history/download records, or local model runtime logs.
* Uninstalling the extension removes its extension storage according to Chrome's behavior.

### 8. Contact

Questions about this notice, privacy requests, or product support can be sent to [seddev213@gmail.com](mailto:seddev213@gmail.com).
