import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import ToastProvider from './ToastProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <ToastProvider>{children}</ToastProvider>
    </QueryProvider>
  );
};
