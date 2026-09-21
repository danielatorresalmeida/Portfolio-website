// Shared runtime for the generated master CV and company variants.
(() => {
  const payload = document.getElementById('cv-data');
  if (!payload) return;
  const data = JSON.parse(payload.textContent);
  function getStoredValue(key) {
    try {
      return window.localStorage.getItem(key);
    } catch { return null; }
  }
  function setStoredValue(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch { /* Storage may be unavailable in privacy mode. */ }
  }
  const query = new URLSearchParams(location.search);
  let language = query.get('lang') || getStoredValue('resume-language') || 'en';
  language = language === 'pt-PT' ? language : 'en';
  let theme = getStoredValue('resume-theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const langButton = document.getElementById('lang-toggle');
  const themeButton = document.getElementById('theme-toggle');
  const printButton = document.getElementById('print-btn');
  function renderTheme() {
    theme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
    const light = theme === 'dark';
    themeButton.textContent = language === 'en' ? (light ? 'Light theme' : 'Dark theme') : (light ? 'Tema claro' : 'Tema escuro');
    themeButton.setAttribute('aria-label', language === 'en' ? `Switch to ${light ? 'light' : 'dark'} theme` : `Mudar para tema ${light ? 'claro' : 'escuro'}`);
  }
  function render() {
    document.documentElement.lang = language;
    document.getElementById('cv-content').innerHTML = data.contents[language];
    document.getElementById('professional-title').textContent = data.title[language];
    langButton.querySelector('.pill-label').textContent = language === 'en' ? 'PT-PT' : 'EN';
    langButton.setAttribute('aria-label', language === 'en' ? 'Switch language to European Portuguese' : 'Mudar idioma para inglês');
    printButton.textContent = language === 'en' ? 'Print / Save PDF' : 'Imprimir / Guardar PDF';
    printButton.setAttribute('aria-label', language === 'en' ? 'Download CV' : 'Descarregar CV');
    renderTheme();
  }
  function preparePrint() {
    document.querySelectorAll('.contact-links [data-contact-reveal]').forEach(control => control.click());
  }
  langButton.addEventListener('click', () => { language = language === 'en' ? 'pt-PT' : 'en'; setStoredValue('resume-language', language); render(); });
  themeButton.addEventListener('click', () => { theme = theme === 'dark' ? 'light' : 'dark'; setStoredValue('resume-theme', theme); renderTheme(); });
  printButton.addEventListener('click', () => { preparePrint(); window.print(); });
  window.addEventListener('beforeprint', preparePrint);
  render();
  if (query.get('download') === '1') setTimeout(() => { preparePrint(); window.print(); }, 0);
})();
