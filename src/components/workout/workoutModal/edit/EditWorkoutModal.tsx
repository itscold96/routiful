import { FieldValues } from 'react-hook-form';
import WorkoutModalBase from '../base/WorkoutModalBase';
import { useUpdateWorkout } from 'queries/useMutation/useUpdateWorkout';
import { useToastAction } from 'stores/toast/action/useToastAction';

interface EditWorkoutModalProps {
  id: string;
  name: string;
  sets: number;
  reps: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditWorkoutModal({ id, name, reps, sets, isOpen, onClose }: EditWorkoutModalProps) {
  const { mutate } = useUpdateWorkout();
  const { addToast } = useToastAction();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.name && formData.sets && formData.reps) {
      const { name, sets, reps } = formData;
      mutate({ id, name, sets, reps });
      addToast({ type: 'success', message: '운동 수정 완료!' });
    }
  };

  return (
    <WorkoutModalBase
      modalTitle={`${name}`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      buttonText={'수정하기'}
      initialValues={{ name, reps, sets }}
    />
  );
}
