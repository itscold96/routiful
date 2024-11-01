import { useWorkoutList } from 'queries/useWorkoutList';

export default function WorkoutList({ routineId }: { routineId: string | undefined }) {
  const { data } = useWorkoutList(routineId);

  console.log('data:', data);

  return <div>Workout</div>;
}
