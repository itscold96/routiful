import { useRoutineList } from 'queries/useRoutineList';

export default function RoutineList() {
  const { data, error } = useRoutineList();
  return <div>RoutineList</div>;
}
