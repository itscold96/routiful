import RoutineModalBase from '../base/RoutineModalBase';
import { useToastAction } from 'stores/toast/action/useToastAction';
import { FieldValues } from 'react-hook-form';
import { useInsertRoutine } from 'queries/useInsertRoutine';

interface CreateRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateRoutineModal({ isOpen, onClose }: CreateRoutineModalProps) {
  const { mutate } = useInsertRoutine();
  const { addToast } = useToastAction();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.name) {
      const { name } = formData;
      mutate(name);
      addToast({ type: 'success', message: '루틴 생성 완료!' });
    }
  };

  return (
    <RoutineModalBase
      modalTitle={'새로운 루틴 추가'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      buttonText={'추가'}
    />
  );
}
