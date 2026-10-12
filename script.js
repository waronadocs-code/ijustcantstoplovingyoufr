(() => {
  "use strict";

  // TODO: replace with the exact Booking.com property URL for 377 Jack Hindon Street.
  const BOOKING_URL = "https://www.booking.com/searchresults.html?ss=" + encodeURIComponent("377 Jack Hindon Street");
  document.querySelectorAll(".book-cta").forEach((el) => { el.href = BOOKING_URL; });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- header scroll state ---------- */

  const header = document.getElementById("site-header");

  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 40);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- full-screen menu ---------- */

  const menu = document.getElementById("site-menu");
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");

  function openMenu() {
    if (!menu) return;
    menu.classList.add("is-open");
    menu.setAttribute("aria-hidden", "false");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      if (menu && menu.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
  }

  if (menuClose) menuClose.addEventListener("click", closeMenu);

  document.querySelectorAll("[data-menu-link]").forEach((a) => a.addEventListener("click", closeMenu));

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- scroll reveal ---------- */

  const revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- FAQ accordion ---------- */

  document.querySelectorAll(".faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item.is-open").forEach((other) => {
        if (other === item) return;
        other.classList.remove("is-open");
        const otherBtn = other.querySelector(".faq-question");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });
      item.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  /* ---------- rate-your-stay form (submits to Formspree) ---------- */

  // TODO: replace with your real Formspree form endpoint, e.g. "https://formspree.io/f/abcdwxyz"
  // Sign up free at https://formspree.io, create a form, and paste its endpoint here.
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID";

  const RATING_KEY = "jackHindonRatingV1";
  const ratingForm = document.getElementById("rating-form");
  const starButtons = document.querySelectorAll(".star-btn");
  const ratingValueInput = document.getElementById("rating-value");
  const ratingFeedback = document.querySelector(".rating-feedback");
  const ratingSubmitBtn = ratingForm ? ratingForm.querySelector(".form-submit") : null;

  function paintStars(value) {
    starButtons.forEach((btn) => {
      const v = Number(btn.dataset.value);
      btn.classList.toggle("is-filled", v <= value);
      btn.setAttribute("aria-checked", String(v === value));
    });
  }

  function setRatingFeedback(text, isError) {
    if (!ratingFeedback) return;
    ratingFeedback.textContent = text || "";
    ratingFeedback.classList.toggle("is-error", Boolean(isError));
  }

  function loadRating() {
    try {
      const raw = localStorage.getItem(RATING_KEY);
      if (!raw) return 0;
      return Number(JSON.parse(raw).value) || 0;
    } catch (e) {
      return 0;
    }
  }

  function saveRating(value) {
    try {
      localStorage.setItem(RATING_KEY, JSON.stringify({ value, ts: Date.now() }));
    } catch (e) {
      // localStorage unavailable (private browsing, etc.) — form still works for this visit
    }
  }

  if (starButtons.length) {
    let currentRating = loadRating();
    paintStars(currentRating);
    if (ratingValueInput) ratingValueInput.value = currentRating || "";

    starButtons.forEach((btn) => {
      const v = Number(btn.dataset.value);
      btn.addEventListener("mouseenter", () => paintStars(v));
      btn.addEventListener("mouseleave", () => paintStars(currentRating));
      btn.addEventListener("focus", () => paintStars(v));
      btn.addEventListener("blur", () => paintStars(currentRating));
      btn.addEventListener("click", () => {
        currentRating = v;
        paintStars(v);
        if (ratingValueInput) ratingValueInput.value = v;
        setRatingFeedback("");
      });
    });
  }

  if (ratingForm) {
    ratingForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const rating = Number(ratingValueInput && ratingValueInput.value);
      if (!rating) {
        setRatingFeedback("Please choose a star rating first.", true);
        return;
      }

      if (ratingSubmitBtn) ratingSubmitBtn.disabled = true;
      setRatingFeedback("Sending…", false);

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(ratingForm),
        });

        if (response.ok) {
          saveRating(rating);
          setRatingFeedback(`Thanks for rating your stay ${rating} / 5!`, false);
          ratingForm.reset();
          paintStars(rating);
          if (ratingValueInput) ratingValueInput.value = rating;
        } else {
          setRatingFeedback("Something went wrong sending your rating. Please try again.", true);
        }
      } catch (err) {
        setRatingFeedback("Couldn't reach the server — check your connection and try again.", true);
      } finally {
        if (ratingSubmitBtn) ratingSubmitBtn.disabled = false;
      }
    });
  }
})();
