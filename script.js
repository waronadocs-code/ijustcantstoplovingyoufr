(() => {
  "use strict";

  // TODO: replace with the exact Booking.com property URL for 377 Jack Hindon Street.
  const BOOKING_URL = "https://www.booking.com/searchresults.html?ss=" + encodeURIComponent("377 Jack Hindon Street");
  document.querySelectorAll(".book-cta").forEach((el) => { el.href = BOOKING_URL; });

  const root = document.documentElement;
  const section = document.querySelector(".cinema-scroll");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const track = document.querySelector(".sights-track");
  const controls = document.querySelector(".sights-controls");
  const prevBtn = document.querySelector(".sight-prev");
  const nextBtn = document.querySelector(".sight-next");
  const originalCards = track ? Array.from(track.children) : [];

  let targetMouseX = 0, targetMouseY = 0, mouseX = 0, mouseY = 0;
  let targetScroll = 0, smoothScroll = 0, initialized = false, rafPending = false;
  let sightCards = [];
  const originalSightCount = originalCards.length;
  let activeSight = originalSightCount;

  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const smoothstep = (e0, e1, v) => {
    const x = clamp((v - e0) / (e1 - e0));
    return x * x * (3 - 2 * x);
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const segmentInOut = (s, a, b, c, d) => {
    const enter = smoothstep(a, b, s);
    const exit = smoothstep(c, d, s);
    return { enter, exit, active: enter * (1 - exit) };
  };
  const getScrollDistance = () => {
    if (!section) return 0;
    return clamp(-section.getBoundingClientRect().top, 0, section.offsetHeight - window.innerHeight);
  };

  function setVar(name, value) { root.style.setProperty(name, value); }

  function update() {
    rafPending = false;

    targetScroll = getScrollDistance();
    if (!initialized || reduceMotion.matches) {
      smoothScroll = targetScroll;
      initialized = true;
    } else {
      smoothScroll = lerp(smoothScroll, targetScroll, 0.14);
    }
    if (Math.abs(smoothScroll - targetScroll) < 0.08) smoothScroll = targetScroll;

    mouseX = lerp(mouseX, targetMouseX, 0.12);
    mouseY = lerp(mouseY, targetMouseY, 0.12);

    const reveal = segmentInOut(smoothScroll, 520, 900, 1300, 1650);
    const amenities = segmentInOut(smoothScroll, 1780, 2150, 2550, 2750);
    const progress = clamp(smoothScroll / 2750);
    const introExit = smoothstep(60, 620, smoothScroll);
    const sightsEnterRaw = smoothstep(2800, 3560, smoothScroll);
    const sightsEnter = Math.pow(sightsEnterRaw, 1.5);
    const sightsControlsEnter = smoothstep(3360, 3660, smoothScroll);

    const blurActive = clamp(reveal.active + amenities.active);
    const drift = Math.pow(reveal.enter, 1.3);
    const bgScale = 1 + progress * 0.18 + reveal.enter * 0.1 + amenities.enter * 0.08;

    const mx = reduceMotion.matches ? 0 : mouseX;
    const my = reduceMotion.matches ? 0 : mouseY;

    setVar("--mx", mx.toFixed(4));
    setVar("--my", my.toFixed(4));

    setVar("--bg-x", `${mx * -14}px`);
    setVar("--bg-y", `${my * -5}px`);
    setVar("--bg-scale", bgScale);
    setVar("--glow-opacity", 0.5 + reveal.active * 0.18);

    setVar("--blur-px", `${blurActive * 10}px`);
    setVar("--brightness", 1 - blurActive * 0.18);
    setVar("--shade-alpha", blurActive * 0.55);

    setVar("--title-y", `${introExit * -170}px`);
    setVar("--title-scale", 1 - introExit * 0.08);
    setVar("--title-opacity", 1 - introExit);

    setVar("--intro-y", `${introExit * 80}px`);
    setVar("--intro-opacity", 1 - introExit);

    setVar("--detail-opacity", reveal.active);
    setVar("--detail-x", `calc(-50% + ${mx * 14}px)`);
    setVar("--detail-y", `calc(-50% + ${my * 10 - reveal.exit * 130}px)`);
    setVar("--detail-scale", 1.08 - reveal.enter * 0.08 + reveal.exit * 0.05);

    setVar("--split-left-x", `calc(-100% + ${-drift * 14}vw + ${mx * 10}px)`);
    setVar("--split-right-x", `calc(0% + ${drift * 14}vw + ${mx * 10}px)`);
    setVar("--split-left-y", `${my * 8 - reveal.exit * 420}px`);
    setVar("--split-right-y", `${my * 8 - reveal.exit * 420}px`);
    setVar("--split-left-scale", 1 + reveal.enter * 0.12 + reveal.exit * 0.1);
    setVar("--split-right-scale", 1 + reveal.enter * 0.12 + reveal.exit * 0.1);

    setVar("--panel-space-opacity", reveal.active);
    setVar("--panel-space-y", `calc(-50% + ${-reveal.exit * 70 + (1 - reveal.enter) * 48}px)`);
    setVar("--panel-amenities-opacity", amenities.active);
    setVar("--panel-amenities-y", `calc(-50% + ${-amenities.exit * 70 + (1 - amenities.enter) * 48}px)`);

    setVar("--sights-opacity", sightsEnter);
    setVar("--sights-visibility", sightsEnter > 0.01 ? "visible" : "hidden");
    setVar("--sights-enter-x", `${(1 - sightsEnter) * 420}vw`);
    setVar("--sights-controls-opacity", sightsControlsEnter);
    if (controls) controls.classList.toggle("is-ready", sightsControlsEnter > 0.98);

    if (
      Math.abs(smoothScroll - targetScroll) > 0.08 ||
      Math.abs(mouseX - targetMouseX) > 0.001 ||
      Math.abs(mouseY - targetMouseY) > 0.001
    ) {
      requestTick();
    }
  }

  function requestTick() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestTick, { passive: true });
  window.addEventListener("resize", () => { updateSightSlider(); requestTick(); });
  window.addEventListener("pointermove", (e) => {
    targetMouseX = e.clientX / window.innerWidth - 0.5;
    targetMouseY = e.clientY / window.innerHeight - 0.5;
    requestTick();
  }, { passive: true });

  /* ---------- infinite room-highlights slider ---------- */

  function setupSightSlider() {
    if (!track || originalSightCount === 0) return;
    track.replaceChildren();
    for (let setIndex = 0; setIndex < 3; setIndex++) {
      originalCards.forEach((card, cardIndex) => {
        const clone = card.cloneNode(true);
        clone.dataset.sightIndex = String(setIndex * originalSightCount + cardIndex);
        track.appendChild(clone);
      });
    }
    sightCards = Array.from(track.children);
    activeSight = originalSightCount;

    sightCards.forEach((card) => {
      card.addEventListener("click", () => selectSightCard(card));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectSightCard(card);
        }
      });
    });

    track.addEventListener("transitionend", normalizeSightSlider);
    updateSightSlider();
  }

  function updateSightSlider() {
    if (!track || sightCards.length === 0) return;
    const cardWidth = sightCards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    setVar("--sights-shift", `${-(cardWidth + gap) * activeSight}px`);
    sightCards.forEach((card) => {
      card.classList.toggle("is-active", Number(card.dataset.sightIndex) === activeSight);
    });
  }

  function moveSightSlider(dir) {
    activeSight += dir;
    updateSightSlider();
  }

  function selectSightCard(card) {
    const index = Number(card.dataset.sightIndex);
    if (Number.isFinite(index)) {
      activeSight = index;
      updateSightSlider();
    }
  }

  function jumpSightSlider(index) {
    track.classList.add("is-jumping");
    activeSight = index;
    updateSightSlider();
    requestAnimationFrame(() => requestAnimationFrame(() => track.classList.remove("is-jumping")));
  }

  function normalizeSightSlider() {
    if (activeSight >= originalSightCount * 2) {
      jumpSightSlider(activeSight - originalSightCount);
    } else if (activeSight < originalSightCount) {
      jumpSightSlider(activeSight + originalSightCount);
    }
  }

  if (prevBtn) prevBtn.addEventListener("click", () => moveSightSlider(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => moveSightSlider(1));

  setupSightSlider();
  requestTick();
})();
