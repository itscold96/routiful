import S from './AuthForm.module.scss';
import Input from 'components/@shared/input/Input';
import { VALID_OPTIONS } from 'constants/validOption';
import { signup } from 'fetches/updates/signup';
import { useValidForm } from 'hooks/useValidForm';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthAction } from 'stores/auth/action/useAuthAction';
import { useToastAction } from 'stores/toast/action/useToastAction';
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
  passwordConfirmation: {
    required: '비밀번호를 한 번 더 입력해주세요',
    pattern: VALID_OPTIONS.passwordPattern,
    validate: {
      matched: (value, formValues) => value === formValues.password || '비밀번호와 일치하지 않습니다.',
    },
  },
};

export default function SignupForm() {
  const { register, errors, handleSubmit, reset } = useValidForm({ validationConfig: validConfig });
  const { setIsLoggedIn } = useAuthAction();
  const { addToast } = useToastAction();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.email && formData.password) {
      const { email, password } = formData;
      const error = await signup({ email, password });

      // axios나 fetch가 아니라 supabase client를 이용하기 때문에,
      // try catch로 에러가 잡히지 않음
      if (error) {
        if (error.status === 422) {
          addToast({ type: 'error', message: '이미 가입된 이메일입니다.' });
        } else {
          addToast({ type: 'error', message: '회원가입에 실패하였습니다.' });
        }
        setIsLoggedIn(false);
        reset();
        return;
      }

      setIsLoggedIn(true);
      addToast({ type: 'success', message: '회원가입 성공!' });
      navigate('/routine', { replace: true }); // 로그인 페이지로 뒤로 가기 되지 않도록 함
    }
  };

  return (
    <form className={S.authForm} onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        label={'이메일'}
        type={'email'}
        htmlFor={'email'}
        register={register.email}
        error={errors.email}
        message={errors.email?.message}
      />
      <Input
        htmlFor={'password'}
        type={'password'}
        label={'비밀번호'}
        register={register.password}
        error={errors.password}
        message={errors.password?.message}
      />
      <Input
        htmlFor={'passwordConfirmation'}
        type={'password'}
        label={'비밀번호 확인'}
        register={register.passwordConfirmation}
        error={errors.passwordConfirmation}
        message={errors.passwordConfirmation?.message}
      />
      <button>Signup</button>
    </form>
  );
}
