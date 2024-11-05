import { useValidForm } from 'hooks/useValidForm';
import S from './CreateWorkoutModal.module.scss';
import { ValidationConfig } from 'types/validation';
import Input from 'components/@shared/input/Input';
import { FieldValues } from 'react-hook-form';
import { VALID_OPTIONS } from 'constants/validOption';
import { useInsertWorkout } from 'queries/useInsertWorkout';
import Modal from 'components/@shared/overlay/modal/Modal';

interface CreateWorkoutModalProps {
  routineId: string;
  isOpen: boolean;
  onClose: () => void;
}

const validConfig: ValidationConfig = {
  name: {
    required: '필수 입력값이에요..',
    // TODO: 말줄임 테스트 해보기
    maxLength: VALID_OPTIONS.maxLength20,
  },
  sets: {
    required: '필수 입력값이에요..',
    min: { value: 1, message: '최소 1세트 이상은 하셔야죠!' },
    max: { value: 100, message: '이렇게 많이 하시면 근육이 녹아요..' },
  },
  reps: {
    required: '필수 입력값이에요..',
    min: { value: 1, message: '최소 1회 이상은 하셔야죠!' },
    max: { value: 999, message: '이렇게 많이 하시면 근육이 녹아요..' },
  },
};

export default function CreateWorkoutModal({ routineId, isOpen, onClose }: CreateWorkoutModalProps) {
  const { register, handleSubmit, errors, reset } = useValidForm({ validationConfig: validConfig, mode: 'onSubmit' });
  const { mutate } = useInsertWorkout();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.name && formData.sets && formData.reps) {
      const { name, sets, reps } = formData;
      mutate({ workoutName: name, sets, reps, routineId });
      onClose();
    }
  };

  const handleCloseModal = () => {
    onClose();
    reset(); // 모달 닫을 때 입력값 초기화
  };

  return (
    <Modal title={'새로운 운동 추가'} isOpen={isOpen} onClose={handleCloseModal}>
      <div className={S.modal}>
        <form className={S.createWorkoutForm} onSubmit={handleSubmit(handleFormSubmit)}>
          <Input
            register={register.name}
            htmlFor={'name'}
            label={'운동 이름'}
            error={errors.name}
            message={errors.name?.message}
          />
          <Input
            type={'number'}
            register={register.sets}
            htmlFor={'sets'}
            label={'세트 수'}
            error={errors.sets}
            message={errors.sets?.message}
          />
          <Input
            type={'number'}
            register={register.reps}
            htmlFor={'reps'}
            label={'세트 당 횟수'}
            error={errors.reps}
            message={errors.reps?.message}
          />
          <button className={S.submitButton}>추가</button>
        </form>
      </div>
    </Modal>
  );
}