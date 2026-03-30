(() => {
  const LANGUAGE_KEY = "resume-language";
  const LANG_PT = "pt-PT";

  const section = document.getElementById("supplemental-info");
  if (!section) return;

  const langToggle = document.getElementById("lang-toggle");

  const leftTitleNode = section.querySelector("[data-supp-left-title]");
  const leftItemNodes = section.querySelectorAll("[data-supp-left-item]");
  const rightTitleNode = section.querySelector("[data-supp-right-title]");
  const rightItemNodes = section.querySelectorAll("[data-supp-right-item]");

  const translations = {
    en: {
      leftTitle: "Additional Information",
      leftItems: [
        "<strong>Phone:</strong> +351 962046821.",
        "<strong>Email:</strong> danielarosadolealtorresalmeida@gmail.com.",
        "<strong>Education:</strong> 12th Grade (Secondary Education, Level 3).",
        "<strong>Languages:</strong> Portuguese (native) and English (oral, written, reading: very good).",
        "<strong>Driver's License:</strong> Light Vehicles.",
      ],
      rightTitle: "Availability, Preferences & Interests",
      rightItems: [
        "<strong>Availability:</strong> Immediate availability, full-time work.",
        "<strong>Work Preferences:</strong> Fixed-term contract, daytime schedule.",
        "<strong>Mobility:</strong> Available to travel and relocate within Portugal.",
        "<strong>Professional Interests:</strong> Web Developer, Front-End Developer.",
      ],
    },
    pt: {
      leftTitle: "Informação Adicional",
      leftItems: [
        "<strong>Telefone:</strong> +351 962046821.",
        "<strong>Email:</strong> danielarosadolealtorresalmeida@gmail.com.",
        "<strong>Formação:</strong> 12.º Ano (Ensino Secundário, Nível 3).",
        "<strong>Idiomas:</strong> Português (língua materna) e Inglês (oral, escrita e leitura: muito bom).",
        "<strong>Carta de Condução:</strong> Ligeiros.",
      ],
      rightTitle: "Disponibilidade, Preferências e Interesses",
      rightItems: [
        "<strong>Disponibilidade:</strong> imediata e para trabalho a tempo completo.",
        "<strong>Preferências de Trabalho:</strong> contrato a termo certo e horário diurno.",
        "<strong>Mobilidade:</strong> disponibilidade para viajar e mobilidade geográfica em Portugal.",
        "<strong>Áreas de Interesse:</strong> Web Developer e Front-End Developer.",
      ],
    },
  };

  function getStoredLanguage() {
    try {
      return window.localStorage.getItem(LANGUAGE_KEY);
    } catch {
      return null;
    }
  }

  function getLanguage() {
    const storedLanguage = getStoredLanguage();
    if (storedLanguage === LANG_PT) return "pt";
    return document.documentElement.lang === LANG_PT ? "pt" : "en";
  }

  function renderSupplementalInfo() {
    const lang = getLanguage();
    const t = translations[lang];

    if (leftTitleNode) leftTitleNode.textContent = t.leftTitle;
    if (rightTitleNode) rightTitleNode.textContent = t.rightTitle;

    leftItemNodes.forEach((node, index) => {
      node.innerHTML = t.leftItems[index] || "";
    });

    rightItemNodes.forEach((node, index) => {
      node.innerHTML = t.rightItems[index] || "";
    });
  }

  renderSupplementalInfo();
  langToggle?.addEventListener("click", () => {
    setTimeout(renderSupplementalInfo, 0);
  });
})();
