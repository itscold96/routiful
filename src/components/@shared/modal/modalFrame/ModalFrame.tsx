import S from './ModalFrame.module.scss';
import { ReactNode } from 'react';
import BackDrop from '../backdrop/BackDrop';
import Portal from '../../portal/Portal';
import { useHidden } from 'hooks/useHidden';
import classNames from 'classnames';

interface ModalFrameProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  backdropClassName?: string;
}

export default function ModalFrame({ isOpen, onClose, children, backdropClassName }: ModalFrameProps) {
  const { isHidden } = useHidden(isOpen);
  return (
    <>
      {!isHidden && (
        <Portal>
          <BackDrop onClose={onClose} className={backdropClassName} />
          <div className={S.modalFrame}>
            <div className={classNames(isOpen ? S.fadeIn : S.fadeOut)}>{children}</div>
          </div>
        </Portal>
      )}
    </>
  );
}
