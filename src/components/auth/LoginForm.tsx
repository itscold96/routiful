import S from './AuthForm.module.scss';
import Input from 'components/@shared/input/Input';
import { VALID_OPTIONS } from 'constants/validOption';
import { useValidForm } from 'hooks/useValidForm';
import { FieldValues } from 'react-hook-form';
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
  const { register, errors, handleSubmit } = useValidForm({ validationConfig: validConfig });

  const handleFormSubmit = (formData: FieldValues) => {
    console.log('제출', formData);
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
