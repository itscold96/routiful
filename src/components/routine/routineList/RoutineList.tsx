import S from './RoutineList.module.scss';
import { ListVideo } from 'lucide-react';
import { useRoutineList } from 'queries/useRoutineList';
import { Link } from 'react-router-dom';

export default function RoutineList() {
  const { data: routineList, isError } = useRoutineList();

  return (
    <div className={S.routineList}>
      {(isError || routineList?.length === 0) && <div>만들어진 루틴이 없습니다.</div>}
      {routineList?.map((routine) => (
        <Link key={routine.id} className={S.itemContainer} to={`/routine/${routine.id}/?name=${routine.name}`}>
          <div className={S.emojiWrapper}>
            <ListVideo size={36} strokeWidth={1.8} />
          </div>
          <div className={S.name}>{routine.name}</div>
        </Link>
      ))}
    </div>
  );
}
