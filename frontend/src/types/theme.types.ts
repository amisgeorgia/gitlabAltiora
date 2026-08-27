/**
 * Types TypeScript pour la charte graphique et la palette de couleurs d'ALTIORA CONNECT.
 */

export interface BrandPalette {
  /** Couleur principale / Corporate (#0B1F4D) */
  primary: "#0B1F4D";
  /** Doré principal de la marque (#D4AF37) */
  brandGold: "#D4AF37";
  /** Bleu moyen (#0B3D7A) */
  mediumBleu: "#0B3D7A";
  /** Bleu très sombre (#06132F) */
  darkBleu: "#06132F";
  /** Doré sombre (#B88A1A) */
  darkGold: "#B88A1A";
  /** Gris neutre pour paragraphes (#5D5D5D) */
  neutralGray: "#5D5D5D";
  /** Rouge d'accent / alerte (#DF3434) */
  accentRed: "#DF3434";
}

export interface TypographyColors {
  /** Couleur des titres principaux (#131313) */
  titres: "#131313";
  /** Couleur des paragraphes (#5D5D5D) */
  paragraphes: "#5D5D5D";
  /** Couleur des seconds titres (#0B1F4D) */
  secondesTitres: "#0B1F4D";
  /** Couleur tertiaire (#D4AF37) */
  tertiaire: "#D4AF37";
}

export interface InteractionColors {
  /** Couleur des liens (#1d70b8) */
  link: "#1d70b8";
  /** Couleur des liens au survol (#003078) */
  linkHover: "#003078";
  /** Bouton normal primaire (#0B1F4D) */
  boutonNormal: "#0B1F4D";
  /** Bouton primaire au survol (#06132F) */
  boutonSurvol: "#06132F";
  /** Bouton normal secondaire / clair (#DCDCDC) */
  boutonSecondaire: "#DCDCDC";
}

export interface AppThemeColors {
  brand: BrandPalette;
  typography: TypographyColors;
  interaction: InteractionColors;
}

export type ColorKey =
  | "primary"
  | "brandGold"
  | "mediumBleu"
  | "darkBleu"
  | "darkGold"
  | "neutralGray"
  | "accentRed"
  | "titres"
  | "paragraphes"
  | "secondesTitres"
  | "tertiaire"
  | "link"
  | "linkHover"
  | "boutonNormal"
  | "boutonSurvol"
  | "boutonSecondaire";
