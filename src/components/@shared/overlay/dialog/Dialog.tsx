import { ReactNode } from 'react';
import S from './Dialog.module.scss';
import ModalFrame from '../modalFrame/ModalFrame';
import TypeIcon from './TypeIcon';

interface DialogProps {
  children: ReactNode;
  isDialogOpen: boolean;
  message: string;
  type?: 'success' | 'warn' | 'error';
}

export default function Dialog({ children, isDialogOpen, message, type }: DialogProps) {
  return (
    <ModalFrame isOpen={isDialogOpen} onClose={() => null}>
      <div className={S.dialog}>
        {type && <TypeIcon type={type} />}
        <div className={S.message}>{message}</div>
        <div className={S.contentContainer}>{children}</div>
      </div>
    </ModalFrame>
  );
}
