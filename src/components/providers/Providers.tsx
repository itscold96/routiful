import { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';
import ToastProvider from './ToastProvider';
import AuthProvider from './AuthProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </QueryProvider>
    </AuthProvider>
  );
};
