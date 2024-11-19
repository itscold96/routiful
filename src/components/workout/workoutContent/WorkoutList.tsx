import S from './WorkoutList.module.scss';
import { useWorkoutList } from 'queries/useWorkoutList';
import WorkoutItem from './WorkoutItem';
import { Reorder } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useReorderWorkout } from 'queries/useReorderWorkout';
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
    const reorderedWorkoutList = workoutList.map((workout, index) => ({ ...workout, order: index }));
    mutate({ routineId, reorderedWorkoutList });
  };

  useEffect(() => {
    // 리오더를 위해 서버 데이터와 별도로 클라이언트 데이터를 관리해야 한다.
    // 실제 서버측 데이터가 업데이트 될 경우에,
    // 화면에서 보여주는 리스트가 바뀌어야 하므로 클라이언트 데이터 업데이트가 필요함.
    // 해당 로직은 초기 렌더링과 서버 데이터 변경 시에만 실행됨
    setWorkoutList(data);
  }, [data]);

  return (
    <section ref={containerRef} className={S.workoutListContainer}>
      {(isError || workoutList?.length === 0) && <Empty text={'추가된 운동이 없네요..'} />}
      <Reorder.Group className={S.workoutList} axis="y" values={workoutList} onReorder={setWorkoutList}>
        {workoutList?.map((workout, index) => (
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
