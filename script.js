// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// === Theme toggle ===
const THEME_KEY = "resume-theme";
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const THEME_ICONS = {
  light: "assets/icons8-partly-cloudy-day-94.png",
  dark: "assets/icons8-night-94.png",
};

function normalizeTheme(value) {
  return value === "light" ? "light" : "dark";
}

function applyTheme(mode) {
  const theme = normalizeTheme(mode);
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
    themeToggle.classList.toggle("is-dark", theme === "dark");
    themeToggle.classList.toggle("is-light", theme === "light");
  }
  if (themeIcon) {
    themeIcon.src = theme === "dark" ? THEME_ICONS.dark : THEME_ICONS.light;
  }
}

const saved = localStorage.getItem(THEME_KEY);
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
const initialTheme = saved === "light" || saved === "dark" ? saved : prefersLight ? "light" : "dark";
applyTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
});

// Keep fixed topbar from overlapping content.
const topbar = document.querySelector(".topbar");
const syncTopbarOffset = () => {
  if (!topbar) return;
  const height = Math.ceil(topbar.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--topbar-height", `${height}px`);
};
syncTopbarOffset();
window.addEventListener("resize", syncTopbarOffset);

// === Back-to-top ===
const toTop = document.getElementById("to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 420) toTop?.classList.add("show");
  else toTop?.classList.remove("show");
});
toTop?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// === Clickable project cards (works for .card[data-href] OR .card-link[data-href]) ===
document.querySelectorAll(".card[data-href], .card-link[data-href]").forEach((wrapper) => {
  const target = wrapper.matches(".card") ? wrapper : wrapper.querySelector(".card");
  if (!target) return;
  target.style.cursor = "pointer";
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "0");
  if (!target.hasAttribute("role")) target.setAttribute("role", "link");

  const open = () => {
    const url = wrapper.getAttribute("data-href");
    if (url) window.open(url, "_blank", "noopener");
  };

  target.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    open();
  });

  target.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });
});

document.querySelectorAll('.card[role="link"][data-href]').forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const url = card.getAttribute("data-href");
    if (url) window.open(url, "_blank", "noopener");
  });

  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const url = card.getAttribute("data-href");
      if (url) window.open(url, "_blank", "noopener");
    }
  });
});

// === Dot grid background (hero) ===
const dotGrid = document.querySelector(".dot-grid");
if (dotGrid) {
  const canvas = dotGrid.querySelector(".dot-grid__canvas");
  const ctx = canvas?.getContext("2d");
  const hero = dotGrid.closest(".hero") || dotGrid;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const parseColor = (value, fallback) => {
    const safe = fallback || { r: 107, g: 123, b: 255, a: 1 };
    if (!value) return safe;
    const raw = value.trim();
    const hexMatch = raw.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (hexMatch) {
      const hex = hexMatch[1];
      const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
      return {
        r: parseInt(full.slice(0, 2), 16),
        g: parseInt(full.slice(2, 4), 16),
        b: parseInt(full.slice(4, 6), 16),
        a: 1,
      };
    }
    const rgbMatch = raw.match(/rgba?\(([^)]+)\)/i);
    if (rgbMatch) {
      const parts = rgbMatch[1].split(",").map((part) => part.trim());
      const toChannel = (input) => {
        if (input.endsWith("%")) return Math.round((parseFloat(input) / 100) * 255);
        return parseFloat(input);
      };
      return {
        r: toChannel(parts[0]),
        g: toChannel(parts[1]),
        b: toChannel(parts[2]),
        a: parts[3] === undefined ? 1 : parseFloat(parts[3]),
      };
    }
    return safe;
  };

  const readNumber = (styles, name, fallback) => {
    const raw = styles.getPropertyValue(name).trim();
    if (!raw) return fallback;
    const value = parseFloat(raw);
    return Number.isFinite(value) ? value : fallback;
  };

  if (ctx && hero) {
    const state = {
      width: 0,
      height: 0,
      dots: [],
      mouse: { x: -9999, y: -9999, vx: 0, vy: 0, speed: 0, lastX: 0, lastY: 0, lastTime: 0 },
      base: parseColor("#6b7bff"),
      active: parseColor("#6b7bff"),
      dotSize: 3,
      gap: 26,
    };

    const settings = {
      proximity: 140,
      speedTrigger: 350,
      shockRadius: 220,
      shockStrength: 0.6,
      maxSpeed: 1400,
      damping: 0.88,
      spring: 0.08,
    };

    const updateFromStyles = () => {
      const styles = getComputedStyle(dotGrid);
      state.dotSize = readNumber(styles, "--dot-grid-size", state.dotSize);
      state.gap = readNumber(styles, "--dot-grid-gap", state.gap);
      state.base = parseColor(styles.getPropertyValue("--dot-grid-color"), state.base);
      state.active = parseColor(styles.getPropertyValue("--dot-grid-active"), state.active);
    };

    const buildGrid = () => {
      state.dots = [];
      const spacing = state.dotSize + state.gap;
      const cols = Math.floor((state.width + state.gap) / spacing);
      const rows = Math.floor((state.height + state.gap) / spacing);
      const gridWidth = cols * spacing - state.gap;
      const gridHeight = rows * spacing - state.gap;
      const startX = (state.width - gridWidth) / 2 + state.dotSize / 2;
      const startY = (state.height - gridHeight) / 2 + state.dotSize / 2;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          state.dots.push({
            x: startX + x * spacing,
            y: startY + y * spacing,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const resize = () => {
      updateFromStyles();
      const rect = dotGrid.getBoundingClientRect();
      state.width = rect.width;
      state.height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = state.width * dpr;
      canvas.height = state.height * dpr;
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
      if (prefersReducedMotion) drawFrame();
    };

    const mix = (from, to, t) => ({
      r: Math.round(from.r + (to.r - from.r) * t),
      g: Math.round(from.g + (to.g - from.g) * t),
      b: Math.round(from.b + (to.b - from.b) * t),
      a: from.a + (to.a - from.a) * t,
    });

    const applyImpulse = (dot, fx, fy) => {
      dot.vx += fx;
      dot.vy += fy;
    };

    const onPointerMove = (event) => {
      const rect = dotGrid.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const now = performance.now();
      const dt = state.mouse.lastTime ? now - state.mouse.lastTime : 16;
      const vx = ((x - state.mouse.lastX) / dt) * 1000;
      const vy = ((y - state.mouse.lastY) / dt) * 1000;
      const speed = Math.hypot(vx, vy);
      const limiter = speed > settings.maxSpeed ? settings.maxSpeed / speed : 1;

      state.mouse.x = x;
      state.mouse.y = y;
      state.mouse.vx = vx * limiter;
      state.mouse.vy = vy * limiter;
      state.mouse.speed = speed * limiter;
      state.mouse.lastX = x;
      state.mouse.lastY = y;
      state.mouse.lastTime = now;

      if (state.mouse.speed > settings.speedTrigger) {
        const influence = Math.min(state.mouse.speed / settings.speedTrigger, 2);
        const impulseScale = 0.0025 * influence;
        for (const dot of state.dots) {
          const dx = dot.x - state.mouse.x;
          const dy = dot.y - state.mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < settings.proximity) {
            const falloff = 1 - dist / settings.proximity;
            applyImpulse(dot, state.mouse.vx * impulseScale * falloff, state.mouse.vy * impulseScale * falloff);
          }
        }
      }
    };

    const onPointerLeave = () => {
      state.mouse.x = -9999;
      state.mouse.y = -9999;
      state.mouse.speed = 0;
    };

    const onClick = (event) => {
      const rect = dotGrid.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      for (const dot of state.dots) {
        const dx = dot.x - x;
        const dy = dot.y - y;
        const dist = Math.hypot(dx, dy);
        if (dist < settings.shockRadius && dist > 0) {
          const force = (1 - dist / settings.shockRadius) * settings.shockStrength;
          applyImpulse(dot, (dx / dist) * force, (dy / dist) * force);
        }
      }
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, state.width, state.height);
      for (const dot of state.dots) {
        dot.vx += -dot.ox * settings.spring;
        dot.vy += -dot.oy * settings.spring;
        dot.vx *= settings.damping;
        dot.vy *= settings.damping;
        dot.ox += dot.vx;
        dot.oy += dot.vy;

        const dx = dot.x - state.mouse.x;
        const dy = dot.y - state.mouse.y;
        const dist = Math.hypot(dx, dy);
        const t = dist < settings.proximity ? 1 - dist / settings.proximity : 0;
        const blended = mix(state.base, state.active, t);
        ctx.fillStyle = `rgba(${blended.r}, ${blended.g}, ${blended.b}, ${blended.a})`;
        ctx.beginPath();
        ctx.arc(dot.x + dot.ox, dot.y + dot.oy, state.dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let rafId = null;
    const animate = () => {
      drawFrame();
      rafId = requestAnimationFrame(animate);
    };

    resize();

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    if (resizeObserver) resizeObserver.observe(dotGrid);
    else window.addEventListener("resize", resize);

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    hero.addEventListener("click", onClick);

    const themeObserver = new MutationObserver(() => {
      updateFromStyles();
      if (prefersReducedMotion) drawFrame();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(animate);
    } else {
      drawFrame();
    }

    window.addEventListener("beforeunload", () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      hero.removeEventListener("click", onClick);
    });
  }
}

// === Contact form confirmation ===
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm && contactStatus) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    contactStatus.classList.remove("success", "error");
    contactStatus.textContent = "Sending...";
    submitButton?.setAttribute("disabled", "disabled");

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        contactStatus.textContent = "Thanks! Your message has been sent.";
        contactStatus.classList.add("success");
        contactForm.reset();
      } else {
        contactStatus.textContent =
          "Sorry, something went wrong. Please try again or email me directly.";
        contactStatus.classList.add("error");
      }
    } catch (error) {
      contactStatus.textContent =
        "Sorry, something went wrong. Please try again or email me directly.";
      contactStatus.classList.add("error");
    } finally {
      submitButton?.removeAttribute("disabled");
    }
  });
}

// === Scroll reveal ===
const sections = document.querySelectorAll("section");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (sections.length && !prefersReducedMotion) {
  document.body.classList.add("reveal-on-scroll");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
}

