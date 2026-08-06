import { describe, expect, it } from "vitest";
import { generateSlug } from "@/utils/generate-slug";

describe("generateSlug", () => {
  it("doit convertir un titre en slug propre avec tirets", () => {
    const input = "Développement Web Moderne avec Next.js !";
    const expected = "developpement-web-moderne-avec-nextjs";
    expect(generateSlug(input)).toBe(expected);
  });

  it("doit gérer les caractères accentués et espaces multiples", () => {
    const input = "  Écosystème &   Solutions   Numériques  ";
    const expected = "ecosysteme-solutions-numeriques";
    expect(generateSlug(input)).toBe(expected);
  });
});
