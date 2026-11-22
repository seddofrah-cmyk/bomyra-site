(() => {
  "use strict";

  const triggers = Array.from(document.querySelectorAll("[data-bomyra-tour]"));
  const tour = document.getElementById("bomyra-product-tour");
  const closeButton = document.getElementById("bomyra-tour-close");
  const previousButton = document.getElementById("bomyra-tour-prev");
  const nextButton = document.getElementById("bomyra-tour-next");
  const title = document.getElementById("bomyra-tour-title");
  const description = document.getElementById("bomyra-tour-description");
  const stepLabel = document.getElementById("bomyra-tour-step");
  const count = document.getElementById("bomyra-tour-count");
  const progress = document.getElementById("bomyra-tour-progress");
  const scenes = Array.from(document.querySelectorAll(".bomyra-tour-scene"));
  if (!triggers.length || !tour || !closeButton || !previousButton || !nextButton || scenes.length !== 6) return;

  const steps = [
    {
      title: "Floating controls",
      description: "Meet the floating BOMYRA controls. They keep the main selection and export actions close at hand.",
      focus: ".bomyra-tour-float"
    },
    {
      title: "Quick actions",
      description: "Open the quick-action menu to export, work with conversation images, scan media, copy selected content, or clear the selection.",
      focus: ".bomyra-tour-menu"
    },
    {
      title: "Export formats",
      description: "Choose the output that fits your workflow: JSON, CSV, Markdown, ZIP, text, HTML, PDF, or rich text for Word.",
      focus: ".bomyra-tour-menu"
    },
    {
      title: "Export selection and preview",
      description: "Review the selected-message count, estimated word count, reading time, and export template before choosing an export.",
      focus: ".bomyra-tour-metrics"
    },
    {
      title: "Summary",
      description: "Choose an enabled cloud provider, use a configured local model, or create a context-transfer summary. These are separate workflows.",
      focus: ".bomyra-tour-card:nth-of-type(2)"
    },
    {
      title: "Archive",
      description: "Browse saved exports, filter by format, and search your archive. Your archive stays within the extension.",
      focus: ".bomyra-tour-tabs"
    }
  ];

  let currentStep = 0;
  let previousFocus = null;

  function renderStep() {
    const step = steps[currentStep];
    scenes.forEach((scene, index) => {
      scene.hidden = index !== currentStep;
      scene.querySelectorAll(".tour-focus").forEach(element => element.classList.remove("tour-focus"));
    });
    const activeScene = scenes[currentStep];
    const target = activeScene.querySelector(step.focus);
    if (target) target.classList.add("tour-focus");

    title.textContent = step.title;
    description.textContent = step.description;
    stepLabel.textContent = "STEP " + (currentStep + 1) + " OF " + steps.length;
    count.textContent = (currentStep + 1) + " / " + steps.length;
    progress.style.width = (((currentStep + 1) / steps.length) * 100) + "%";
    previousButton.disabled = currentStep === 0;
    nextButton.textContent = currentStep === steps.length - 1 ? "Finish ✓" : "Next →";
    nextButton.setAttribute("aria-label", currentStep === steps.length - 1 ? "Finish product tour" : "Go to next tour step");
  }

  function openTour() {
    previousFocus = document.activeElement;
    currentStep = 0;
    renderStep();
    tour.hidden = false;
    document.body.classList.add("bomyra-dialog-open");
    nextButton.focus();
  }

  function closeTour() {
    tour.hidden = true;
    document.body.classList.remove("bomyra-dialog-open");
    if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
  }

  triggers.forEach(trigger => {
    trigger.addEventListener("click", event => {
      event.preventDefault();
      openTour();
    });
  });

  previousButton.addEventListener("click", () => {
    if (currentStep === 0) return;
    currentStep -= 1;
    renderStep();
  });

  nextButton.addEventListener("click", () => {
    if (currentStep === steps.length - 1) {
      closeTour();
      return;
    }
    currentStep += 1;
    renderStep();
  });

  closeButton.addEventListener("click", closeTour);
  tour.addEventListener("click", event => {
    if (event.target === tour) closeTour();
  });

  document.addEventListener("keydown", event => {
    if (tour.hidden) return;
    if (event.key === "Escape") {
      closeTour();
      return;
    }
    if (event.key === "Tab") {
      const focusable = [closeButton, previousButton, nextButton].filter(button => !button.disabled);
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
})();