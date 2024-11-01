import S from './WorkoutList.module.scss';
import { Dumbbell } from 'lucide-react';
import { useWorkoutList } from 'queries/useWorkoutList';

export default function WorkoutList({ routineId }: { routineId: string | undefined }) {
  const { data: workoutList, isError } = useWorkoutList(routineId);

  return (
    <div className={S.workoutListContainer}>
      {(isError || workoutList?.length === 0) && <div>추가된 운동이 없습니다.</div>}
      {workoutList?.map((workout) => (
        <button key={workout.id} className={S.workoutItem}>
          <div className={S.emojiWrapper}>
            <Dumbbell className={S.icon} size={28} strokeWidth={1.8} />
          </div>
          <div className={S.workoutDetail}>
            <p>{workout.name}</p>
            <div className={S.detail}>
              <p>sets: {workout.sets}</p>
              <p>reps: {workout.reps}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}