import { FieldValues } from 'react-hook-form';
import { useInsertWorkout } from 'queries/useInsertWorkout';
import WorkoutModalBase from '../base/WorkoutModalBase';

interface CreateWorkoutModalProps {
  routineId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateWorkoutModal({ routineId, isOpen, onClose }: CreateWorkoutModalProps) {
  const { mutate } = useInsertWorkout();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.name && formData.sets && formData.reps) {
      const { name, sets, reps } = formData;
      mutate({ name, sets, reps, related_routine_id: routineId });
    }
  };

  return (
    <WorkoutModalBase
      modalTitle={'새로운 운동 추가'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      buttonText={'추가하기'}
    />
  );
}
