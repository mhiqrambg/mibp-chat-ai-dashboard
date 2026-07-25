import { create } from "zustand";
import { MOCK_CHATS, generateMockApiResponse } from "@/data/mockData";

export const useChatStore = create((set, get) => ({
  // Chat state
  activeChat: null,
  isThinking: false,

  // UI state
  isMobileDrawerOpen: false,
  isSidebarOpen: true,
  isSearchOpen: false,
  isSettingsOpen: false,
  isUpgradeOpen: false,
  isUploadOpen: false,
  isToolsOpen: false,
  isVoiceOpen: false,
  isProfileOpen: false,
  isHelpOpen: false,

  toggleSidebar: (open) =>
    set((state) => ({
      isSidebarOpen: open !== undefined ? open : !state.isSidebarOpen,
    })),

  // Input state
  activeTools: false,
  deepThink: false,
  theme: "system",

  // ── Modal toggles ──
  toggleModal: (key, open) =>
    set((state) => ({
      [key]: open !== undefined ? open : !state[key],
    })),

  toggleMobileDrawer: (open) =>
    set((state) => ({
      isMobileDrawerOpen: open !== undefined ? open : !state.isMobileDrawerOpen,
    })),

  toggleSearchModal: (open) =>
    set((state) => ({
      isSearchOpen: open !== undefined ? open : !state.isSearchOpen,
    })),

  toggleTools: () => set((state) => ({ activeTools: !state.activeTools, isToolsOpen: !state.isToolsOpen })),
  toggleDeepThink: () => set((state) => ({ deepThink: !state.deepThink })),

  // ── Theme actions ──
  setTheme: (newTheme) => {
    set({ theme: newTheme });
    if (typeof window !== "undefined") {
      localStorage.setItem("mibp-theme", newTheme);
      const root = document.documentElement;
      if (newTheme === "system") {
        root.removeAttribute("data-theme");
      } else {
        root.setAttribute("data-theme", newTheme);
      }
    }
  },

  initTheme: () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("mibp-theme") || "system";
      get().setTheme(savedTheme);
    }
  },

  // ── Chat Actions ──
  selectChat: (title) => {
    if (MOCK_CHATS[title]) {
      set({ activeChat: JSON.parse(JSON.stringify(MOCK_CHATS[title])) });
    }
  },

  newChat: () => {
    set({ activeChat: null, isThinking: false });
  },

  sendMessage: (text) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMessage = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: text,
      time: timeStr,
    };

    const currentChat = get().activeChat;
    let newChatState;

    if (!currentChat) {
      newChatState = {
        id: "chat-new-" + Date.now(),
        title: text.length > 25 ? text.slice(0, 25) + "..." : text,
        messages: [userMessage],
      };
    } else {
      newChatState = {
        ...currentChat,
        messages: [...currentChat.messages, userMessage],
      };
    }

    set({ activeChat: newChatState, isThinking: true });

    setTimeout(() => {
      const aiResponse = generateMockApiResponse(text);
      const updatedChat = get().activeChat;
      if (updatedChat) {
        set({
          activeChat: {
            ...updatedChat,
            messages: [...updatedChat.messages, aiResponse],
          },
          isThinking: false,
        });
      } else {
        set({ isThinking: false });
      }
    }, 1200);
  },
}));
