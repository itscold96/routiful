import S from './RoutineItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { Cog, ListVideo } from 'lucide-react';
import { useToggle } from 'hooks/useToggle';
import EditRoutineModal from '../routineModal/edit/EditRoutineModal';
import { MouseEvent } from 'react';

interface RoutineItemProps {
  id: string;
  name: string;
}

export default function RoutineItem({ id, name }: RoutineItemProps) {
  const { toggleValue: isModalOpen, toggleDispatch } = useToggle();
  const navigate = useNavigate();

  const handleMoveToRoutineClick = () => {
    navigate(`/routine/${id}/?name=${name}`);
  };

  const handleEditClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleDispatch({ type: 'on' });
  };

  return (
    <>
      <button className={S.routineItem} onClick={handleMoveToRoutineClick}>
        <div className={S.emojiWrapper}>
          <ListVideo size={36} strokeWidth={1.8} />
        </div>
        <div className={S.itemContent}>
          <div className={S.name}>{name}</div>
          <button className={S.edit} onClick={handleEditClick}>
            <Cog size={23} strokeWidth={2.2} />
          </button>
        </div>
      </button>
      <EditRoutineModal
        id={id}
        isOpen={isModalOpen}
        name={name}
        onClose={() => toggleDispatch({ type: 'off' })}
        editMode
      />
    </>
  );
}
