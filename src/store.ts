import { PaletteMode } from "@mui/material";
import create from "zustand";
import { persist } from "zustand/middleware";
import { ChatsSubSection, Friend, Section, SubSection } from "./types";

type User = {
    id?: string;
    name?: string;
    phone?: string;
    about?: string;
};

const defaults = {
    isLoggedIn: false,
    user: {},
    emojiOpen: false,
    theme: (localStorage.getItem("theme") === "light" ? "light" : "dark") as PaletteMode,
    section: Section.chats,
    subSection: ChatsSubSection.list,
    activeChat: null,
};

type Store = {
    isLoggedIn: boolean;
    user: User;
    emojiOpen: boolean;
    theme: PaletteMode;
    section: Section;
    subSection: SubSection;
    activeChat: Friend | null;
    setLoggedIn: (isLoggedIn: boolean) => void;
    setUser: (user: User) => void;
    toggleEmojiOpen: () => void;
    setTheme: (theme: PaletteMode) => void;
    setSection: (section: Section) => void;
    setSubSection: (section: SubSection) => void;
    setActiveChat: (activeChat: Friend) => void;
    reset: () => void;
};

const useStore = create<Store>(persist(
    (set, get) => ({
        ...defaults,
        setLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
        setUser: (user: User) => set({ user }),
        toggleEmojiOpen: () => set({ emojiOpen: !get().emojiOpen }),
        setTheme: (theme: PaletteMode) => set({ theme }),
        setSection: (section: Section) => set({ section }),
        setSubSection: (subSection: SubSection) => set({ subSection }),
        setActiveChat: (activeChat: Friend) => set({ activeChat }),
        reset: () => {
            set({
                ...defaults,
                setLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
                setUser: (user: User) => set({ user }),
                toggleEmojiOpen: () => set({ emojiOpen: !get().emojiOpen }),
                setTheme: (theme: PaletteMode) => set({ theme }),
                setSection: (section: Section) => set({ section }),
                setSubSection: (subSection: SubSection) => set({ subSection }),
                setActiveChat: (activeChat: Friend) => set({ activeChat }),
            }, true);
        }
    }),
    {
        name: "main-store", // unique name
        getStorage: () => sessionStorage, // (optional) by default, 'localStorage' is used
    })
);

export default useStore;