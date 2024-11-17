import S from './WorkoutList.module.scss';
import { useWorkoutList } from 'queries/useWorkoutList';
import WorkoutItem from './WorkoutItem';
import { Reorder } from 'framer-motion';
import { useRef, useState } from 'react';

export default function WorkoutList({ routineId }: { routineId: string }) {
  const { data, isError } = useWorkoutList(routineId);
  const [workoutList, setWorkoutList] = useState(data);

  const containerRef = useRef<HTMLDivElement>(null); // 드래그 제약용 Ref 생성

  const handleDragEnd = () => {
    console.log('workoutList:', workoutList);
  };

  return (
    <section ref={containerRef} className={S.workoutListContainer}>
      {(isError || workoutList?.length === 0) && <div>추가된 운동이 없습니다.</div>}
      <Reorder.Group className={S.workoutList} axis="y" values={workoutList} onReorder={setWorkoutList}>
        {workoutList?.map((workout) => (
          <Reorder.Item
            key={workout.id}
            value={workout}
            id={workout.id}
            onDragEnd={handleDragEnd}
            dragConstraints={containerRef}
            dragElastic={0.1}
          >
            <WorkoutItem
              id={workout.id}
              name={workout.name}
              reps={workout.reps}
              sets={workout.sets}
              order={workout.order}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </section>
  );
}
