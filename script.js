// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// === Theme toggle ===
const THEME_KEY = 'resume-theme';
const themeToggle = document.getElementById('theme-toggle');

function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem(THEME_KEY, mode);
  if (themeToggle) {
    themeToggle.textContent = (mode === 'light') ? '🌙 Dark' : '🌞 Light';
    themeToggle.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
  }
}

const saved = localStorage.getItem(THEME_KEY);
if (saved === 'light' || saved === 'dark') {
  applyTheme(saved);
} else {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight ? 'light' : 'dark');
}

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'light' ? 'dark' : 'light';

  // Apply the new theme
  applyTheme(next);

  // Update button color class
  const btn = document.getElementById("theme-toggle");
  if (next === 'dark') {
    btn.style.backgroundColor = "#ffffff";
    btn.style.color = "#13151a";
  } else {
    btn.style.backgroundColor = "#0b0c10";
    btn.style.color = "#e9ebf0";
  }
});

// === Back-to-top ===
const toTop = document.getElementById('to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 420) toTop?.classList.add('show');
  else toTop?.classList.remove('show');
});
toTop?.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// === Clickable project cards (works for .card[data-href] OR .card-link[data-href]) ===
document.querySelectorAll('.card[data-href], .card-link[data-href]').forEach(wrapper => {
  // If wrapper is .card, target is itself; if it's .card-link, target is its .card child
  const target = wrapper.matches('.card') ? wrapper : wrapper.querySelector('.card');
  if (!target) return;

  // Make it look interactive + keyboard focusable
  target.style.cursor = 'pointer';
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '0');
  if (!target.hasAttribute('role')) target.setAttribute('role', 'link');

  const open = () => {
    const url = wrapper.getAttribute('data-href');
    if (url) window.open(url, '_blank', 'noopener');
  };

  // Don’t hijack real inner links (e.g., the “Code” anchor)
  target.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    open();
  });

  target.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });
});
// Make whole card clickable when it has data-href (but don't hijack inner <a>)
document.querySelectorAll('.card[role="link"][data-href]').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('a')) return; // let "Code" link etc. behave normally
    const url = card.getAttribute('data-href');
    if (url) window.open(url, '_blank', 'noopener');
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const url = card.getAttribute('data-href');
      if (url) window.open(url, '_blank', 'noopener');
    }
  });
});

// === QA status chip ===
(async () => {
  const statusEl = document.getElementById('qa-status');
  const updatedEl = document.getElementById('qa-updated');
  const spinnerEl = document.getElementById('qa-spinner');
  if (!statusEl) return;
  const setStatusClass = (cls) => {
    statusEl.classList.remove('status-ok','status-fail','status-unknown');
    statusEl.classList.add(cls);
  };
  const hideSpinner = () => spinnerEl?.classList.add('is-hidden');
  try {
    const res = await fetch('assets/reports/api-qa/summary.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const s = await res.json();
    const total = s.total ?? 0;
    const passed = s.passed ?? 0;
    const status = s.status || 'unknown';

    statusEl.textContent = `${status.toUpperCase()}: ${passed}/${total}`;
    if (status === 'passed') setStatusClass('status-ok');
    else if (status === 'failed') setStatusClass('status-fail');
    else setStatusClass('status-unknown');

    if (updatedEl && s.generated_at) {
      const t = new Date(s.generated_at);
      const diffMs = Date.now() - t.getTime();
      const mins = Math.floor(diffMs / 60000);
      const hours = Math.floor(mins / 60);
      const days = Math.floor(hours / 24);
      const rel = days > 0 ? `${days}d ago` : hours > 0 ? `${hours}h ago` : `${Math.max(mins,0)}m ago`;
      const dur = s.duration_seconds ? `, ${Math.round(s.duration_seconds)}s` : '';
      updatedEl.textContent = `Updated ${rel}${dur}`;
      updatedEl.classList.add('status-unknown');
      updatedEl.setAttribute('aria-hidden', 'false');
    }
  } catch (e) {
    statusEl.textContent = 'STATUS: UNKNOWN';
    setStatusClass('status-unknown');
    if (updatedEl) updatedEl.textContent = 'Updated —';
  }
})();
