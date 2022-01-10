import { PaletteMode, Tab } from "@mui/material";
import create, { SetState, GetState } from "zustand";
import { AppTab } from "./types";

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
    tab: AppTab.chats,
};

type Store = {
    isLoggedIn: boolean;
    user: User;
    emojiOpen: boolean;
    theme: PaletteMode;
    tab: string;
    setPlayback: (isLoggedIn: boolean) => void;
    setUser: (user: User) => void;
    toggleEmojiOpen: () => void;
    setTheme: (theme: PaletteMode) => void;
    setTab: (tab: AppTab) => void;
    reset: () => void;
};

const useStore = create<Store>(
    (set: SetState<Store>, get: GetState<Store>) => ({
        ...defaults,
        setPlayback: (isLoggedIn: boolean) => set({ isLoggedIn }),
        setUser: (user: User) => set({ user }),
        toggleEmojiOpen: () => set({ emojiOpen: !get().emojiOpen }),
        setTheme: (theme: PaletteMode) => set({ theme }),
        setTab: (tab: AppTab) => set({ tab }),
        reset: () => {
            set(defaults, true);
        }
    })
);

export { useStore };
