import { useAuthStore } from '../useAuthStore';

export const useAuthAction = () => {
  return useAuthStore((state) => state.action);
};
