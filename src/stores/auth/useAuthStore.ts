import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isLoggedIn: boolean;
  action: {
    setIsLoggedIn: (status: boolean) => void;
  };
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      action: {
        setIsLoggedIn: (status) => set({ isLoggedIn: status }),
      },
    }),
    {
      name: 'Auth',
    },
  ),
);
