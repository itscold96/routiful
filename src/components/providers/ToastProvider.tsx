import Portal from 'components/@shared/overlay/portal/Portal';
import ToastList from 'components/@shared/toast/ToastList';
import { ReactNode } from 'react';

export default function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Portal elementId="toast">
        <ToastList />
      </Portal>
      {children}
    </>
  );
}
