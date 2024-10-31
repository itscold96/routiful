import { useRoutineList } from 'queries/useRoutineList';
import { Link } from 'react-router-dom';

export default function RoutineList() {
  const { data: RoutineList, error } = useRoutineList();

  return <div>RoutineList</div>;
}
