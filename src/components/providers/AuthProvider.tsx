import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'stores/auth/useAuthStore';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // 로그아웃 시에는 로그인 페이지로 돌아가도록 함
      navigation('/', { replace: true });
    }
  }, [isLoggedIn, location.pathname]);

  return <>{children}</>;
}
