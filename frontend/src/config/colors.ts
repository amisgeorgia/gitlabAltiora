import { AppThemeColors, BrandPalette, InteractionColors, TypographyColors } from "@/types/theme.types";

/**
 * Palette de couleurs principale (Brand Palette)
 */
export const BRAND_COLORS: BrandPalette = {
  primary: "#0B1F4D",
  brandGold: "#D4AF37",
  mediumBleu: "#0B3D7A",
  darkBleu: "#06132F",
  darkGold: "#B88A1A",
  neutralGray: "#5D5D5D",
  accentRed: "#DF3434",
} as const;

/**
 * Couleurs typographiques
 */
export const TYPOGRAPHY_COLORS: TypographyColors = {
  titres: "#131313",
  paragraphes: "#5D5D5D",
  secondesTitres: "#0B1F4D",
  tertiaire: "#D4AF37",
} as const;

/**
 * Couleurs d'interaction (boutons, liens, hover)
 */
export const INTERACTION_COLORS: InteractionColors = {
  link: "#1d70b8",
  linkHover: "#003078",
  boutonNormal: "#0B1F4D",
  boutonSurvol: "#06132F",
  boutonSecondaire: "#DCDCDC",
} as const;

/**
 * Thème complet consolidé
 */
export const APP_COLORS: AppThemeColors = {
  brand: BRAND_COLORS,
  typography: TYPOGRAPHY_COLORS,
  interaction: INTERACTION_COLORS,
} as const;
