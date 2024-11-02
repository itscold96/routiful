import S from './ModalFrame.module.scss';
import { ReactNode } from 'react';
import BackDrop from '../backdrop/BackDrop';
import Portal from '../../portal/Portal';
import { useHidden } from 'hooks/useHidden';
import classNames from 'classnames';
import { X } from 'lucide-react';

interface ModalFrameProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  backdropClassName?: string;
}

export default function ModalFrame({ title, isOpen, onClose, children, backdropClassName }: ModalFrameProps) {
  const { isHidden } = useHidden(isOpen);
  return (
    <>
      {!isHidden && (
        <Portal>
          <BackDrop onClose={onClose} className={backdropClassName} />
          <div className={S.modalFrame}>
            <div className={classNames(S.modalContent, isOpen ? S.fadeIn : S.fadeOut)}>
              <div className={S.modalTitleContainer}>
                <h2 className={S.modalTitle}>{title}</h2>
                <button className={S.closeModalButton} onClick={onClose}>
                  <X size={30} strokeWidth={3} />
                </button>
              </div>
              {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
