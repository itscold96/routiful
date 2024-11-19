import S from './Workout.module.scss';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useToastAction } from 'stores/toast/action/useToastAction';
import WorkoutContentContainer from 'components/workout/workoutContent/WorkoutContentContainer';

export default function Workout() {
  const navigate = useNavigate();
  const { routineId } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const { addToast } = useToastAction();

  if (!routineId) {
    // url에 routineId 없이 접근한 것이라면 잘못된 접근이다.
    addToast({ type: 'error', message: '잘못된 접근이에요!' });
    navigate('/routine'); // 루틴 페이지로 이동
    return null;
  }

  return (
    <div className={S.workoutContainer}>
      <div className={S.titleContainer}>
        <Link to={`/routine`}>
          <ChevronLeft size={38} strokeWidth={2} className={S.icon} />
        </Link>
        <div className={S.title}>{name}</div>
      </div>

      <WorkoutContentContainer routineId={routineId} />
    </div>
  );
}
