import S from './WorkoutItem.module.scss';
import { Dumbbell } from 'lucide-react';

interface WorkoutItemProps {
  id: string;
  name: string;
  sets: number;
  reps: number;
}

export default function WorkoutItem({ id, name, reps, sets }: WorkoutItemProps) {
  return (
    <button data-id={id} className={S.workoutItem}>
      <div className={S.emojiWrapper}>
        <Dumbbell className={S.icon} size={28} strokeWidth={1.8} />
      </div>
      <div className={S.workoutDetail}>
        <p>{name}</p>
        <div className={S.detail}>
          <p>sets: {sets}</p>
          <p>reps: {reps}</p>
        </div>
      </div>
    </button>
  );
}
