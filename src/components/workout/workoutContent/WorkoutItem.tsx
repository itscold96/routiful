import { WorkoutWithoutRelatedId } from 'types/workout';
import S from './WorkoutItem.module.scss';
import { Trash2 } from 'lucide-react';
import { useRemoveWorkout } from 'queries/useRemoveWorkout';
import { useToggle } from 'hooks/useToggle';
import EditWorkoutModal from '../workoutModal/edit/EditWorkoutModal';
import classNames from 'classnames';
import { MouseEvent } from 'react';
import { useToastAction } from 'stores/toast/action/useToastAction';
import { useConfirm } from 'hooks/useConfirm';
import Dialog from 'components/@shared/overlay/dialog/Dialog';

interface WorkoutItemProps extends WorkoutWithoutRelatedId {
  isEditing: boolean;
}

export default function WorkoutItem({ id, name, reps, sets, order, isEditing }: WorkoutItemProps) {
  const { toggleValue: isEditModalOpen, toggleDispatch } = useToggle();
  const { mutate } = useRemoveWorkout();
  const { confirm, confirmMessage, isConfirmOpen, onConfirmCancel, onConfirmOk } = useConfirm();
  const { addToast } = useToastAction();

  const handleEditModalOpen = () => {
    if (isEditing) {
      toggleDispatch({ type: 'on' });
    }
  };

  const handleRemoveClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const isConfirm = await confirm(`해당 운동을 삭제할까요?`);
    if (isConfirm) {
      mutate(id);
      addToast({ type: 'success', message: `${name} 삭제!` });
    }
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
      <Dialog isDialogOpen={isConfirmOpen} message={confirmMessage} type={'warn'}>
        <button onClick={onConfirmOk}>삭제</button>
        <button onClick={onConfirmCancel}>닫기</button>
      </Dialog>
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
