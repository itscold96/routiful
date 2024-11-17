import S from './Workout.module.scss';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Cog, Play } from 'lucide-react';
import WorkoutContent from 'components/workout/workoutContent/WorkoutContent';

export default function Workout() {
  const { routineId } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  if (!routineId) {
    // url에 routineId 없이 접근한 것이라면 잘못된 접근이다.
    // TODO: 404 페이지 컴포넌트 만들기
    return <div>잘못된 접근입니다.</div>;
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
        <Link to={`/play/${routineId}`}>
          <Play size={25} strokeWidth={2.2} className={S.icon} />
          시작
        </Link>
        <Link to={`/edit/${routineId}/?name=${name}`}>
          <Cog size={25} strokeWidth={2.2} className={S.icon} />
          편집
        </Link>
      </div>

      <WorkoutContent routineId={routineId} />
    </div>
  );
}
