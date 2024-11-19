import { useValidForm } from 'hooks/useValidForm';
import S from './RoutineModalBase.module.scss';
import { ValidationConfig } from 'types/validation';
import Input from 'components/@shared/input/Input';
import { FieldValues } from 'react-hook-form';
import { VALID_OPTIONS } from 'constants/validOption';
import Modal from 'components/@shared/overlay/modal/Modal';
import { useEffect } from 'react';
import classNames from 'classnames';

interface RoutineModalBaseProps {
  modalTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FieldValues) => Promise<void>;
  buttonText: string;
  routineName?: string;
  editMode?: boolean;
  onRemoveClick?: () => void;
}

const validConfig: ValidationConfig = {
  name: {
    required: '필수 입력값이에요..',
    maxLength: VALID_OPTIONS.maxLength20,
  },
};

export default function RoutineModalBase({
  modalTitle,
  isOpen,
  onClose,
  onSubmit,
  buttonText,
  routineName,
  editMode,
  onRemoveClick,
}: RoutineModalBaseProps) {
  const { register, handleSubmit, errors, reset } = useValidForm({ validationConfig: validConfig, mode: 'onSubmit' });

  const handleCloseModal = () => {
    onClose();
    reset(); // 모달 닫을 때 입력값 초기화
  };

  const handleFormSubmit = (formData: FieldValues) => {
    onSubmit(formData);
    handleCloseModal();
    console.log('안됨?');
  };

  const handleRemoveClick = () => {
    if (onRemoveClick) {
      onRemoveClick();
      onClose();
      reset(); // 모달 닫을 때 입력값 초기화
    }
  };

  useEffect(() => {
    // 수정의 경우 루틴 이름이 이미 있으므로 해당 값으로 초기화
    if (routineName) {
      reset({
        name: routineName,
      });
    }
  }, [routineName]);

  return (
    <Modal title={modalTitle} isOpen={isOpen} onClose={onClose}>
      <div className={S.modal}>
        <form className={S.createRoutineForm} onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            register={register.name}
            htmlFor={'name'}
            label={'루틴 이름'}
            error={errors.name}
            message={errors.name?.message}
          />
          <div className={S.buttonContainer}>
            {editMode && (
              <button type={'button'} onClick={handleRemoveClick} className={classNames(S.submitButton, S.delete)}>
                {'삭제'}
              </button>
            )}
            <button type={'submit'} className={S.submitButton}>
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
