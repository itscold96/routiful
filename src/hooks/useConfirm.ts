import { useState } from 'react';
import { useToggle } from './useToggle';

type ResolveFunction = (value: boolean) => void;

export const useConfirm = () => {
  const { toggleValue: isConfirmOpen, toggleDispatch } = useToggle();
  const [confirmMessage, setConfirmMessage] = useState('');
  const [resolver, setResolver] = useState<ResolveFunction | null>(null);

  const confirm = (message: string) => {
    toggleDispatch({ type: 'on' });
    setConfirmMessage(message);

    return new Promise((resolve) => {
      // ok 또는 cancel 클릭 전까지 pending 상태로 유지
      setResolver(() => resolve);
    });
  };

  const releaseResolver = (value: boolean) => {
    if (resolver) {
      resolver(value);
    }
    toggleDispatch({ type: 'off' });
  };

  const onConfirmOk = () => {
    releaseResolver(true);
  };

  const onConfirmCancel = () => {
    releaseResolver(false);
  };

  return {
    isConfirmOpen,
    confirm,
    confirmMessage,
    onConfirmOk,
    onConfirmCancel,
  };
};
