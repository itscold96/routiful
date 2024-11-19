import { FieldValues } from 'react-hook-form';
import { useInsertWorkout } from 'queries/useInsertWorkout';
import WorkoutModalBase from '../base/WorkoutModalBase';
import { useToastAction } from 'stores/toast/action/useToastAction';

interface CreateWorkoutModalProps {
  routineId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateWorkoutModal({ routineId, isOpen, onClose }: CreateWorkoutModalProps) {
  const { mutate } = useInsertWorkout();
  const { addToast } = useToastAction();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.name && formData.sets && formData.reps) {
      const { name, sets, reps } = formData;
      mutate({ name, sets, reps, related_routine_id: routineId });
      addToast({ type: 'success', message: '운동 생성 완료!' });
    }
  };

  return (
    <WorkoutModalBase
      modalTitle={'새로운 운동 추가'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      buttonText={'추가'}
    />
  );
}
