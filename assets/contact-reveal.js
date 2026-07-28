(() => {
  const decode = (codes) => String.fromCharCode(...codes);
  const email = decode([
    100, 97, 110, 105, 101, 108, 97, 114, 111, 115, 97, 100, 111, 108,
    101, 97, 108, 116, 111, 114, 114, 101, 115, 97, 108, 109, 101, 105,
    100, 97, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109,
  ]);
  const phoneDigits = decode([51, 53, 49, 57, 54, 50, 48, 52, 54, 56, 50, 49]);
  const phoneDisplay = `+${phoneDigits.slice(0, 3)} ${phoneDigits.slice(3, 6)} ${phoneDigits.slice(6, 9)} ${phoneDigits.slice(9)}`;
  const whatsappMessage =
    "Hi Daniela, I found your portfolio and would like to connect.";

  const contactDetails = {
    email: {
      label: email,
      href: `mailto:${email}`,
    },
    phone: {
      label: phoneDisplay,
      href: `tel:+${phoneDigits}`,
    },
    whatsapp: {
      label: phoneDisplay,
      href: `https://wa.me/${phoneDigits}?text=${encodeURIComponent(whatsappMessage)}`,
      target: "_blank",
      rel: "noopener noreferrer",
    },
  };

  function createContactLink(control) {
    const detail = contactDetails[control.dataset.contactReveal];
    if (!detail) return null;

    const link = document.createElement("a");

    for (const attribute of control.attributes) {
      if (
        attribute.name === "type" ||
        attribute.name === "data-contact-reveal" ||
        attribute.name === "data-i18n"
      ) {
        continue;
      }
      link.setAttribute(attribute.name, attribute.value);
    }

    link.classList.remove("contact-reveal");
    link.classList.add("contact-revealed");
    link.href = detail.href;
    if (detail.target) link.target = detail.target;
    if (detail.rel) link.rel = detail.rel;

    while (control.firstChild) {
      link.append(control.firstChild);
    }

    const valueNode = link.querySelector("[data-contact-value]");
    if (valueNode) {
      valueNode.textContent = detail.label;
      valueNode.removeAttribute("data-contact-value");
    } else {
      link.textContent = detail.label;
    }

    const action =
      control.dataset.contactReveal === "email"
        ? "Send an email"
        : control.dataset.contactReveal === "phone"
          ? "Call this number"
          : "Open WhatsApp chat";
    link.setAttribute("aria-label", `${action}: ${detail.label}`);
    control.replaceWith(link);
    return link;
  }

  function revealAllContacts() {
    document
      .querySelectorAll("[data-contact-reveal]")
      .forEach((control) => createContactLink(control));
  }

  document.addEventListener("click", (event) => {
    const control = event.target.closest("[data-contact-reveal]");
    if (!control) return;
    event.preventDefault();
    createContactLink(control)?.focus();
  });

  window.addEventListener("beforeprint", revealAllContacts);
})();
