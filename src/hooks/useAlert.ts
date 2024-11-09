import { useState } from 'react';
import { useToggle } from './useToggle';

type ResolveFunction = () => void;

export const useAlert = () => {
  const { toggleValue: isAlertOpen, toggleDispatch } = useToggle();
  const [alertMessage, setAlertMessage] = useState('');
  const [resolver, setResolver] = useState<ResolveFunction | null>(null);

  const alert = (message: string) => {
    toggleDispatch({ type: 'on' });
    setAlertMessage(message);

    return new Promise((resolve) => {
      // 유저 상호작용 전까지 pending 상태로 유지
      setResolver(() => resolve);
    });
  };

  const onCloseAlert = () => {
    if (resolver) {
      resolver();
    }
    toggleDispatch({ type: 'off' });
  };

  return {
    isAlertOpen,
    alert,
    alertMessage,
    onCloseAlert,
  };
};
