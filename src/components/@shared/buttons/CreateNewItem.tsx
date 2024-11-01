import S from './CreateNewItem.module.scss';
import { Plus } from 'lucide-react';

interface CreateNewItemProps {
  text: string;
  onCreateClick: () => void;
}

export default function CreateNewItem({ text, onCreateClick }: CreateNewItemProps) {
  return (
    <button onClick={onCreateClick} className={S.createNewItemButton}>
      <div className={S.emojiWrapper}>
        <Plus size={40} strokeWidth={1.4} />
      </div>
      <div>{text}</div>
    </button>
  );
}
