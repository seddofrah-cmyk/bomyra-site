# BOMYRA — AI Chat Saver & Exporter | Privacy & Data Notice

Last updated: 14 November 2026

## English

### 1. Overview

BOMYRA — AI Chat Saver & Exporter runs in your browser on supported chat websites. Exports and selection processing are performed locally unless you explicitly choose a feature that contacts the relevant chat platform, media host, local model server, or cloud AI provider. The extension package has no developer-operated content relay for AI summaries.

### 2. Data stored in your browser profile

The extension uses `chrome.storage.local` for:

- Preferences such as language, provider selection, model names, custom summary prompt, and optional remote selectors URL.
- The optional Anthropic workspace ID, provider-consent flags and timestamps, and the local archive of up to 50 entries. Each archive entry contains a shortened title, type/template, date, and up to approximately 500 characters of saved output/content.

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

- Google Gemini API: https://ai.google.dev/terms
- OpenAI API data usage policies: https://openai.com/policies/api-data-usage-policies/
- Anthropic commercial terms: https://www.anthropic.com/legal/commercial-terms

Do not send passwords, financial identifiers, confidential business information, or other sensitive content unless you have assessed the provider terms and have permission to share it.

### 6. Permissions and network destinations

The extension uses Chrome storage for settings and local archive; supported chat-site access for message selection/retrieval; media-host access for exports that include images/files; provider API access for explicitly requested cloud summaries; and loopback access for local model discovery and summarization. Optional remote selectors are fetched only when configured and after the user grants host access to that exact origin; they do not use a broad permanent host permission. No content relay to an extension-developer server is configured in this package.

### 7. Your controls

- Disable each cloud provider in Settings → AI Providers.
- Revoke all saved cloud consents in Settings → Privacy & Data. The next cloud summary attempt asks for consent again.
- Delete only the local archive in Settings → Privacy & Data.
- Delete all extension data in Settings → Privacy & Data. This removes extension settings, stored API keys/tokens, archive entries, provider enablement, and consent flags from this browser profile. It does not delete downloaded exports, chat-site data, provider-side data, browser history/download records, or local model runtime logs.
- Uninstalling the extension removes its extension storage according to Chrome's behavior.

### 8. Contact

Questions about this notice, privacy requests, or product support can be sent to [seddev213@gmail.com](mailto:seddev213@gmail.com).

## العربية

### 1. نظرة عامة

تعمل BOMYRA — AI Chat Saver & Exporter داخل المتصفح على مواقع المحادثات المدعومة. تتم عمليات التحديد والتصدير محليًا، باستثناء الميزات التي تختارها صراحةً وتتصل بموقع المحادثة أو خادم الوسائط أو خادم نموذج محلي أو مزوّد ذكاء اصطناعي سحابي. لا تحتوي الحزمة على خادم وسيط تابع للمطوّر لتمرير طلبات التلخيص.

### 2. البيانات المخزنة في ملف المتصفح

تستخدم الإضافة `chrome.storage.local` لحفظ التفضيلات مثل اللغة والمزوّد والنموذج وأمر التلخيص الاختياري ورابط المحددات، ومعرّف مساحة عمل Anthropic الاختياري، وموافقات كل مزوّد سحابي وتوقيت آخر موافقة، والأرشيف المحلي بحد أقصى 50 عنصرًا. يحتوي كل عنصر أرشيف على عنوان مختصر ونوع العملية والقالب والتاريخ وما يصل إلى نحو 500 حرف من المحتوى.

تُحفظ مفاتيح API الخاصة بـ Gemini وOpenAI وAnthropic، إضافة إلى رمز المصادقة الاختياري لخادم النموذج المحلي، في `chrome.storage.session` بدل التخزين المحلي الدائم. يمسح Chrome مساحة الجلسة عند إعادة تشغيل المتصفح أو تعطيل الإضافة أو إعادة تحميلها أو تحديثها؛ لذلك يجب إدخال بيانات الاعتماد مجددًا بعد ذلك. يقلل هذا الأسلوب مدة بقاء المفاتيح على الجهاز، لكنه **ليس تشفيرًا**. قد تتمكن البرمجيات الضارة أو شيفرة الإضافة المخترقة من الوصول إلى بيانات الاعتماد أثناء نشاط الإضافة واستخدامها. ويقتصر الوصول إلى مساحة الجلسة على سياقات الإضافة الموثوقة.

عند تحديد صور ChatGPT المولّدة للتصدير، تُخزّن بايتات الصور مؤقتًا في IndexedDB تحت أصل موقع المحادثة نفسه (مثل `chatgpt.com`) كي تبقى متاحة بعد اختفاء عناصر DOM أثناء التمرير. يؤدي إلغاء تحديد الصورة إلى حذف سجلها؛ ويطلب خيار «حذف جميع البيانات» من تبويبات الدردشة المفتوحة حذف قواعد الوسائط التابعة لأصولها. يحتفظ الخيار بمؤشر تنظيف صغير لكل أصل موقع مدعوم غير مفتوح، ليحذف سكربت الإضافة ذاكرته عند زيارة الموقع لاحقًا. إذا كانت قاعدة البيانات مشغولة، يبقى التنظيف معلقًا لمحاولة لاحقة. لا تُرسل هذه الذاكرة المؤقتة إلى مزود التلخيص.

لا توفر الإضافة تشفيرًا شاملًا للتفضيلات والأرشيف والذاكرة المؤقتة المحفوظة بصورة دائمة. وقد يتمكن من يصل إلى ملف المتصفح أو برنامج ضار يعمل بصلاحيات المستخدم من الوصول إلى تلك البيانات. أما مفاتيح API ورمز النموذج المحلي فهما مؤقتان في مساحة الجلسة، لكنهما غير مشفرين وقد ينكشفان أثناء استخدامهما على جهاز مخترق. لا تدخل مفاتيح API على جهاز مشترك أو غير موثوق.

### 3. ما الذي يغادر جهازك

**التلخيص السحابي (Gemini وOpenAI وClaude):** لا يحدث إلا بعد تفعيل المزوّد وقبول موافقته المنفصلة وطلبك التلخيص السحابي. يُرسل نص الرسائل المحددة وتعليمات التلخيص المخصصة مباشرة من المتصفح إلى واجهة API الخاصة بالمزوّد المختار، ويُرسل مفتاح API للمصادقة. لا تفرض الإضافة إلغاءً تلقائيًا بحسب الوقت؛ تعرض تنبيهات انتظار عند 60 و120 و300 ثانية وتتيح الإلغاء اليدوي. وقد تعيد المحاولة تلقائيًا في حالات محددة من تحديد المعدل أو ضغط المزود، مع عدد محدود واحترام Retry-After؛ ولا تعيد تلقائيًا أخطاء التنفيذ الملتبسة لتجنب الطلبات المكررة. إذا أدخلت معرّف مساحة عمل Anthropic، يُرسل فقط إلى Anthropic مع طلبات Claude. لا تُرفق الصور والملفات بطلب التلخيص. يعالج المزوّد البيانات وفق شروطه ونوع حسابك وإعداده؛ ولا تتحكم الإضافة في مدة الاحتفاظ أو المراجعة البشرية أو استخدام البيانات لتدريب النماذج.

**النماذج المحلية:** يُرسل نص الرسائل المحددة إلى واجهة الخادم المحلي التي ضبطتها (`localhost` أو `127.0.0.1` أو `::1`). يرفض مسار النماذج المحلية العناوين غير المحلية ولا ينتقل تلقائيًا إلى مزوّد سحابي. في Ollama يمكن ضبط `num_ctx` من الإعدادات (2048–262144، الافتراضي 8192)، وقد تزيد القيم الكبيرة استهلاك الذاكرة. قد يحتفظ برنامج تشغيل النموذج المحلي بسجلاته وفق إعداده.

**استرجاع بيانات المحادثة:** قد تنفذ عمليات «تحديد الكل» طلبات إلى موقع المحادثة المفتوح حاليًا باستخدام جلسة تسجيل الدخول في المتصفح لاسترجاع الرسائل. وعند تصدير PDF لرسائل ChatGPT المحددة يدويًا، إذا كانت أوقات الإنشاء غير موجودة في DOM، فقد تحاول الإضافة جلب بيانات التوقيت من واجهة المحادثة ذات الأصل نفسه. في ChatGPT، قد تقرأ الإضافة رمز `accessToken` قصير العمر الذي تعيده نقطة النهاية `/api/auth/session` ذات الأصل نفسه، ثم تضعه في ترويسة Bearer لطلبات واجهة المحادثة. يبقى الرمز في ذاكرة العملية النشطة فقط؛ ولا يحفظه هذا المسار في تخزين الإضافة ولا يرسله إلى Gemini أو OpenAI أو Anthropic أو أي مضيف خارجي آخر. لا يُضاف الوقت إلا عند تطابق الرسالة بصورة موثوقة وتوفر وقت صالح من المصدر؛ وإلا يُترك فارغًا. تذهب الطلبات إلى ChatGPT نفسه وتخضع لسياساته وشروطه.

**بيانات المصدر للتحديد اليدوي (ChatGPT وClaude):** عندما يتضمن تصدير التحديد اليدوي صورًا مستقلة محددة إلى جانب رسائل محددة، قد تسترجع BOMYRA البيانات الوصفية لمصدر المحادثة مباشرةً من موقع ChatGPT أو Claude المفتوح حاليًا، عبر طلبات HTTPS من الأصل نفسه وباستخدام جلسة تسجيل الدخول الحالية في المتصفح. في ChatGPT، قد تقرأ الإضافة رمز `accessToken` قصير العمر من نقطة النهاية `/api/auth/session` ذات الأصل نفسه، وتستخدمه فقط مع طلبات واجهة المحادثة من الأصل نفسه. وقد تجرّب نقاط النهاية `/backend-api/conversation/{id}` أو `/backend-api/conversations/{id}` أو `/backend-api/conversations/{id}/messages` من الأصل نفسه. وفي Claude، قد تطلب المحادثة الحالية من نقطة النهاية `/api/organizations/{organization_id}/chat_conversations/{conversation_id}` ذات الأصل نفسه، باستخدام معرّفي المحادثة والمؤسسة الحاليين. تُحلل الاستجابات محليًا لمطابقة الرسائل المحددة وعناصر الصور المحددة، باستخدام معرّف مصدر فريد للرسالة أو، عندما يكون فريدًا، الدور مع نص الرسالة المطابق تمامًا بعد التطبيع. **وقد تتضمن استجابة المنصة نصوص رسائل من المحادثة الحالية، بما فيها رسائل لم تحددها؛ وتقرأ BOMYRA هذه الاستجابة مؤقتًا في ذاكرة العملية النشطة لإجراء المطابقة. لا تُحفظ الاستجابة في تخزين الإضافة أو الأرشيف المحلي، ولا تُرسل إلى مزوّدي التلخيص السحابي أو خادم تابع لمطوّر الإضافة، ولا يُدرج نص الرسائل غير المحددة في ملف التصدير.** ولا تُطابق الصورة إلا بواسطة معرّف وسائط ثابت وصريح أو هوية رابط مطابقة تمامًا موجودة في بيانات مصدر مصنفة كصورة؛ ولا تُستخدم أسماء الملفات أو النصوص البديلة أو العناصر القريبة في الصفحة بوصفها هوية للصورة. لا يُقبل ترتيب التسلسل الزمني إلا إذا استند إلى شجرة المحادثة النشطة أو مؤشرات API صريحة أو طوابق زمنية كاملة من المصدر؛ ولا يُفترض أن ترتيب المصفوفات المجهول موثوق. يسترجع هذا المسار البيانات الوصفية فقط ولا ينزّل بايتات الصور. إذا كانت استجابة المصدر متاحة لكن تعذر إثبات مطابقة فريدة للوسائط أو ترتيب موثوق، تبقى الصورة غير مرتبطة. ولا يُستخدم الترتيب الاحتياطي القائم على موضع DOM إلا عندما يتعذر إكمال طلب API الخاص بالمنصة. لا يُضاف نص الرسالة المالكة للصورة إلى التصدير إلا إذا تم تحديد مربع اختيار الرسالة نفسها. يبقى رمز ChatGPT في ذاكرة العملية النشطة ولا يُحفظ في تخزين الإضافة ولا يُرسل إلى مزوّد تلخيص سحابي أو مضيف آخر. تذهب هذه الطلبات إلى ChatGPT أو Claude نفسيهما، وتخضع لشروطهما وسياساتهما؛ وقد تتغير نقاط النهاية غير الموثقة التي تستخدمها المنصات.

**بيانات Resource Timing في ChatGPT:** لاكتشاف الصور المولّدة، تقرأ الإضافة سجلات Resource Timing التي يوفرها المتصفح للصفحة الحالية (`performance.getEntriesByType('resource')`). تقتصر على طلبات `fetch`/XHR المكتملة من الأصل نفسه إلى مسار محتوى Estuary في ChatGPT، ولا تحتفظ إلا بمعرّف الملف المعتم المعنى وترتيب التوقيت. لا تقرأ أجسام الاستجابات عبر Resource Timing، ولا تنفذ طلبًا إلى تلك الروابط، ولا ترسل سجلات التوقيت أو المعرّفات إلى مزوّد تلخيص سحابي.

**الصور والمرفقات عند التصدير:** عند اختيار تصدير يتضمن الوسائط، قد تجلب الإضافة الصور والملفات من موقع المحادثة أو مضيف الوسائط وتحفظها ضمن ملف التصدير على جهازك. لا تُضمّن هذه الوسائط في طلبات التلخيص السحابي عبر هذه الميزة. قد تُدرج المرفقات غير القابلة للتنزيل بالاسم أو تبقى كرابط وفق ما تعرضه الصفحة.

**المحددات عن بُعد:** إذا أدخلت رابطًا، ينزّل الإضافة ملف JSON عبر HTTPS من ذلك العنوان. يستطيع مضيف الرابط رؤية طلب التنزيل، لكن لا يُرسل نص المحادثة معه. يُعامل الملف كبيانات ويتم التحقق منه ولا يُنفذ ككود.

### 4. الأرشيف المحلي

قد تحفظ بعض الملخصات ومخرجات التصدير/نقل السياق تلقائيًا في الأرشيف المحلي. الحد الأقصى 50 عنصرًا، ويُحفظ ما يصل إلى نحو 500 حرف من المحتوى لكل عنصر. يمكنك حذف الأرشيف وحده، أو سحب موافقات الخدمات السحابية دون حذف المفاتيح، أو حذف كل بيانات الإضافة. الملفات التي سبق تنزيلها إلى جهازك ليست ضمن تخزين الإضافة ولا تحذفها هذه الخيارات.

### 5. شروط مزوِّدي الخدمة

قد تختلف سياسات المزوِّدين والاحتفاظ بالبيانات بين الاستخدام المجاني والمدفوع وقد تتغير. راجع الشروط الحالية قبل إرسال المحتوى:

- Google Gemini API: https://ai.google.dev/terms
- OpenAI API: https://openai.com/policies/api-data-usage-policies/
- Anthropic: https://www.anthropic.com/legal/commercial-terms

لا ترسل كلمات المرور أو البيانات المالية أو معلومات العمل السرية أو أي محتوى حساس إلا بعد تقييم شروط المزوّد والتأكد من امتلاكك صلاحية مشاركته.

### 6. الصلاحيات والوجهات الشبكية

تستخدم الإضافة تخزين Chrome للإعدادات والأرشيف، والوصول إلى مواقع المحادثات المدعومة لتحديد الرسائل واسترجاعها، ومضيفات الوسائط للتصدير الذي يتضمن صورًا وملفات، وواجهات المزوِّدين عند طلب التلخيص السحابي صراحةً، وعناوين loopback لاكتشاف النماذج المحلية وتلخيصها. لا تنزّل المحددات عن بعد إلا عند ضبط رابطها. لا يوجد في هذه الحزمة خادم وسيط تابع للمطوّر لتمرير محتوى التلخيص.

### 7. خياراتك

- عطّل كل مزوّد سحابي من صفحة «مزوّدو الذكاء الاصطناعي».
- اسحب جميع الموافقات السحابية من «الخصوصية والبيانات»؛ سيُطلب منك القبول مجددًا قبل التلخيص التالي.
- احذف الأرشيف المحلي وحده من الصفحة نفسها.
- احذف كل بيانات الإضافة؛ يشمل ذلك الإعدادات والمفاتيح والرموز والأرشيف وتفعيل المزوِّدين والموافقات من ملف المتصفح. لا يحذف ذلك الملفات التي نزلتها أو بيانات مواقع المحادثات أو البيانات الموجودة لدى المزوِّدين أو سجلات تنزيل المتصفح أو سجلات برامج النماذج المحلية.
- يؤدي إلغاء تثبيت الإضافة إلى إزالة تخزينها وفق سلوك Chrome.

### 8. التواصل

يمكن إرسال الأسئلة حول هذا الإشعار، أو طلبات الخصوصية، أو دعم المنتجات إلى [seddev213@gmail.com](mailto:seddev213@gmail.com).
