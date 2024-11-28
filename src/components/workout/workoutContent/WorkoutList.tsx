import S from './WorkoutList.module.scss';
import { useWorkoutList } from 'queries/useSuspenseQuery/useWorkoutList';
import WorkoutItem from './WorkoutItem';
import { Reorder } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useReorderWorkout } from 'queries/useMutation/useReorderWorkout';
import Empty from 'components/@shared/empty/Empty';
interface WorkoutListProps {
  routineId: string;
  isEditing: boolean;
}

export default function WorkoutList({ routineId, isEditing }: WorkoutListProps) {
  // 실제 서버에 요청하여 받아오는 data
  const { data, isError } = useWorkoutList(routineId);
  // 서버 요청이 아닌 클라이언트 측에서 리오더 되는 것만 보여주기 위한 workoutList
  const [workoutList, setWorkoutList] = useState(data);
  const { mutate } = useReorderWorkout();

  const containerRef = useRef<HTMLDivElement>(null); // 드래그 제약용 Ref 생성

  const handleDragEnd = () => {
    // 드래그를 아무리 많이 해도, 드롭 시에만 네트워크 요청이 이루어지도록 처리
    const reorderedWorkoutList = workoutList.map((workout, index) => ({ ...workout, order: index }));
    mutate({ routineId, reorderedWorkoutList });
  };

  useEffect(() => {
    // 운동 CRUD 시, 클라이언트 측에서 보여줄 운동 리스트를 최신화해야 함
    setWorkoutList(data);
  }, [data]);

  return (
    <section ref={containerRef} className={S.workoutListContainer}>
      {(isError || workoutList?.length === 0) && <Empty text={'추가된 운동이 없네요..'} />}
      <Reorder.Group className={S.workoutList} axis="y" values={workoutList} onReorder={setWorkoutList}>
        {workoutList &&
          workoutList.map((workout, index) => (
            <Reorder.Item
              key={workout.id}
              value={workout}
              id={workout.id}
              onDragEnd={handleDragEnd}
              dragConstraints={containerRef}
              dragElastic={0.1}
              dragListener={!isEditing}
            >
              <WorkoutItem
                id={workout.id}
                name={workout.name}
                reps={workout.reps}
                sets={workout.sets}
                order={index}
                isEditing={isEditing}
              />
            </Reorder.Item>
          ))}
      </Reorder.Group>
    </section>
  );
}
