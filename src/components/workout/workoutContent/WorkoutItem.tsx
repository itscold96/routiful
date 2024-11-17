import { WorkoutWithoutRelatedId } from 'types/workout';
import S from './WorkoutItem.module.scss';
import { Trash2 } from 'lucide-react';
import { useRemoveWorkout } from 'queries/useRemoveWorkout';
import { useToggle } from 'hooks/useToggle';
import EditWorkoutModal from '../workoutModal/edit/EditWorkoutModal';
import classNames from 'classnames';
import { MouseEvent } from 'react';

interface WorkoutItemProps extends WorkoutWithoutRelatedId {
  isEditing: boolean;
}

export default function WorkoutItem({ id, name, reps, sets, order, isEditing }: WorkoutItemProps) {
  const { toggleValue: isEditModalOpen, toggleDispatch } = useToggle();
  const { mutate } = useRemoveWorkout();

  const handleEditModalOpen = () => {
    if (isEditing) {
      toggleDispatch({ type: 'on' });
    }
  };

  const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    mutate(id);
  };

  return (
    <>
      <button data-id={id} className={S.workoutItem} onClick={handleEditModalOpen}>
        <section className={classNames(S.emojiWrapper, { [S.shake]: isEditing })}>
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
      <EditWorkoutModal
        id={id}
        isOpen={isEditModalOpen}
        name={name}
        reps={reps}
        sets={sets}
        onClose={() => toggleDispatch({ type: 'off' })}
      />
    </>
  );
}
