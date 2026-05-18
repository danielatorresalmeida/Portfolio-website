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
      rightTitle: "Preferred Roles & Availability",
      rightItems: [
        "<strong>Preferred Roles:</strong> Junior Web Developer and Junior Frontend Developer roles, especially with HTML, CSS, JavaScript/TypeScript, responsive UI, and QA collaboration.",
        "<strong>Availability:</strong> Available for interviews and available for hybrid work in Lisbon.",
        "<strong>Opportunity Type:</strong> Open to discussing permanent or contract opportunities depending on the fit.",
        "<strong>Level:</strong> Junior / entry-level candidate with practical project experience and strong motivation to keep improving.",
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
      rightTitle: "Funções Preferidas e Disponibilidade",
      rightItems: [
        "<strong>Funções preferidas:</strong> Junior Web Developer e Junior Frontend Developer, com foco em HTML, CSS, JavaScript/TypeScript, interfaces responsivas e colaboracao com QA.",
        "<strong>Disponibilidade:</strong> disponivel para entrevistas e para modelo hibrido em Lisboa.",
        "<strong>Tipo de oportunidade:</strong> aberta a oportunidades permanentes ou contrato, dependendo do enquadramento.",
        "<strong>Nível:</strong> candidata junior / entry-level com experiência prática em projetos e forte motivação para continuar a evoluir.",
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
