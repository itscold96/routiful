import { WorkoutWithoutRelatedId } from 'types/workout';
import S from './WorkoutItem.module.scss';
import { Trash2 } from 'lucide-react';
import { useRemoveWorkout } from 'queries/useRemoveWorkout';

interface WorkoutItemProps extends WorkoutWithoutRelatedId {
  isEditing: boolean;
}

export default function WorkoutItem({ id, name, reps, sets, order, isEditing }: WorkoutItemProps) {
  const { mutate } = useRemoveWorkout();

  const handleRemoveClick = () => {
    mutate(id);
  };

  return (
    <button data-id={id} className={S.workoutItem}>
      <section className={S.emojiWrapper}>
        {/* order는 0부터 시작 */}
        <p>{order + 1}</p>
      </section>

      <section className={S.workoutDescription}>
        <div className={S.content}>
          <p className={S.name}>{name}</p>
          <div className={S.detail}>
            <p>sets: {sets}</p>
            <p>reps: {reps}</p>
          </div>
        </div>

        {isEditing && (
          <button onClick={handleRemoveClick} className={S.trash}>
            <Trash2 />
          </button>
        )}
      </section>
    </button>
  );
}
