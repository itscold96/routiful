import Search from 'components/@shared/search/Search';
import S from './Routine.module.scss';
import RoutineList from 'components/routine/routineList/RoutineList';
import { Suspense, useState } from 'react';
import Loading from 'components/@shared/loading/Loading';
import TutorialModal from 'components/tutorialModal/TutorialModal';
import { LogOut } from 'lucide-react';
import { logout } from 'fetches/updates/logout';
import { useToastAction } from 'stores/toast/action/useToastAction';
import { useAuthAction } from 'stores/auth/action/useAuthAction';

export default function Routine() {
  const [keyword, setKeyword] = useState('');
  const { addToast } = useToastAction();
  const { setIsLoggedIn } = useAuthAction();

  const handleLogoutClick = async () => {
    const error = await logout();
    if (error) {
      addToast({ type: 'error', message: '로그아웃 실패..' });
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div className={S.routineContainer}>
      <header className={S.header}>
        <h1 className={S.title}>루틴리스트</h1>
        <button className={S.button}>
          <LogOut size={28} color={'#f92e48'} strokeWidth={2.5} onClick={handleLogoutClick} />
        </button>
      </header>
      <Search setKeyword={setKeyword} />
      <Suspense fallback={<Loading />}>
        <RoutineList keyword={keyword} />
      </Suspense>
      <TutorialModal />
    </div>
  );
}
