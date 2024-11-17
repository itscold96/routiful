import S from './WorkoutItem.module.scss';

interface WorkoutItemProps {
  id: string;
  name: string;
  sets: number;
  reps: number;
  order: number;
}

export default function WorkoutItem({ id, name, reps, sets, order }: WorkoutItemProps) {
  return (
    <button data-id={id} className={S.workoutItem}>
      <div className={S.emojiWrapper}>
        {/* order는 0부터 시작 */}
        <p>{order + 1}</p>
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
