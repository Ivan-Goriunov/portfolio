const projects = {
  dcf: {
    type: "AI-Assisted Valuation Project",
    title: "Oracle AI Backlog Valuation",
    lede:
      "Built a compact DCF and investment memo to assess how much of Oracle's AI backlog should translate into value once timing, reinvestment, and execution risk were taken into account.",
    sections: [
      {
        heading: "Project Question",
        items: [
          "Oracle's remaining performance obligations rose from about $130.2B to $455.3B, creating a major AI backlog valuation question.",
          "Because much of the backlog was long-dated, the project asked whether booked demand should be valued at full strength or discounted for timing and execution risk.",
        ],
      },
      {
        heading: "Approach",
        items: [
          "Built a compact DCF and investment memo that gave Oracle credit for an OCI-driven revenue ramp while discounting the full management path.",
          "Used AI as an analytical assistant to accelerate source review, evidence organization, KPI mapping, and model construction.",
        ],
      },
      {
        heading: "Evidence & Method",
        items: [
          "Reviewed Oracle filings, earnings materials, and AI ecosystem evidence from NVIDIA and AMD.",
          "Built a KPI spine and timeline connecting backlog growth, RPO conversion, CapEx, margins, and valuation assumptions.",
          "Used the decline in next-12-month RPO conversion from about 31% to 10% as a key signal of long-dated revenue timing.",
          "Translated the evidence chain into DCF drivers, including capped margin recovery, elevated CapEx, 9.0% WACC, and 3.0% terminal growth.",
        ],
      },
      {
        heading: "Output & Takeaway",
        items: [
          "The base case produced an enterprise value of about $230.1B and equity value of about $149.8B.",
          "The implied value was about $52.71 per share.",
          "The class-project recommendation was \"hold/trim,\" reflecting meaningful AI backlog value but not full headline value.",
          "Main lesson: backlog can be valuable without being equivalent to cash.",
        ],
      },
    ],
  },
  inventory: {
    type: "Operations & Analytics",
    title: "Inventory Workflow Improvement",
    lede:
      "Hands-on operations work redesigning the inventory workflow at I&I Diamonds, a small jewelry business where each item was unique. The project focused on replacing an overbuilt retail POS process with a simpler system for tracking item details, photos, pricing, and SKU information.",
    sections: [
      {
        heading: "Workflow Problem",
        items: [
          "I&I Diamonds carried one-of-one jewelry pieces rather than repeat stock units.",
          "The existing Lightspeed POS workflow was more complex than the business needed.",
          "Each item still required reliable tracking of materials, weight, measurements, cost, selling price, labels, and photos.",
          "Many POS features added extra steps without adding much practical value.",
        ],
      },
      {
        heading: "Approach",
        items: [
          "Redesigned the workflow around the information the business actually used.",
          "Migrated inventory records into Excel and organized product photos in Google Drive.",
          "Linked product images back to item records for faster lookup and maintenance.",
          "Preserved the physical inventory book as a backup and printable reference.",
        ],
      },
      {
        heading: "Evidence & Method",
        items: [
          "Used spreadsheet design, SKU-level tracking, image/file organization, and inventory data cleanup.",
          "Focused on creating a fit-for-purpose process for unique jewelry items.",
          "Simplified the workflow instead of adding another larger or more expensive system.",
          "Kept the process centered on daily business needs: item lookup, pricing, photos, labels, and reporting.",
        ],
      },
      {
        heading: "Output & Takeaway",
        items: [
          "Reduced estimated item-entry time from about 30 minutes to about 20 minutes per piece.",
          "Helped reduce recurring system costs by nearly $2K annually.",
          "Made inventory lookup and maintenance simpler for daily operations.",
          "Main lesson: operational improvement is not always about adding software. Sometimes the better solution is simplifying the system around the work people actually do.",
        ],
      },
    ],
  },
  fencing: {
    type: "Athletics And Leadership",
    title: "NCAA Fencing and Coaching",
    lede:
      "I have been fencing for over 11 years, from club training in South Florida to national competition and NCAA fencing at Boston College. It is one of the biggest parts of my background and has shaped how I prepare, compete, learn, and teach.",
    sections: [
      {
        heading: "Background",
        items: [
          "Started fencing at 10 years old in South Florida and have continued with the sport for over a decade.",
          "Trained and competed at South Florida Fencing Club before joining the Boston College Men's Fencing Team.",
          "Fencing opened doors to national competition, coaching, college athletics, and a community that shaped much of my personal growth.",
        ],
      },
      {
        heading: "Athletic Milestones",
        items: [
          "Placed 1st in Division 1A Men's Epee at the 2023 Summer Nationals.",
          "Qualified for the NCAA Championships in my first year with the Boston College Men's Fencing Team.",
          "Received the Golden Eagle Scholar-Athlete Achievement Award, an honor given to only four student-athletes across the Boston College athletic community.",
        ],
      },
      {
        heading: "Coaching",
        items: [
          "Coached youth fencing students at South Florida Fencing Club.",
          "Worked with students on technique, footwork, strategy, sportsmanship, and confidence.",
          "Learned how to break down complicated skills and give feedback students could actually use.",
        ],
      },
      {
        heading: "What It Taught Me",
        items: [
          "Learned to stay composed in high-pressure moments and adapt quickly when the situation changed.",
          "Improvement comes from repetition, feedback, and small adjustments over time.",
          "Leadership is not just being good at something yourself, but helping someone else understand it and improve.",
        ],
      },
    ],
  },
};

const overlay = document.querySelector("[data-modal-overlay]");
const modalBody = document.querySelector("[data-modal-body]");
const closeButton = document.querySelector("[data-modal-close]");
const contactOpenButton = document.querySelector("[data-contact-open]");
const contactOverlay = document.querySelector("[data-contact-overlay]");
const contactCloseButton = document.querySelector("[data-contact-close]");
const contactForm = document.querySelector("[data-contact-form]");
const contactSubmitButton = document.querySelector("[data-contact-submit]");
const contactStatus = document.querySelector("[data-contact-status]");
const cards = document.querySelectorAll("[data-project]");
const carousel = document.querySelector("[data-carousel]");
const outcomeSlider = document.querySelector("[data-outcome-slider]");
const projectsSection = document.querySelector("#projects");
const mobileProjectCards = window.matchMedia("(max-width: 640px)");
const memoMetrics = {
  implied: ["Implied Value / Share", "$52.71"],
  ev: ["Enterprise Value", "$230.1B"],
  equity: ["Equity Value", "$149.8B"],
  recommendation: ["Model-Based Recommendation", "Hold / Trim"],
};
let activeCard = null;
let projectHintsDismissed = false;
let projectHintTimer = null;

function hideProjectHints() {
  projectHintsDismissed = true;
  document.body.classList.remove("show-project-hints");
  document.body.classList.add("hide-project-hints");
  window.clearTimeout(projectHintTimer);
}

function makeSection(section) {
  const content = section.items
    ? `<ul>${section.items.map((item) => `<li>${item}</li>`).join("")}</ul>`
    : `<p>${section.body}</p>`;

  return `
    <section class="modal-panel">
      <h3>${section.heading}</h3>
      ${content}
    </section>
  `;
}

function makeVisual(project) {
  if (project.image) {
    return `<img class="modal-image" src="${project.image.src}" alt="${project.image.alt}" />`;
  }

  if (!project.visual) {
    return "";
  }

  if (project.visual.type === "valuation") {
    return `
      <div class="modal-visual valuation-visual" aria-label="${project.visual.label}">
        <p>${project.visual.label}</p>
        ${project.visual.items
          .map(
            ([label, value]) => `
              <div>
                <span>${label}</span>
                <strong>${value}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (project.visual.type === "workflow") {
    return `
      <div class="modal-visual workflow-visual" aria-label="${project.visual.label}">
        ${project.visual.steps
          .map((step) => `<span>${step}</span>`)
          .join('<b aria-hidden="true">→</b>')}
      </div>
    `;
  }

  return "";
}

function openProject(projectId, card) {
  const project = projects[projectId];

  if (!project) {
    return;
  }

  activeCard = card;
  modalBody.innerHTML = `
    <p class="eyebrow">${project.type}</p>
    <h2 id="modal-title">${project.title}</h2>
    <p class="modal-lede">${project.lede}</p>
    ${makeVisual(project)}
    <div class="modal-grid">
      ${project.sections.map(makeSection).join("")}
    </div>
  `;

  overlay.hidden = false;
  document.body.classList.add("modal-open");
  closeButton.focus();
}

function closeProject() {
  overlay.hidden = true;
  document.body.classList.remove("modal-open");
  modalBody.innerHTML = "";

  if (activeCard) {
    activeCard.focus();
  }
}

function openContact() {
  contactOverlay.hidden = false;
  document.body.classList.add("modal-open");
  contactForm.querySelector("input[name='name']").focus();
}

function closeContact() {
  contactOverlay.hidden = true;
  document.body.classList.remove("modal-open");
  contactOpenButton.focus();
}

cards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("[data-card-control]")) {
      return;
    }

    if (mobileProjectCards.matches && !event.target.closest(".card-action")) {
      return;
    }

    hideProjectHints();
    openProject(card.dataset.project, card);
  });

  card.addEventListener("keydown", (event) => {
    if (event.target.closest("[data-card-control], .card-action")) {
      return;
    }

    if (mobileProjectCards.matches && !event.target.closest(".card-action")) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      hideProjectHints();
      openProject(card.dataset.project, card);
    }
  });
});

document.querySelectorAll("[data-memo-metric]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    hideProjectHints();

    const memo = button.closest(".memo-preview");
    const metric = memoMetrics[button.dataset.memoMetric];

    if (!memo || !metric) {
      return;
    }

    memo.querySelector("[data-memo-label]").textContent = metric[0];
    memo.querySelector("[data-memo-value]").textContent = metric[1];

    memo.querySelectorAll("[data-memo-metric]").forEach((metricButton) => {
      const isActive = metricButton === button;
      metricButton.classList.toggle("is-active", isActive);
      metricButton.setAttribute("aria-pressed", String(isActive));
    });
  });
});

if (outcomeSlider) {
  const outcomeSlides = outcomeSlider.querySelectorAll(".outcome-slide");
  const outcomeButtons = document.querySelectorAll("[data-outcome-index]");
  let activeOutcome = 0;
  let outcomeTimer = null;
  let dragStartX = 0;
  let dragStartPercent = 0;
  let dragPercent = 0;
  let isDraggingOutcome = false;

  function setOutcomePosition(percent, animate = true) {
    dragPercent = Math.max(-50, Math.min(0, percent));
    outcomeSlider.classList.toggle("is-dragging", !animate);
    outcomeSlider.style.transform = `translateX(${dragPercent}%)`;
  }

  function showOutcome(index) {
    activeOutcome = (index + outcomeSlides.length) % outcomeSlides.length;
    outcomeSlider.dataset.activeOutcome = String(activeOutcome);
    setOutcomePosition(activeOutcome * -50, true);

    outcomeSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeOutcome);
    });

    outcomeButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === activeOutcome;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  }

  function restartOutcomeTimer() {
    window.clearInterval(outcomeTimer);
    outcomeTimer = window.setInterval(() => {
      showOutcome(activeOutcome + 1);
    }, 10000);
  }

  outcomeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      hideProjectHints();
      showOutcome(Number(button.dataset.outcomeIndex));
      restartOutcomeTimer();
    });
  });

  outcomeSlider.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    hideProjectHints();
    isDraggingOutcome = true;
    dragStartX = event.clientX;
    dragStartPercent = activeOutcome * -50;
    window.clearInterval(outcomeTimer);
    outcomeSlider.setPointerCapture(event.pointerId);
    setOutcomePosition(dragStartPercent, false);
  });

  outcomeSlider.addEventListener("pointermove", (event) => {
    if (!isDraggingOutcome) {
      return;
    }

    event.stopPropagation();
    const width = outcomeSlider.getBoundingClientRect().width / 2;
    const deltaPercent = ((event.clientX - dragStartX) / width) * 50;
    setOutcomePosition(dragStartPercent + deltaPercent, false);
  });

  function endOutcomeDrag(event) {
    if (!isDraggingOutcome) {
      return;
    }

    event.stopPropagation();
    isDraggingOutcome = false;
    activeOutcome = dragPercent <= -25 ? 1 : 0;
    showOutcome(activeOutcome);
    restartOutcomeTimer();
  }

  outcomeSlider.addEventListener("pointerup", endOutcomeDrag);
  outcomeSlider.addEventListener("pointercancel", endOutcomeDrag);

  showOutcome(activeOutcome);
  restartOutcomeTimer();
}

if (projectsSection) {
  const projectsObserver = new IntersectionObserver(
    (entries, observer) => {
      if (projectHintsDismissed || !entries.some((entry) => entry.isIntersecting)) {
        return;
      }

      document.body.classList.add("show-project-hints");
      projectHintTimer = window.setTimeout(hideProjectHints, 5000);
      observer.disconnect();
    },
    { threshold: 0.35 },
  );

  projectsObserver.observe(projectsSection);
}

closeButton.addEventListener("click", closeProject);

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    closeProject();
  }
});

contactOpenButton.addEventListener("click", openContact);
contactCloseButton.addEventListener("click", closeContact);

contactOverlay.addEventListener("click", (event) => {
  if (event.target === contactOverlay) {
    closeContact();
  }
});

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  contactStatus.textContent = "Sending...";
  contactStatus.classList.remove("is-success", "is-error");
  contactSubmitButton.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    contactForm.reset();
    contactStatus.textContent = "Message sent. Thank you.";
    contactStatus.classList.add("is-success");
  } catch (error) {
    contactStatus.textContent =
      "Something went wrong. Please try again in a moment.";
    contactStatus.classList.add("is-error");
  } finally {
    contactSubmitButton.disabled = false;
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) {
    closeProject();
  }

  if (event.key === "Escape" && !contactOverlay.hidden) {
    closeContact();
  }
});

if (carousel) {
  const slides = carousel.querySelectorAll(".carousel-slide");
  const dots = carousel.querySelectorAll("[data-carousel-dot]");
  const nextButton = carousel.querySelector("[data-carousel-next]");
  const previousButton = carousel.querySelector("[data-carousel-prev]");
  let activeSlide = 0;
  let carouselTimer = null;

  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    const nextSlide = (activeSlide + 1) % slides.length;
    const previousSlide = (activeSlide - 1 + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeSlide);
      slide.classList.toggle("is-next", slideIndex === nextSlide);
      slide.classList.toggle("is-prev", slideIndex === previousSlide);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeSlide);
    });
  }

  function advanceSlide() {
    showSlide(activeSlide + 1);
  }

  function rewindSlide() {
    showSlide(activeSlide - 1);
  }

  function restartCarouselTimer() {
    window.clearInterval(carouselTimer);
    carouselTimer = window.setInterval(advanceSlide, 10000);
  }

  nextButton.addEventListener("click", () => {
    advanceSlide();
    restartCarouselTimer();
  });

  previousButton.addEventListener("click", () => {
    rewindSlide();
    restartCarouselTimer();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.carouselDot));
      restartCarouselTimer();
    });
  });

  showSlide(activeSlide);
  restartCarouselTimer();
}
