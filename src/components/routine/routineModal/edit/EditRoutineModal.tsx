import RoutineModalBase from '../base/RoutineModalBase';
import { useToastAction } from 'stores/toast/action/useToastAction';
import { FieldValues } from 'react-hook-form';
import { useUpdateRoutine } from 'queries/useUpdateRoutine';

interface EditRoutineModalProps {
  id: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditRoutineModal({ id, name, isOpen, onClose }: EditRoutineModalProps) {
  const { mutate } = useUpdateRoutine();
  const { addToast } = useToastAction();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.name && formData.sets && formData.reps) {
      const { name } = formData;
      mutate({ name, id });
      addToast({ type: 'success', message: '루틴 수정 완료!' });
    }
  };

  return (
    <RoutineModalBase
      modalTitle={'루틴 이름 변경'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      buttonText={'추가'}
      routineName={name}
    />
  );
}
