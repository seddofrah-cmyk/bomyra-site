---
layout: default
title: "BOMYRA — AI Chat Saver & Exporter"
permalink: /
---

<div class="bomyra-home">
  <style>
  .bomyra-install-dialog[hidden]{display:none}
  .bomyra-install-dialog{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:20px;background:#020b12d9;backdrop-filter:blur(8px)}
  .bomyra-install-card{width:min(480px,100%);padding:clamp(25px,5vw,36px);border:1px solid #285064;border-radius:22px;background:linear-gradient(150deg,#102b3d,#0a1d2b);color:#f3f8fa;text-align:center;box-shadow:0 26px 70px #0008}
  .bomyra-install-card{width:min(820px,100%);text-align:left}
  .bomyra-guide-heading{text-align:center}
  .bomyra-guide-heading h2{margin-top:10px}
  .bomyra-guide-intro{max-width:620px;text-align:center}
  .bomyra-guide-grid{display:block;max-width:680px;margin:25px auto 0}
  .bomyra-guide-step{padding:16px;border:1px solid #28495a;border-radius:16px;background:#081b29}
  .bomyra-guide-step h3{display:flex;align-items:center;gap:9px;margin:0 0 12px;color:#f3f8fa;font-size:16px}
  .bomyra-guide-image{display:flex;align-items:center;justify-content:center;overflow:hidden;border:1px solid #315064;border-radius:11px;background:#050d14}
  .bomyra-guide-image img{display:block;width:100%;max-width:100%;height:auto;object-fit:contain;pointer-events:none;user-select:none}
  .bomyra-guide-step{min-width:0;padding:16px;border:1px solid #28495a;border-radius:16px;background:#081b29}
  .bomyra-guide-step h3{display:flex;align-items:center;gap:9px;margin:0 0 8px;color:#f3f8fa;font-size:16px}
  .bomyra-guide-number{display:grid;place-items:center;flex:0 0 27px;width:27px;height:27px;border-radius:50%;background:#20d5d2;color:#06202a;font-size:12px;font-weight:900}
  .bomyra-guide-step p{min-height:48px;margin:0 0 13px;color:#a8bdc8;font-size:13px;line-height:1.55}
  .bomyra-guide-footnote{margin:15px 0 0;color:#819aa7;font-size:12px;text-align:center}
  @media(max-width:620px){.bomyra-install-card{max-height:calc(100vh - 28px);overflow:auto}}

  .bomyra-install-card h2{margin:12px 0;color:#f3f8fa;font-size:clamp(24px,5vw,30px);line-height:1.2}
  .bomyra-install-card p{margin:0 auto;color:#a8bdc8;line-height:1.65}
  .bomyra-install-actions{display:grid;gap:10px;margin-top:24px}
  .bomyra-install-actions button{min-height:46px;padding:11px 16px;border:1px solid transparent;border-radius:10px;font:inherit;font-weight:800;cursor:pointer}
  .bomyra-install-primary{background:linear-gradient(100deg,#20d5d2,#83e9d9);color:#06202a}
  .bomyra-install-secondary{border-color:#315064!important;background:#102b3d;color:#d9e8ee}
  .bomyra-install-primary:disabled{opacity:.55;cursor:not-allowed}
  .bomyra-install-note{display:block;margin-top:12px;color:#819aa7;font-size:12px}
  body.bomyra-dialog-open{overflow:hidden}

  .bomyra-tour[hidden]{display:none}
  .bomyra-tour{position:fixed;inset:0;z-index:1100;display:grid;place-items:center;padding:24px;background:#02070de8;backdrop-filter:blur(9px);color:#eef7fb}
  .bomyra-tour-shell{width:min(1120px,100%);max-height:calc(100vh - 48px);display:grid;grid-template-rows:minmax(0,1fr) auto;overflow:hidden;border:1px solid #285064;border-radius:22px;background:#071a28;box-shadow:0 30px 100px #000b}
  .bomyra-tour-stage{min-height:0;padding:clamp(16px,3vw,30px);display:grid;grid-template-columns:minmax(0,1.2fr) minmax(250px,.8fr);gap:22px;align-items:center}
  .bomyra-tour-demo{position:relative;min-height:410px;overflow:hidden;border:1px solid #315064;border-radius:16px;background:#101820;padding:20px;display:flex;align-items:center;justify-content:center}
  .bomyra-tour-browser{width:100%;max-width:650px;min-height:330px;border:1px solid #344b5b;border-radius:14px;background:#f7fafc;color:#1c2933;overflow:hidden;box-shadow:0 20px 50px #0006}
  .bomyra-tour-browserbar{height:25px;background:#dce5eb;border-bottom:1px solid #c7d4dd;display:flex;align-items:center;gap:5px;padding:0 10px}
  .bomyra-tour-browserbar i{width:6px;height:6px;border-radius:50%;background:#8fa3b1}
  .bomyra-tour-chat{padding:20px 24px 24px;background:#101010;color:#eee;min-height:300px;position:relative}
  .bomyra-tour-message{max-width:75%;margin:12px 0 12px auto;padding:15px 18px;border-radius:20px;background:#202020;font-size:12px;line-height:1.6}
  .bomyra-tour-answer{max-width:80%;margin:18px auto 0 0;font-size:13px;line-height:1.6;color:#ddd}
  .bomyra-tour-extension{position:absolute;right:0;top:0;bottom:0;width:34%;min-width:185px;background:#f8fafc;color:#26333c;padding:12px;border-left:1px solid #dce5eb;font-size:11px}
  .bomyra-tour-brand{display:flex;align-items:center;gap:7px;font-weight:900;font-size:13px;margin-bottom:14px}
  .bomyra-tour-brand img{width:27px;height:27px}
  .bomyra-tour-tabs{display:flex;gap:5px;margin-bottom:12px}
  .bomyra-tour-tabs span{flex:1;text-align:center;padding:8px 2px;border-radius:9px;background:#edf2f6;font-weight:700}
  .bomyra-tour-tabs .active{background:#d9f5f4;color:#007f8b}
  .bomyra-tour-notice{padding:10px;border:1px solid #f1c98c;border-radius:9px;background:#fff7e8;color:#744b12;font-size:10px;line-height:1.4;margin-bottom:12px}
  .bomyra-tour-card{padding:12px;border:1px solid #dbe4ea;border-radius:10px;background:#fff;margin:9px 0}
  .bomyra-tour-btn{display:block;width:100%;padding:10px 12px;border:1px solid #dce5eb;border-radius:9px;background:#fff;color:#26333c;text-align:left;margin:8px 0;font:inherit;font-weight:700}
  .bomyra-tour-btn.primary{background:#087f91;color:white;border-color:#087f91;text-align:center}
  .bomyra-tour-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin:12px 0}
  .bomyra-tour-metrics span{padding:9px 5px;border:1px solid #dbe4ea;border-radius:9px;background:#f4f7f9;text-align:center;font-weight:800}
  .bomyra-tour-metrics small{display:block;font-size:9px;font-weight:500;color:#647786}
  .bomyra-tour-float{position:absolute;right:20px;bottom:18px;display:flex;align-items:center;gap:9px}
  .bomyra-tour-float span{display:grid;place-items:center;width:42px;height:42px;border-radius:50%;background:#eaf7f8;color:#007f91;font-size:20px;font-weight:900;box-shadow:0 5px 20px #0004}
  .bomyra-tour-float span:last-child{background:#087f91;color:white;width:54px;height:54px}
  .bomyra-tour-menu{position:absolute;right:20px;bottom:78px;width:245px;padding:8px;border:1px solid #dbe4ea;border-radius:14px;background:white;box-shadow:0 15px 40px #0005}
  .bomyra-tour-menu span{display:block;padding:9px 11px;border-radius:8px;color:#273640;font-size:11px;font-weight:650}
  .bomyra-tour-menu span:first-child{background:#d9f5f4;color:#007f91}
  .bomyra-tour-copy{min-width:0}
  .bomyra-tour-kicker{color:#20d5d2;font-size:11px;font-weight:850;letter-spacing:.14em;text-transform:uppercase}
  .bomyra-tour-copy h2{margin:10px 0 12px;color:#f3f8fa;font-size:clamp(23px,3vw,32px);line-height:1.15}
  .bomyra-tour-copy p{margin:0;color:#a8bdc8;font-size:14px;line-height:1.7}
  .bomyra-tour-focus{position:relative;z-index:2;outline:3px solid #20d5d2!important;outline-offset:4px;box-shadow:0 0 0 999px #0006,0 0 28px #20d5d277!important;border-radius:10px}
  .bomyra-tour-progress{height:4px;background:#183447}
  .bomyra-tour-progress span{display:block;height:100%;width:16.666%;background:linear-gradient(90deg,#20d5d2,#83e9d9);transition:width .25s ease}
  .bomyra-tour-controls{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 22px;border-top:1px solid #244456;background:#091f2e}
  .bomyra-tour-count{color:#8faebb;font-size:12px;font-weight:750;white-space:nowrap}
  .bomyra-tour-actions{display:flex;gap:9px}
  .bomyra-tour-actions button{min-width:112px;min-height:42px;padding:9px 16px;border-radius:10px;font:inherit;font-weight:800;cursor:pointer}
  .bomyra-tour-prev{border:1px solid #315064;background:#102b3d;color:#dcebf0}
  .bomyra-tour-next{border:1px solid transparent;background:linear-gradient(100deg,#20d5d2,#83e9d9);color:#06202a}
  .bomyra-tour-actions button:disabled{opacity:.4;cursor:not-allowed}
  .bomyra-tour-close{position:absolute;top:13px;right:14px;width:34px;height:34px;border:1px solid #315064;border-radius:50%;background:#102b3d;color:#dcebf0;font-size:18px;cursor:pointer}
  @media(max-width:760px){.bomyra-tour{padding:10px}.bomyra-tour-shell{max-height:calc(100vh - 20px)}.bomyra-tour-stage{grid-template-columns:1fr;gap:12px;padding:14px}.bomyra-tour-demo{min-height:300px}.bomyra-tour-browser{min-height:270px}.bomyra-tour-chat{min-height:245px;padding:14px}.bomyra-tour-extension{width:38%;min-width:140px;padding:8px}.bomyra-tour-copy h2{font-size:22px;margin:5px 0}.bomyra-tour-copy p{font-size:12px;line-height:1.45}.bomyra-tour-controls{padding:11px 13px}.bomyra-tour-actions button{min-width:88px;padding:8px 10px}.bomyra-tour-count{font-size:10px}}
  @media(max-width:420px){.bomyra-tour-demo{min-height:250px;padding:8px}.bomyra-tour-browser{min-height:230px}.bomyra-tour-extension{min-width:122px;font-size:9px}.bomyra-tour-brand{font-size:10px}.bomyra-tour-tabs span{font-size:9px}.bomyra-tour-message{font-size:10px}.bomyra-tour-actions button{min-width:75px;font-size:12px}}
  @media(prefers-reduced-motion:reduce){.bomyra-tour-progress span{transition:none}}
</style>
  <header class="home-nav">
    <a class="home-brand" href="/bomyra-site/" aria-label="BOMYRA home"><img src="/bomyra-site/assets/images/bomyra-mark.svg" alt="" /><span class="home-brand-copy"><strong>BOMYRA</strong><small>AI CHAT SAVER &amp; EXPORTER</small></span></a>
    <nav aria-label="Main navigation">
      <a href="#features">Features</a><a href="#how">How it works</a><a href="/bomyra-site/pricing/">Pricing</a>
      
      <a href="/bomyra-site/auth/" class="nav-login">Sign in</a><a href="/bomyra-site/auth/" class="nav-cta" data-bomyra-tour>Get Started</a>

    </nav>
  </header>

  <main>
    <section class="home-hero">
      <div class="hero-copy">
        <span class="eyebrow"><i></i> AI CHAT SAVER &amp; EXPORTER</span>
        <h1>Keep your best AI conversations.<span> Make them useful again.</span></h1>
        <p>BOMYRA helps you select the messages that matter from ChatGPT, Claude and Google Gemini, then turn them into portable, organized archives.</p>
        <div class="hero-actions"><a class="button-primary" href="#product-tour" data-bomyra-tour>Get Started <span>→</span></a><a class="button-quiet" href="/bomyra-site/pricing/">View Plans</a></div>
        <div class="platform-line">CHATGPT <b>·</b> CLAUDE <b>·</b> GOOGLE GEMINI</div>
      </div>
      
      <div class="hero-visual" aria-label="BOMYRA workflow illustration">
        <div class="visual-glow"></div>
        <div class="visual-top"><span class="visual-dot"></span><span>BOMYRA WORKSPACE</span><span class="visual-status">READY</span></div>
        <div class="visual-message"><span class="avatar avatar-user">Y</span><div><strong>Selected message</strong><small>Keep the ideas that matter.</small></div><span class="selected-check">✓</span></div>
        <div class="visual-message"><span class="avatar avatar-ai">AI</span><div><strong>Conversation insight</strong><small>Organized and ready to export.</small></div><span class="selected-check">✓</span></div>
        <div class="visual-export"><div><span class="export-icon">↓</span><span><strong>Portable archive</strong><small>Markdown · PDF · HTML · ZIP</small></span></div><span class="export-ready">READY</span></div>
        <div class="visual-footer"><span>SELECT</span><span>ORGANIZE</span><span>EXPORT</span></div>
      </div>
    </section>

    <section class="platform-strip">
      <span>WORKS ALONGSIDE YOUR FAVORITE AI CHATS</span>
      <strong>ChatGPT</strong><strong>Claude</strong><strong>Google Gemini</strong>
    </section>

    <section class="home-section" id="features">
      <div class="section-heading"><span class="eyebrow">BUILT FOR YOUR WORKFLOW</span><h2>Less scrolling. <span>More useful archives.</span></h2><p>Keep the conversation flow you already like, while making important parts easier to save, find and reuse.</p></div>
      
      <div class="feature-grid">
        <article class="feature-card"><span class="feature-number">01</span><span class="feature-icon">▣</span><h3>Select what matters</h3><p>Choose individual messages or use the all-messages command. Your export follows your selection.</p></article>
        <article class="feature-card"><span class="feature-number">02</span><span class="feature-icon">⇩</span><h3>Export your way</h3><p>Create Markdown, HTML, PDF, TXT, JSON, CSV, rich-text clipboard output or ZIP archives with media.</p></article>
        <article class="feature-card"><span class="feature-number">03</span><span class="feature-icon">✧</span><h3>Carry context forward</h3><p>Create a context-transfer prompt from selected messages to continue a useful thread elsewhere.</p></article>
        <article class="feature-card"><span class="feature-number">04</span><span class="feature-icon">⌘</span><h3>Optional AI summaries</h3><p>Use your own Gemini, OpenAI or Anthropic API key. Each cloud provider is enabled separately and requires consent.</p></article>
        <article class="feature-card"><span class="feature-number">05</span><span class="feature-icon">◉</span><h3>Local model workflows</h3><p>Connect a local runtime such as Ollama, LM Studio or LocalAI. No automatic cloud fallback is used.</p></article>
        <article class="feature-card"><span class="feature-number">06</span><span class="feature-icon">▤</span><h3>Media-aware archives</h3><p>Include available images and attachments in supported exports. Limitations are reported when an item cannot be retrieved.</p></article>
      </div>
    </section>

    <section class="workflow-section" id="how">
      <div class="section-heading"><span class="eyebrow">A SIMPLE FLOW</span><h2>Three steps. <span>More control.</span></h2></div>
      
      <div class="steps-grid">
        <div class="step"><span>01</span><h3>Select</h3><p>Choose the messages you want to keep from a supported chat.</p></div>
        <div class="step"><span>02</span><h3>Shape</h3><p>Choose a template or format and decide whether to include available media.</p></div>
        <div class="step"><span>03</span><h3>Keep</h3><p>Download a portable archive or copy formatted content to your clipboard.</p></div>
      </div>
    </section>

    <section class="privacy-band">
      <div><span class="eyebrow lang-en">PRIVACY BY DESIGN</span><h2>Your conversations stay yours.</h2><p>Ordinary selection and export processing run in your browser. Cloud summaries are sent directly to the provider you enable and separately consent to.</p></div>
      <a href="/bomyra-site/privacy.html" class="button-quiet lang-en">Read the privacy notice →</a>
    </section>

    <section class="faq-section">
      <div class="section-heading"><span class="eyebrow">GOOD TO KNOW</span><h2>Questions, <span>answered.</span></h2></div>
      
      <div class="faq-grid">
        <article><h3>Does BOMYRA upload my conversations to its own server?</h3><p>No developer-operated content relay is included. Selection and export processing run in the browser. If you request a cloud summary, selected text is sent directly to the provider you enabled and consented to.</p></article>
        <article><h3>Which chat platforms are supported?</h3><p>ChatGPT, Claude and Google Gemini.</p></article>
        <article><h3>Which export formats are available?</h3><p>Markdown, HTML, PDF, TXT, JSON, CSV, rich text for the clipboard and ZIP archives with media.</p></article>
        <article><h3>Can I use local AI models?</h3><p>Yes. Configure a supported local runtime such as Ollama, LM Studio or LocalAI. BOMYRA does not automatically fall back to a cloud provider if it fails.</p></article>
      </div>
    </section>

    <section class="final-cta"><div><span class="eyebrow">MAKE YOUR AI CHATS WORK FOR YOU</span><h2>Keep the ideas.<br><span>Take them anywhere.</span></h2><p>Explore BOMYRA plans and choose the workflow that fits you.</p><a class="button-primary" href="/bomyra-site/pricing/">Explore plans <span>→</span></a></div></section>
  </main>
  <footer class="home-footer"><a class="home-brand" href="/bomyra-site/" aria-label="BOMYRA home"><img src="/bomyra-site/assets/images/bomyra-mark.svg" alt="" /><span class="home-brand-copy"><strong>BOMYRA</strong><small>AI CHAT SAVER &amp; EXPORTER</small></span></a><div class="footer-links"><a href="/bomyra-site/pricing/">Plans</a><a href="/bomyra-site/privacy.html">Privacy</a><a href="mailto:seddev213@gmail.com">Support</a></div><p>© 2026 BOMYRA · Independent product. Not affiliated with OpenAI, Anthropic or Google.</p></footer>
  <div class="bomyra-tour" id="bomyra-product-tour" role="dialog" aria-modal="true" aria-labelledby="bomyra-tour-title" aria-describedby="bomyra-tour-description" hidden>
    <section class="bomyra-tour-shell">
      <button class="bomyra-tour-close" id="bomyra-tour-close" type="button" aria-label="Close tour">×</button>
      <div class="bomyra-tour-stage">
        <div class="bomyra-tour-demo" id="bomyra-tour-demo" aria-label="Illustrated preview of the BOMYRA extension">
          <div class="bomyra-tour-browser">
            <div class="bomyra-tour-browserbar"><i></i><i></i><i></i></div>
            <div class="bomyra-tour-chat">
              <div class="bomyra-tour-message">Conversation Context Transfer<br>Platform: Google Gemini · Messages: 6<br>Topic: Casual Greeting</div>
              <div class="bomyra-tour-answer">Your selected conversation is ready to organize and export.</div>
            </div>
          </div>
          <aside class="bomyra-tour-extension">
            <div class="bomyra-tour-brand"><img src="/bomyra-site/assets/images/bomyra-mark.svg" alt=""> BOMYRA</div>
            <div class="bomyra-tour-tabs"><span class="active">Export</span><span>Summary</span><span>Archive</span></div>
            <div class="bomyra-tour-notice">Security notice: keep API keys on a trusted device.</div>
            <div class="bomyra-tour-scene" data-scene="0">
              <div class="bomyra-tour-card">Selected messages <strong>8</strong></div>
              <div class="bomyra-tour-float tour-focus"><span>▣</span><span>↓</span></div>
            </div>
            <div class="bomyra-tour-scene" data-scene="1" hidden>
              <div class="bomyra-tour-card">Export actions</div>
              <div class="bomyra-tour-menu tour-focus"><span>Export</span><span>Export Visible Images (ZIP)</span><span>Select Specific Conversation Images</span><span>Scan All Images</span><span>Copy Selected</span><span>Deselect messages</span></div>
            </div>
            <div class="bomyra-tour-scene" data-scene="2" hidden>
              <div class="bomyra-tour-menu tour-focus"><span>Download JSON (.json)</span><span>Download CSV (.csv)</span><span>Download Markdown (.md)</span><span>Markdown + images &amp; files (ZIP)</span><span>Download Text (.txt)</span><span>Download formatted HTML</span><span>Quick PDF</span><span>Advanced PDF settings</span><span>Copy rich text for Word</span></div>
            </div>
            <div class="bomyra-tour-scene" data-scene="3" hidden>
              <div class="bomyra-tour-card tour-focus">Export template <strong>›</strong></div>
              <div class="bomyra-tour-metrics"><span>8<small>Selected</small></span><span>1158<small>Words</small></span><span>6 min<small>Reading time</small></span></div>
              <div class="bomyra-tour-btn primary">Export selected (8)</div>
            </div>
            <div class="bomyra-tour-scene" data-scene="4" hidden>
              <div class="bomyra-tour-card">Choose how to summarize the selected messages.</div>
              <div class="bomyra-tour-card tour-focus">Cloud provider · Google Gemini</div>
              <div class="bomyra-tour-btn primary">Summarize Selected</div>
              <div class="bomyra-tour-btn">Summarize with Local Model</div>
              <div class="bomyra-tour-btn">Create Context Transfer Summary</div>
            </div>
            <div class="bomyra-tour-scene" data-scene="5" hidden>
              <div class="bomyra-tour-card">0 / 50 items</div>
              <div class="bomyra-tour-tabs tour-focus"><span class="active">All</span><span>MD</span><span>HTML</span><span>PDF</span><span>AI</span></div>
              <div class="bomyra-tour-card">⌕ Search archive…</div>
              <div class="bomyra-tour-card" style="text-align:center;padding:32px 8px">No matching archives.</div>
            </div>
          </aside>
        </div>
        <div class="bomyra-tour-copy">
          <span class="bomyra-tour-kicker" id="bomyra-tour-step">STEP 1 OF 6</span>
          <h2 id="bomyra-tour-title">Floating controls</h2>
          <p id="bomyra-tour-description">Explore the floating BOMYRA controls that give you quick access to selection and export actions.</p>
        </div>
      </div>
      <div class="bomyra-tour-progress" aria-hidden="true"><span id="bomyra-tour-progress"></span></div>
      <div class="bomyra-tour-controls">
        <span class="bomyra-tour-count" id="bomyra-tour-count">1 / 6</span>
        <div class="bomyra-tour-actions">
          <button class="bomyra-tour-prev" id="bomyra-tour-prev" type="button" disabled>Previous</button>
          <button class="bomyra-tour-next" id="bomyra-tour-next" type="button">Next →</button>
        </div>
      </div>
    </section>
  </div>
  <script src="/bomyra-site/assets/js/bomyra-onboarding.js" defer></script>
</div>
