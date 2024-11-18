import { useValidForm } from 'hooks/useValidForm';
import S from './CreateRoutineModal.module.scss';
import { ValidationConfig } from 'types/validation';
import Input from 'components/@shared/input/Input';
import { FieldValues } from 'react-hook-form';
import { useInsertRoutine } from 'queries/useInsertRoutine';
import { VALID_OPTIONS } from 'constants/validOption';
import Modal from 'components/@shared/overlay/modal/Modal';
import { useToastAction } from 'stores/toast/action/useToastAction';

interface CreateRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const validConfig: ValidationConfig = {
  name: {
    required: '필수 입력값이에요..',
    maxLength: VALID_OPTIONS.maxLength20,
  },
};

export default function CreateRoutineModal({ isOpen, onClose }: CreateRoutineModalProps) {
  const { register, handleSubmit, errors, reset } = useValidForm({ validationConfig: validConfig, mode: 'onSubmit' });
  const { addToast } = useToastAction();
  const { mutate } = useInsertRoutine();

  const closeModal = () => {
    onClose();
    reset(); // 모달 닫을 때 입력값 초기화
  };

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.name) {
      const { name } = formData;
      mutate(name);
      closeModal();
      addToast({ type: 'success', message: '루틴 생성 완료!' });
    }
  };

  return (
    <Modal title={'새로운 루틴 추가'} isOpen={isOpen} onClose={closeModal}>
      <div className={S.modal}>
        <form className={S.createRoutineForm} onSubmit={handleSubmit(handleFormSubmit)}>
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
    </Modal>
  );
}
