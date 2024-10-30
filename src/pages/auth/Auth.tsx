import LoginForm from 'components/auth/LoginForm';
import S from './Auth.module.scss';
import Slogan from 'components/auth/Slogan';
import SignupForm from 'components/auth/SignupForm';
import { useToggle } from 'hooks/useToggle';

export default function Auth() {
  const { toggleValue: isLoginForm, toggleDispatch } = useToggle(true);
  return (
    <div className={S.AuthContainer}>
      <Slogan />
      {isLoginForm ? <LoginForm /> : <SignupForm />}
      <p className={S.memberCheck}>
        {isLoginForm ? '아직 회원이 아니세요?' : '이미 회원이세요?'}
        <span onClick={() => toggleDispatch({ type: 'switch' })}>{isLoginForm ? '회원가입' : '로그인'}</span>
      </p>
    </div>
  );
}
