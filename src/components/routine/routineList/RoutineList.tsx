import S from './RoutineList.module.scss';
import { useRoutineList } from 'queries/useRoutineList';
import RoutineItem from './RoutineItem';
import CreateNewItem from 'components/@shared/buttons/CreateNewItem';
import { useToggle } from 'hooks/useToggle';
import CreateRoutineModal from '../routineModal/create/CreateRoutineModal';
import Empty from 'components/@shared/empty/Empty';

export default function RoutineList() {
  const { data: routineList, isError } = useRoutineList();
  const { toggleValue: isOpen, toggleDispatch } = useToggle();

  return (
    <div className={S.routineList}>
      <CreateNewItem text={'새로운 루틴 추가하기..'} onCreateClick={() => toggleDispatch({ type: 'on' })} />
      <CreateRoutineModal isOpen={isOpen} onClose={() => toggleDispatch({ type: 'off' })} />
      {(isError || routineList?.length === 0) && <Empty text={'만들어진 루틴이 없네요..'} />}
      {routineList?.map((routine) => <RoutineItem key={routine.id} id={routine.id} name={routine.name} />)}
    </div>
  );
}
