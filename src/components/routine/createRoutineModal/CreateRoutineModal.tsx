import { useValidForm } from 'hooks/useValidForm';
import S from './CreateRoutineModal.module.scss';
import ModalFrame from 'components/@shared/modal/modalFrame/ModalFrame';
import { ValidationConfig } from 'types/validation';
import Input from 'components/@shared/input/Input';
import { FieldValues } from 'react-hook-form';
import { X } from 'lucide-react';
import { useInsertRoutine } from 'queries/useInsertRoutine';

interface CreateRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const validConfig: ValidationConfig = {
  name: {
    required: '필수 입력값입니다.',
    maxLength: {
      message: '20자 이하로 입력해주세요',
      value: 20,
    },
  },
};

export default function CreateRoutineModal({ isOpen, onClose }: CreateRoutineModalProps) {
  const { register, handleSubmit, errors, reset } = useValidForm({ validationConfig: validConfig, mode: 'onSubmit' });
  const { mutate } = useInsertRoutine();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.name) {
      const { name } = formData;
      mutate(name);
      onClose();
    }
  };

  const handleCloseModal = () => {
    onClose();
    reset(); // 모달 닫을 때 입력값 초기화
  };

  return (
    <ModalFrame isOpen={isOpen} onClose={handleCloseModal}>
      <div className={S.modal}>
        <div className={S.modalTitle}>
          <h2>새로운 루틴 추가</h2>
          <button onClick={handleCloseModal}>
            <X size={30} strokeWidth={3} />
          </button>
        </div>
        <form className={S.createItemForm} onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            register={register.name}
            htmlFor={'name'}
            label={'루틴 이름'}
            error={errors.name}
            message={errors.name?.message}
          />
          <button className={S.submitButton}>추가</button>
        </form>
      </div>
    </ModalFrame>
  );
}
