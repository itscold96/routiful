import S from './Auth.module.scss';
import Slogan from 'components/auth/Slogan';

export default function Auth() {
  return (
    <div className={S.AuthContainer}>
      <Slogan />
    </div>
  );
}
