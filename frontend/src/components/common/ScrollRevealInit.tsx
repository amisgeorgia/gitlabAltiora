"use client";

import { useEffect } from "react";

export function ScrollRevealInit() {
  useEffect(() => {
    // ScrollReveal ne fonctionne que côté client (navigateur)
    if (typeof window === "undefined") return;

    const initScrollReveal = async () => {
      try {
        const ScrollReveal = (await import("scrollreveal")).default;

        const sr = ScrollReveal({
          origin: "bottom",
          distance: "40px",
          duration: 900,
          delay: 100,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          reset: false,
          mobile: true,
        });

        // 1. Éléments depuis le haut (ex: Header)
        sr.reveal(".sr-fade-down", {
          origin: "top",
          distance: "30px",
          duration: 900,
          delay: 50,
        });

        // 2. Éléments généraux : Fade Up
        sr.reveal(".sr-fade-up", {
          origin: "bottom",
          distance: "40px",
          duration: 900,
        });

        // 3. Éléments depuis la gauche
        sr.reveal(".sr-fade-left", {
          origin: "left",
          distance: "50px",
          duration: 1000,
        });

        // 4. Éléments depuis la droite
        sr.reveal(".sr-fade-right", {
          origin: "right",
          distance: "50px",
          duration: 1000,
        });

        // 5. Cartes, statistiques et colonnes échelonnées (Stagger)
        sr.reveal(".sr-stagger", {
          origin: "bottom",
          distance: "35px",
          duration: 800,
          interval: 120,
        });

        // 6. Éléments avec léger effet de zoom / Scale
        sr.reveal(".sr-scale", {
          scale: 0.94,
          distance: "0px",
          duration: 850,
          interval: 100,
        });

        // 7. En-têtes de sections
        sr.reveal(".sr-header", {
          origin: "bottom",
          distance: "30px",
          duration: 800,
        });
      } catch (error) {
        console.error(
          "Erreur lors de l'initialisation de ScrollReveal :",
          error
        );
      }
    };

    const timeoutId = setTimeout(() => {
      initScrollReveal();
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}