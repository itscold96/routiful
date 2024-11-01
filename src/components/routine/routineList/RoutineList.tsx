import S from './RoutineList.module.scss';
import { useRoutineList } from 'queries/useRoutineList';
import RoutineItem from './RoutineItem';
import CreateNewItem from 'components/@shared/buttons/CreateNewItem';
import { useToggle } from 'hooks/useToggle';
import ModalFrame from 'components/@shared/modal/modalFrame/ModalFrame';

export default function RoutineList() {
  const { data: routineList, isError } = useRoutineList();
  const { toggleValue: isOpen, toggleDispatch } = useToggle();

  return (
    <div className={S.routineList}>
      <CreateNewItem text={'새로운 루틴 추가하기..'} onCreateClick={() => toggleDispatch({ type: 'on' })} />
      <ModalFrame isOpen={isOpen} onClose={() => toggleDispatch({ type: 'off' })}>
        <div className={S.modal}>모달 열림</div>
      </ModalFrame>
      {(isError || routineList?.length === 0) && <div>만들어진 루틴이 없습니다.</div>}
      {routineList?.map((routine) => <RoutineItem key={routine.id} id={routine.id} name={routine.name} />)}
    </div>
  );
}
