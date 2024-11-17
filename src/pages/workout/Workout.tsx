import S from './Workout.module.scss';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Cog, Play } from 'lucide-react';
import WorkoutContent from 'components/workout/workoutContent/WorkoutContent';
import { useToggle } from 'hooks/useToggle';
import classNames from 'classnames';

export default function Workout() {
  const { routineId } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const { toggleValue: isEditing, toggleDispatch } = useToggle();

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
        <Link className={S.button} to={`/play/${routineId}`}>
          <Play size={25} strokeWidth={3} className={S.icon} />
          시작
        </Link>
        <button className={S.button} onClick={() => toggleDispatch({ type: 'switch' })}>
          <Cog size={25} strokeWidth={2.2} className={classNames(S.icon, { [S.rotate]: isEditing })} />
          {isEditing ? '편집 완료' : '편집'}
        </button>
      </div>

      <WorkoutContent routineId={routineId} isEditing={isEditing} />
    </div>
  );
}
