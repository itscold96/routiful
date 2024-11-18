import { ToastStore } from 'types/toast';
import { create } from 'zustand';

export const useToastStore = create<ToastStore>((set) => ({
  toastList: [],
  action: {
    addToast: (newToast) => {
      set((prevState) => {
        // 토스트 개수 3개 이하로 제한
        if (prevState.toastList.length >= 10) {
          return { toastList: [...prevState.toastList] };
        }
        return { toastList: [...prevState.toastList, { ...newToast, id: Date.now().toString() }] };
      });
    },
    removeToast: (id) => {
      set((prevState) => {
        return { toastList: prevState.toastList.filter((toast) => toast.id !== id) };
      });
    },
  },
}));
