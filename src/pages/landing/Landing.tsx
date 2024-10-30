import S from './Landing.module.scss';
import Slogan from 'components/landing/slogan/Slogan';
import LoginForm from 'components/landing/form/LoginForm';
import SignupForm from 'components/landing/form/SignupForm';
import { useToggle } from 'hooks/useToggle';

export default function Landing() {
  const { toggleValue: isLoginForm, toggleDispatch } = useToggle(true);
  return (
    <div className={S.landingContainer}>
      <Slogan />
      {isLoginForm ? <LoginForm /> : <SignupForm />}
      <p className={S.memberCheck}>
        {isLoginForm ? '아직 회원이 아니세요?' : '이미 회원이세요?'}
        <span onClick={() => toggleDispatch({ type: 'switch' })}>{isLoginForm ? '회원가입' : '로그인'}</span>
      </p>
    </div>
  );
}
