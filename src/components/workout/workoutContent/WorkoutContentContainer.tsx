import { useToggle } from 'hooks/useToggle';
import { useNavigate } from 'react-router-dom';
import { useToastAction } from 'stores/toast/action/useToastAction';
import S from './WorkoutContentContainer.module.scss';
import WorkoutContent from 'components/workout/workoutContent/WorkoutContent';
import classNames from 'classnames';
import { Cog, Play } from 'lucide-react';
import { useWorkoutCount } from 'queries/useQuery/useWorkoutCount';
import { useEffect } from 'react';

interface WorkoutContentContainerProps {
  routineId: string;
}

export default function WorkoutContentContainer({ routineId }: WorkoutContentContainerProps) {
  const { addToast } = useToastAction();
  const navigate = useNavigate();
  const { toggleValue: isEditing, toggleDispatch } = useToggle();
  const { data: workoutCount } = useWorkoutCount(routineId);

  const handlePlayClick = () => {
    if (!workoutCount) {
      // 운동이 없을 경우에는 play가 실행되면 안됨.
      addToast({ type: 'error', message: '운동을 추가해주세요!' });
    } else {
      navigate(`/play/${routineId}`);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      addToast({ type: 'success', message: '편집 완료!' });
      toggleDispatch({ type: 'off' });
    } else {
      if (!workoutCount) {
        // 운동이 없을 경우에는 편집이 실행되면 안됨.
        addToast({ type: 'warn', message: '편집할 운동이 없네요..' });
      } else {
        // 운동이 있을 경우에만 실행
        addToast({ type: 'success', message: '수정과 삭제가 가능해요!' });
        toggleDispatch({ type: 'on' });
      }
    }
  };

  useEffect(() => {
    // 편집에서 모든 아이템을 삭제하면 편집이 종료되어야 하는 것이 맞다고 생각함.
    if (workoutCount === 0) {
      toggleDispatch({ type: 'off' });
    }
  }, [workoutCount]);

  return (
    <>
      <div className={S.buttonContainer}>
        <button className={S.button} onClick={handlePlayClick}>
          <Play size={25} strokeWidth={3} className={S.icon} />
          시작
        </button>
        <button className={S.button} onClick={handleEditToggle}>
          <Cog size={25} strokeWidth={2.2} className={classNames({ [S.rotate]: isEditing })} />
          {isEditing ? '편집 완료' : '편집'}
        </button>
      </div>

      <WorkoutContent routineId={routineId} isEditing={isEditing} />
    </>
  );
}
