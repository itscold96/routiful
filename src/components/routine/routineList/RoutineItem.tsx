import { Link } from 'react-router-dom';
import S from './RoutineItem.module.scss';
import { ListVideo } from 'lucide-react';

interface RoutineItemProps {
  id: string;
  name: string;
}

export default function RoutineItem({ id, name }: RoutineItemProps) {
  return (
    <Link className={S.routineItem} to={`/routine/${id}/?name=${name}`}>
      <div className={S.emojiWrapper}>
        <ListVideo size={36} strokeWidth={1.8} />
      </div>
      <div className={S.name}>{name}</div>
    </Link>
  );
}
