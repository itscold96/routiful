import S from './RoutineList.module.scss';
import { useRoutineList } from 'queries/useRoutineList';
import RoutineItem from './RoutineItem';

export default function RoutineList() {
  const { data: routineList, isError } = useRoutineList();

  return (
    <div className={S.routineList}>
      {(isError || routineList?.length === 0) && <div>만들어진 루틴이 없습니다.</div>}
      {routineList?.map((routine) => <RoutineItem key={routine.id} id={routine.id} name={routine.name} />)}
    </div>
  );
}
