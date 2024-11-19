import S from './WorkoutContent.module.scss';

import { useToggle } from 'hooks/useToggle';
import CreateNewItem from 'components/@shared/buttons/CreateNewItem';
import WorkoutList from './WorkoutList';
import { Suspense } from 'react';
import CreateWorkoutModal from '../workoutModal/create/CreateWorkoutModal';
import Loading from 'components/@shared/loading/Loading';

interface WorkoutContentProps {
  routineId: string;
  isEditing: boolean;
}

export default function WorkoutContent({ routineId, isEditing }: WorkoutContentProps) {
  const { toggleValue: isModalOpen, toggleDispatch } = useToggle();

  return (
    <div className={S.workoutContent}>
      <CreateNewItem text={'새로운 운동 추가하기..'} onCreateClick={() => toggleDispatch({ type: 'on' })} />
      <CreateWorkoutModal routineId={routineId} isOpen={isModalOpen} onClose={() => toggleDispatch({ type: 'off' })} />

      <Suspense fallback={<Loading />}>
        <WorkoutList routineId={routineId} isEditing={isEditing} />
      </Suspense>
    </div>
  );
}
