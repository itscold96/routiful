import { ReactNode, useEffect } from 'react';
import S from './Toast.module.scss';
import { Toast as ToastProps, ToastTypes } from 'types/toast';
import { useToggle } from 'hooks/useToggle';
import { useToastAction } from 'stores/toast/action/useToastAction';
import classNames from 'classnames';

const DELAY = 4 * 1000; // 토스트 삭제 딜레이 4초
const EXIT_ANIMATION_DELAY = 600; // 자연스러운 삭제 애니메이션을 위한 유예 시간 0.6초

export default function Toast({ id, type, message }: ToastProps) {
  const { toggleValue: isExit, toggleDispatch } = useToggle();
  const { removeToast } = useToastAction();

  useEffect(() => {
    const timerId = setTimeout(() => {
      removeToast(id);
    }, DELAY);

    const exitTimerId = setTimeout(() => {
      toggleDispatch({ type: 'on' });
    }, DELAY - EXIT_ANIMATION_DELAY);

    return () => {
      clearTimeout(timerId);
      clearTimeout(exitTimerId);
    };
  }, []);

  return (
    <div
      className={classNames(S.toast, {
        [S.success]: type === 'success',
        [S.warn]: type === 'warn',
        [S.error]: type === 'error',
        [S.exit]: isExit,
      })}
    >
      <div className={S.content}>
        {ToastIcon[type]}
        <p className={S.message}>{message}</p>
      </div>
    </div>
  );
}

const ToastIcon: Record<ToastTypes, ReactNode> = {
  success: <img src={'/images/icons/icon-success.svg'} alt="성공 메시지 아이콘" height={25} width={25} />,
  warn: (
    <img src={'/images/icons/icon-warn.svg'} alt="경고 메시지 아이콘" height={25} width={25} className={S.yellow} />
  ),
  error: <img src={'/images/icons/icon-error.svg'} alt="실패 메시지 아이콘" height={25} width={25} />,
};
