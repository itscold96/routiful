import RoutineModalBase from '../base/RoutineModalBase';
import { useToastAction } from 'stores/toast/action/useToastAction';
import { FieldValues } from 'react-hook-form';
import { useUpdateRoutine } from 'queries/useMutation/useUpdateRoutine';
import { useRemoveRoutine } from 'queries/useMutation/useRemoveRoutine';

interface EditRoutineModalProps {
  id: string;
  name: string;
  isOpen: boolean;
  onClose: () => void;
  editMode?: boolean;
}

export default function EditRoutineModal({ id, name, isOpen, onClose, editMode }: EditRoutineModalProps) {
  const { mutate: update } = useUpdateRoutine();
  const { addToast } = useToastAction();
  const { mutate: remove } = useRemoveRoutine();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.name) {
      const { name } = formData;
      update({ name, id });
      addToast({ type: 'success', message: '루틴 이름 변경 완료!' });
    }
  };

  const handleRemoveClick = () => {
    remove(id);
    addToast({ type: 'success', message: '루틴 삭제 완료!' });
  };

  return (
    <RoutineModalBase
      modalTitle={'루틴 편집'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleFormSubmit}
      buttonText={'변경'}
      routineName={name}
      editMode={editMode}
      onRemoveClick={handleRemoveClick}
    />
  );
}
