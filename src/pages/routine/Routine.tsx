import Search from 'components/@shared/search/Search';
import S from './Routine.module.scss';
import RoutineList from 'components/routine/routineList/RoutineList';
import { Suspense, useState } from 'react';
import Loading from 'components/@shared/loading/Loading';
import TutorialModal from 'components/tutorialModal/TutorialModal';

export default function Routine() {
  const [keyword, setKeyword] = useState('');

  return (
    <div className={S.routineContainer}>
      <h1 className={S.title}>루틴리스트</h1>
      <Search setKeyword={setKeyword} />
      <Suspense fallback={<Loading />}>
        <RoutineList keyword={keyword} />
      </Suspense>
      <TutorialModal />
    </div>
  );
}
