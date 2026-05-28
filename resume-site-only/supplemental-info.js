(() => {
  const LANGUAGE_KEY = "resume-language";
  const LANG_PT = "pt-PT";

  // Optional block: if this section does not exist, skip all setup.
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
        "<strong>Preferred Roles:</strong> Credit Manager / Credit Analyst roles, with strong focus on client support, risk awareness, and process quality.",
        "<strong>Availability:</strong> Available for interviews and currently exploring new opportunities in Lisbon (hybrid/on-site).",
        "<strong>Opportunity Type:</strong> Available for permanent opportunities or contract-based projects, depending on the role profile, collaboration context, and conditions presented.",
        "<strong>Profile Level:</strong> Multidisciplinary professional with transferable experience in analysis, communication, and operational rigor.",
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
        "<strong>Funções preferidas:</strong> Gestora de Crédito / Analista de Crédito, com foco em apoio ao cliente, sensibilidade a risco e qualidade de processo.",
        "<strong>Disponibilidade:</strong> disponível para entrevistas e atualmente a explorar novas oportunidades em Lisboa (híbrido/presencial).",
        "<strong>Tipo de oportunidade:</strong> Disponível para integrar oportunidades permanentes ou projetos em regime de contrato, conforme o perfil da função, o contexto da colaboração e as condições apresentadas.",
        "<strong>Perfil:</strong> profissional multidisciplinar com experiência transversal em análise, comunicação e rigor operacional.",
      ],
    },
  };

  // Safe storage read for restricted/privacy browser contexts.
  function getStoredLanguage() {
    try {
      return window.localStorage.getItem(LANGUAGE_KEY);
    } catch {
      return null;
    }
  }

  // Prefer stored language and fall back to the document language.
  function getLanguage() {
    const storedLanguage = getStoredLanguage();
    if (storedLanguage === LANG_PT) return "pt";
    return document.documentElement.lang === LANG_PT ? "pt" : "en";
  }

  // Render headings and list items for the active language.
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
  // Let the resume script finish switching language, then refresh this block.
  langToggle?.addEventListener("click", () => {
    setTimeout(renderSupplementalInfo, 0);
  });
})();
