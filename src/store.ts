import create, { SetState, GetState } from "zustand";

const defaults = {
  isLoggedIn: false,
  user: {},
  emojiOpen: false
};

type User = {
  name?: string;
  phone?: string;
  about?: string;
};

type Store = {
  isLoggedIn: boolean;
  user: User;
  emojiOpen: boolean;
  setPlayback: (isLoggedIn: boolean) => void;
  setUser: (user: User) => void;
  toggleEmojiOpen: () => void;
  reset: () => void;
};

const useStore = create<Store>(
  (set: SetState<Store>, get: GetState<Store>) => ({
    ...defaults,
    setPlayback: (isLoggedIn: boolean) => set({ isLoggedIn }),
    setUser: (user: User) => set({ user }),
    toggleEmojiOpen: () => set({ emojiOpen: !get().emojiOpen }),
    reset: () => {
      set(defaults, true);
    }
  })
);

export { useStore };
