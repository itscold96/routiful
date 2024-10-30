import S from './AuthForm.module.scss';
import Input from 'components/@shared/input/Input';
import { VALID_OPTIONS } from 'constants/validOption';
import { signin } from 'fetches/signin';
import { useValidForm } from 'hooks/useValidForm';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ValidationConfig } from 'types/validation';

const validConfig: ValidationConfig = {
  email: {
    required: '이메일을 입력해주세요',
    pattern: VALID_OPTIONS.emailPattern,
  },
  password: {
    required: '비밀번호를 입력해주세요',
    pattern: VALID_OPTIONS.passwordPattern,
  },
};

export default function LoginForm() {
  const { register, errors, handleSubmit, reset } = useValidForm({ validationConfig: validConfig });
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.email && formData.password) {
      const { email, password } = formData;
      const error = await signin({ email, password });

      if (error) {
        if (error.status === 400) {
          alert('잘못된 유저 정보입니다.');
        } else {
          alert('로그인에 실패하였습니다.');
        }
        reset();
        return;
      }

      navigate('/routine');
    }
  };

  return (
    <form className={S.authForm} onSubmit={handleSubmit(handleFormSubmit)}>
      <Input label={'이메일'} register={register.email} error={errors.email} message={errors.email?.message} />
      <Input
        type={'password'}
        label={'비밀번호'}
        register={register.password}
        error={errors.password}
        message={errors.password?.message}
      />
      <button>Login</button>
    </form>
  );
}
