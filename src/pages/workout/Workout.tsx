import WorkoutList from 'components/workout/workoutList/WorkoutList';
import S from './Workout.module.scss';
import { Suspense } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Cog, Play } from 'lucide-react';

export default function Workout() {
  const { routineId } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  return (
    <div className={S.workoutContainer}>
      <div className={S.titleContainer}>
        <Link to={`/routine`}>
          <ChevronLeft size={38} strokeWidth={2} className={S.icon} />
        </Link>
        <div className={S.title}>{name}</div>
      </div>

      <div className={S.buttonsContainer}>
        <Link to={`/play/${routineId}/?name=${name}`}>
          <Play size={25} strokeWidth={2.2} className={S.icon} />
          시작
        </Link>
        <Link to={`/edit/${routineId}/?name=${name}`}>
          <Cog size={25} strokeWidth={2.2} className={S.icon} />
          편집
        </Link>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <WorkoutList routineId={routineId} />
      </Suspense>
    </div>
  );
}
