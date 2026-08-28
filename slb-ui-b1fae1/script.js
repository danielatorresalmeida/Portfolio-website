(() => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  const closeNavigation = () => {
    toggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
  };

  toggle?.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav?.classList.toggle("is-open", !isOpen);
  });

  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNavigation));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });

  const decode = (codes) => String.fromCharCode(...codes);
  const email = decode([
    100, 97, 110, 105, 101, 108, 97, 114, 111, 115, 97, 100, 111, 108,
    101, 97, 108, 116, 111, 114, 114, 101, 115, 97, 108, 109, 101, 105,
    100, 97, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109,
  ]);

  const revealEmail = (control, focus = true) => {
    if (!control?.isConnected) return;
      const link = document.createElement("a");
      link.className = control.className;
      link.href = `mailto:${email}`;
      link.textContent = email;
      link.setAttribute("aria-label", `Enviar email para ${email}`);
      control.replaceWith(link);
      if (focus) link.focus();
  };

  document.querySelectorAll("[data-contact-reveal='email']").forEach((control) => {
    control.addEventListener("click", () => revealEmail(control), { once: true });
  });

  window.addEventListener("beforeprint", () => {
    document.querySelectorAll("[data-contact-reveal='email']").forEach((control) => revealEmail(control, false));
  });

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button[type='submit']");
    const initialLabel = button?.textContent;
    if (button) {
      button.disabled = true;
      button.textContent = "A enviar…";
    }
    if (formStatus) formStatus.textContent = "";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Form submission failed");
      contactForm.reset();
      if (formStatus) formStatus.textContent = "Mensagem enviada. Obrigada pelo contacto.";
    } catch {
      if (formStatus) formStatus.textContent = "Não foi possível enviar agora. Revele o email para contactar diretamente.";
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = initialLabel;
      }
    }
  });

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
})();
