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
      name: 'auth-storage',
      // zustand/persist를 사용할 때, 함수와 같은 직렬화 불가능한 데이터는 상태 정의에서 유지하도록 처리해야 함
      merge: (persistedState, currentState) => {
        const typedPersistedState = persistedState as Partial<AuthStore>;
        return {
          ...currentState,
          ...typedPersistedState,
          action: currentState.action, // 항상 action 유지
        };
      },
    },
  ),
);

// export const useAuthStore = create<AuthStore>((set) => ({
//   isLoggedIn: false,
//   action: {
//     setIsLoggedIn: (status) => set({ isLoggedIn: status }),
//   },
// }));
