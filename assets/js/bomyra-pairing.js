(() => {
  "use strict";
  const SOURCE = "bomyra-site";
  const RESPONSE_SOURCE = "bomyra-extension-bridge";
  const buttons = Array.from(document.querySelectorAll("[data-bomyra-pair]"));
  if (!buttons.length) return;

  const status = document.getElementById("bomyra-pairing-status");
  let activeRequestId = null;
  let responseTimer = null;

  function showStatus(message, isError = false) {
    if (!status) return;
    status.hidden = false;
    status.classList.toggle("error", Boolean(isError));
    status.textContent = message;
  }

  function setBusy(value) {
    buttons.forEach(button => {
      button.classList.toggle("bomyra-pairing-pending", value);
      button.setAttribute("aria-disabled", value ? "true" : "false");
    });
  }

  function newRequestId() {
    if (window.crypto && typeof crypto.randomUUID === "function") return crypto.randomUUID().replace(/-/g, "");
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  }

  function validConnectUrl(value) {
    try {
      const url = new URL(value);
      return url.origin === location.origin
        && url.pathname === "/bomyra-site/extension/connect-qa/"
        && /^[A-Za-z0-9_-]{40,100}$/.test(url.searchParams.get("code") || "")
        && url.searchParams.get("flow") === "site";
    } catch (_) {
      return false;
    }
  }

  function onBridgeMessage(event) {
    if (event.source !== window || event.origin !== location.origin) return;
    const message = event.data;
    if (!message || message.source !== RESPONSE_SOURCE || message.requestId !== activeRequestId) return;

    if (message.type === "PAIRING_STARTED") {
      if (responseTimer) clearTimeout(responseTimer);
      if (!validConnectUrl(message.connectUrl)) {
        activeRequestId = null;
        setBusy(false);
        showStatus("The extension returned an invalid connection destination. Please refresh and try again.", true);
        return;
      }
      location.assign(message.connectUrl);
      return;
    }

    if (message.type === "PAIRING_START_FAILED") {
      if (responseTimer) clearTimeout(responseTimer);
      activeRequestId = null;
      setBusy(false);
      showStatus(message.message || "BOMYRA could not start account linking. Please try again.", true);
    }
  }

  window.addEventListener("message", onBridgeMessage);

  buttons.forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      if (activeRequestId) return;

      activeRequestId = newRequestId();
      setBusy(true);
      showStatus("Preparing your secure BOMYRA extension connection…");
      responseTimer = setTimeout(() => {
        if (!activeRequestId) return;
        activeRequestId = null;
        setBusy(false);
        showStatus("BOMYRA extension was not detected. Install or enable the extension, then refresh this page and try again.", true);
      }, 8000);

      window.postMessage({
        source: SOURCE,
        type: "START_EXTENSION_PAIRING",
        requestId: activeRequestId
      }, location.origin);
    });
  });
})();
