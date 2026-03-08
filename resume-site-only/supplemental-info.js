(() => {
  const LANGUAGE_KEY = "resume-language";
  const LANG_PT = "pt-PT";

  const section = document.getElementById("supplemental-info");
  if (!section) return;

  const metaNode = document.querySelector(".identity .meta");
  const langToggle = document.getElementById("lang-toggle");

  const leftTitleNode = section.querySelector("[data-supp-left-title]");
  const leftItemNodes = section.querySelectorAll("[data-supp-left-item]");
  const rightTitleNode = section.querySelector("[data-supp-right-title]");
  const rightItemNodes = section.querySelectorAll("[data-supp-right-item]");

  const translations = {
    en: {
      metaLine:
        "Cascais, Portugal · +351 962046821 · <a href=\"mailto:danielarosadolealtorresalmeida@gmail.com\">danielarosadolealtorresalmeida@gmail.com</a> · <a href=\"https://danielatorresalmeida.github.io/Portfolio-website/\" target=\"_blank\" rel=\"noopener\">portfolio website</a> · <a href=\"https://github.com/danielatorresalmeida\" target=\"_blank\" rel=\"noopener\">github.com/danielatorresalmeida</a>",
      leftTitle: "Additional Information",
      leftItems: [
        "<strong>Phone:</strong> +351 962046821.",
        "<strong>Education:</strong> 12th Grade, Secretarial &amp; Administrative Work (Secondary Education, Level 3).",
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
      metaLine:
        "Cascais, Portugal · +351 962046821 · <a href=\"mailto:danielarosadolealtorresalmeida@gmail.com\">danielarosadolealtorresalmeida@gmail.com</a> · <a href=\"https://danielatorresalmeida.github.io/Portfolio-website/\" target=\"_blank\" rel=\"noopener\">website do portefólio</a> · <a href=\"https://github.com/danielatorresalmeida\" target=\"_blank\" rel=\"noopener\">github.com/danielatorresalmeida</a>",
      leftTitle: "Informação Adicional",
      leftItems: [
        "<strong>Telefone:</strong> +351 962046821.",
        "<strong>Formação:</strong> 12.º Ano, Secretariado e Trabalho Administrativo (Ensino Secundário, Nível 3).",
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

  function getLanguage() {
    return localStorage.getItem(LANGUAGE_KEY) === LANG_PT ? "pt" : "en";
  }

  function renderSupplementalInfo() {
    const lang = getLanguage();
    const t = translations[lang];

    if (metaNode) metaNode.innerHTML = t.metaLine;
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
