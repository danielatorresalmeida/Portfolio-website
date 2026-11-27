import { describe, expect, it } from "vitest";
import { profile, localize } from "../resume/data/base.mjs";

describe("evidenced skill categories", () => {
  it("places external API integration under demonstrated backend experience", () => {
    for (const language of ["en", "pt-PT"]) {
      const backend = profile.skills.backend.items.map((item) => localize(item, language));
      const other = profile.skills.additional.items.map((item) => localize(item, language));
      const skill = language === "en" ? "External API integration" : "Integração de APIs externas";
      expect(backend).toContain(skill);
      expect(other).not.toContain(skill);
    }
  });
  it("labels only specific learning/exposure items as such", () => {
    expect(profile.skills.additional.title.en).toBe("Other tools & technologies");
    expect(profile.skills.additional.title["pt-PT"]).toBe("Outras ferramentas e tecnologias");
    expect(profile.skills.additional.items.map((x) => localize(x, "pt-PT"))).toContain("C# (em formação)");
  });
});
