import S from './WorkoutContent.module.scss';
import CreateWorkoutModal from '../createWorkoutModal/CreateWorkoutModal';
import { useToggle } from 'hooks/useToggle';
import CreateNewItem from 'components/@shared/buttons/CreateNewItem';
import WorkoutList from './WorkoutList';
import { Suspense } from 'react';

export default function WorkoutContent({ routineId }: { routineId: string }) {
  const { toggleValue: isModalOpen, toggleDispatch } = useToggle();

  return (
    <div className={S.workoutContent}>
      <CreateNewItem text={'새로운 운동 추가하기..'} onCreateClick={() => toggleDispatch({ type: 'on' })} />
      <CreateWorkoutModal routineId={routineId} isOpen={isModalOpen} onClose={() => toggleDispatch({ type: 'off' })} />

      <Suspense fallback={<div>Loading...</div>}>
        <WorkoutList routineId={routineId} />
      </Suspense>
    </div>
  );
}
