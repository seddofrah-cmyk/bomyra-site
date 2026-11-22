(() => {
  "use strict";
  const triggers = Array.from(document.querySelectorAll("[data-bomyra-onboarding]"));
  const dialog = document.getElementById("bomyra-install-dialog");
  const retry = document.getElementById("bomyra-retry-button");
  if (!triggers.length || !dialog || !retry) return;

  let previousFocus = null;

  function openDialog() {
    previousFocus = document.activeElement;
    dialog.hidden = false;
    document.body.classList.add("bomyra-dialog-open");
    retry.focus();
  }

  function closeDialog() {
    dialog.hidden = true;
    document.body.classList.remove("bomyra-dialog-open");
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  }

  triggers.forEach(trigger => {
    trigger.addEventListener("click", event => {
      event.preventDefault();
      openDialog();
    });
  });

  dialog.addEventListener("click", event => {
    if (event.target === dialog) closeDialog();
  });

  document.addEventListener("keydown", event => {
    if (dialog.hidden) return;
    if (event.key === "Escape") closeDialog();
    if (event.key === "Tab") {
      const focusable = Array.from(dialog.querySelectorAll("button:not(:disabled)"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  retry.addEventListener("click", () => {
    window.location.assign("/bomyra-site/extension/connect-qa/?flow=site-preview");
  });
})();