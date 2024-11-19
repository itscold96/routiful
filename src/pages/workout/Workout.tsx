import S from './Workout.module.scss';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Cog, Play } from 'lucide-react';
import WorkoutContent from 'components/workout/workoutContent/WorkoutContent';
import { useToggle } from 'hooks/useToggle';
import classNames from 'classnames';
import { useToastAction } from 'stores/toast/action/useToastAction';
import { useWorkoutList } from 'queries/useWorkoutList';

export default function Workout() {
  const { routineId } = useParams();
  const navigate = useNavigate();
  // useWorkoutList는 내부에 staleTime 지정으로 캐싱되어,
  // 루틴id가 같을 경우, 플레이리스트 화면에서 중복 요청이 일어나지 않음.
  const { data: workoutList, error } = useWorkoutList(routineId);

  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const { toggleValue: isEditing, toggleDispatch } = useToggle();
  const { addToast } = useToastAction();

  const handlePlayClick = () => {
    if (error || workoutList.length === 0) {
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
      if (error || workoutList.length === 0) {
        // 운동이 없을 경우에는 편집이 실행되면 안됨.
        addToast({ type: 'warn', message: '편집할 운동이 없네요..' });
      } else {
        // 운동이 있을 경우에만 실행
        addToast({ type: 'success', message: '수정과 삭제가 가능해요!' });
        toggleDispatch({ type: 'on' });
      }
    }
  };

  if (!routineId) {
    // url에 routineId 없이 접근한 것이라면 잘못된 접근이다.
    addToast({ type: 'error', message: '잘못된 접근이에요!' });
    navigate('/routine'); // 루틴 페이지로 이동
  }

  return (
    <div className={S.workoutContainer}>
      <div className={S.titleContainer}>
        <Link to={`/routine`}>
          <ChevronLeft size={38} strokeWidth={2} className={S.icon} />
        </Link>
        <div className={S.title}>{name}</div>
      </div>

      <div className={S.buttonsContainer}>
        <button className={S.button} onClick={handlePlayClick}>
          <Play size={25} strokeWidth={3} className={S.icon} />
          시작
        </button>
        <button className={S.button} onClick={handleEditToggle}>
          <Cog size={25} strokeWidth={2.2} className={classNames(S.icon, { [S.rotate]: isEditing })} />
          {isEditing ? '편집 완료' : '편집'}
        </button>
      </div>

      <WorkoutContent routineId={routineId || ''} isEditing={isEditing} />
    </div>
  );
}
