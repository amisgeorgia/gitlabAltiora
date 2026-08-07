// Store UI minimal (sidebar, modales, etc.)
// Note: Zustand n'est pas encore installé. Ce fichier fournit une structure simple et typée.

export interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
}

export const initialUIState: UIState = {
  sidebarOpen: false,
  theme: "light",
};
