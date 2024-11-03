import { useWorkoutList } from 'queries/useWorkoutList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PlayList({ routineId }: { routineId: string }) {
  const { data: workoutList } = useWorkoutList(routineId);
  const [playIndex, setPlayIndex] = useState(0);
  const [currentSets, setCurrentSets] = useState(1);
  const navigate = useNavigate();

  const handleCompleteSetClick = () => {
    if (workoutList && currentSets + 1 > workoutList[playIndex].sets) {
      // 현재 세트 수 + 1 이 현재 운동의 세트 수보다 크다면
      if (playIndex + 1 === workoutList.length) {
        // 다음 운동이 없다면 루틴 종료하고 루틴 페이지로 이동
        alert('루틴 종료');
        navigate('/routine');
        return;
      }
      // 다음 운동으로 이동 및 세트 수 1로 초기화
      setPlayIndex((prevState) => prevState + 1);
      setCurrentSets(1);
    } else {
      // 그렇지 않다면 세트 수만 증가
      setCurrentSets((prevState) => prevState + 1);
    }
  };

  return (
    <div>
      <div>name: name{workoutList?.at(playIndex)?.name}</div>
      <div>sets: {workoutList?.at(playIndex)?.sets}</div>
      <div>reps: {workoutList?.at(playIndex)?.reps}</div>
      <div>playIndex: {playIndex}</div>
      <div>currentSets: {currentSets}</div>
      <button onClick={handleCompleteSetClick}>{currentSets}세트 완료</button>
    </div>
  );
}
