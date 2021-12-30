import { PaletteMode } from "@mui/material";
import create, { SetState, GetState } from "zustand";

type User = {
  name?: string;
  phone?: string;
  about?: string;
};

const defaults = {
  isLoggedIn: false,
  user: {},
  emojiOpen: false,
  theme: (localStorage.getItem("theme") === "light" ? "light" : "dark") as PaletteMode,
};

type Store = {
  isLoggedIn: boolean;
  user: User;
  emojiOpen: boolean;
  theme: PaletteMode,
  setPlayback: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
  toggleEmojiOpen: () => void;
  setTheme: (theme: PaletteMode) => void;
  reset: () => void;
};

const useStore = create<Store>(
  (set: SetState<Store>, get: GetState<Store>) => ({
    ...defaults,
    setPlayback: (isLoggedIn: boolean) => set({ isLoggedIn }),
    setUser: (user: User) => set({ user }),
    toggleEmojiOpen: () => set({ emojiOpen: !get().emojiOpen }),
    setTheme: (theme: PaletteMode) => set({ theme }),
    reset: () => {
      set(defaults, true);
    }
  })
);

export { useStore };
