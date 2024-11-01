import S from './WorkoutList.module.scss';
import { useWorkoutList } from 'queries/useWorkoutList';
import WorkoutItem from './WorkoutItem';

export default function WorkoutList({ routineId }: { routineId: string | undefined }) {
  const { data: workoutList, isError } = useWorkoutList(routineId);

  return (
    <div className={S.workoutListContainer}>
      {(isError || workoutList?.length === 0) && <div>추가된 운동이 없습니다.</div>}
      {workoutList?.map((workout) => (
        <WorkoutItem key={workout.id} id={workout.id} name={workout.name} reps={workout.reps} sets={workout.sets} />
      ))}
    </div>
  );
}
