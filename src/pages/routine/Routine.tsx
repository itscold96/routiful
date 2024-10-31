import Search from 'components/@shared/search/Search';
import S from './Routine.module.scss';
import RoutineList from 'components/routine/routineList/RoutineList';
import { Suspense } from 'react';

export default function Routine() {
  return (
    <div className={S.routineContainer}>
      <h1 className={S.title}>루틴 리스트</h1>
      <Search />
      <Suspense fallback={<div>Loading...</div>}>
        <RoutineList />
      </Suspense>
    </div>
  );
}
