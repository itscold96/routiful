import S from './BackDrop.module.scss';
import classNames from 'classnames';

interface BackDropProps {
  onClose: () => void;
  className?: string;
}

export default function BackDrop({ onClose, className }: BackDropProps) {
  return <div onClick={onClose} className={classNames(S.backdrop, className)} />;
}
