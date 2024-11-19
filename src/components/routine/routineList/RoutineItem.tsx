import S from './RoutineItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { ListVideo } from 'lucide-react';
import { useToggle } from 'hooks/useToggle';
import EditRoutineModal from '../routineModal/edit/EditRoutineModal';
import { useLongPress } from 'use-long-press';
import { MouseEvent, TouchEvent } from 'react';

interface RoutineItemProps {
  id: string;
  name: string;
}

export default function RoutineItem({ id, name }: RoutineItemProps) {
  const { toggleValue: isModalOpen, toggleDispatch } = useToggle();
  const navigate = useNavigate();

  const handleShortClick = () => {
    navigate(`/routine/${id}/?name=${name}`);
  };

  const handleLongPress = () => {
    toggleDispatch({ type: 'on' });
  };

  const preventDefaultContextMenu = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // 기본 동작(컨텍스트 메뉴) 막기
  };

  const press = useLongPress(handleLongPress, {
    onCancel: handleShortClick, // 롱프레스가 아니면 짧은 클릭 처리
    threshold: 500, // 롱프레스 판정 시간 (ms)
  });

  return (
    <>
      <button {...press()} onContextMenu={preventDefaultContextMenu} className={S.routineItem}>
        <div className={S.emojiWrapper}>
          <ListVideo size={36} strokeWidth={1.8} />
        </div>
        <div className={S.name}>{name}</div>
      </button>
      <EditRoutineModal id={id} isOpen={isModalOpen} name={name} onClose={() => toggleDispatch({ type: 'off' })} />
    </>
  );
}
