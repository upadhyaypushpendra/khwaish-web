import create, { SetState, GetState } from "zustand";

type Store = {
  isLoggedIn: boolean;
};

const useStore = create<Store>(
  (set: SetState<Store>, get: GetState<Store>) => ({
    isLoggedIn: false,
    setPlayback: (isLoggedIn: boolean) => set({ isLoggedIn })
  })
);

export default useStore;
