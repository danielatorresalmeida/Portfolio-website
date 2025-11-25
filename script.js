// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// === Theme toggle ===
const THEME_KEY = "resume-theme";
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeLabel = document.getElementById("theme-label");
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
  if (themeLabel) {
    themeLabel.textContent = theme === "dark" ? "Dark" : "Light";
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
