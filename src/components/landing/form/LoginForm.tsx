import S from './AuthForm.module.scss';
import Input from 'components/@shared/input/Input';
import { VALID_OPTIONS } from 'constants/validOption';
import { signin } from 'fetches/updates/signin';
import { useValidForm } from 'hooks/useValidForm';
import { useEffect } from 'react';
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
};

export default function LoginForm() {
  const { register, errors, handleSubmit, reset } = useValidForm({ validationConfig: validConfig });
  const { setIsLoggedIn } = useAuthAction();
  const { addToast } = useToastAction();
  const navigate = useNavigate();

  const handleFormSubmit = async (formData: FieldValues) => {
    if (formData.email && formData.password) {
      const { email, password } = formData;
      const error = await signin({ email, password });

      // axios나 fetch가 아니라 supabase client를 이용하기 때문에,
      // try catch로 에러가 잡히지 않음
      if (error) {
        if (error.status === 400) {
          addToast({ type: 'error', message: '잘못된 유저 정보입니다.' });
        } else {
          addToast({ type: 'error', message: '로그인에 실패하였습니다.' });
        }
        setIsLoggedIn(false);
        reset();
        return;
      }

      addToast({ type: 'success', message: '로그인 성공!' });
      setIsLoggedIn(true);
      navigate('/routine', { replace: true }); // 로그인 페이지로 뒤로 가기 되지 않도록 함
    }
  };

  useEffect(() => {
    reset({ email: process.env.REACT_APP_TEST_ACCOUNT_ID, password: process.env.REACT_APP_TEST_ACCOUNT_PASSWORD });
  }, []);

  return (
    <form className={S.authForm} onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        htmlFor={'email'}
        label={'이메일'}
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
      <button>Login</button>
    </form>
  );
}
