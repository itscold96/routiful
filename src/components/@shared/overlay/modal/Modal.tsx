import { ReactNode } from 'react';
import S from './Modal.module.scss';
import { X } from 'lucide-react';
import ModalFrame from '../modalFrame/ModalFrame';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  backdropClassName?: string;
}

export default function Modal({ title, isOpen, onClose, children, backdropClassName }: ModalProps) {
  return (
    <ModalFrame isOpen={isOpen} onClose={onClose} backdropClassName={backdropClassName}>
      <div className={S.modalTitleContainer}>
        <h2 className={S.modalTitle}>{title}</h2>
        <button className={S.closeModalButton} onClick={onClose}>
          <X size={30} strokeWidth={3} />
        </button>
      </div>
      {children}
    </ModalFrame>
  );
}
