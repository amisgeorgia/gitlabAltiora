// Store Chatbot minimal
// Note: Zustand n'est pas encore installé. Ce fichier fournit une structure simple et typée.

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
}

export const initialChatState: ChatState = {
  messages: [],
  isOpen: false,
};
