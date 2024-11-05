import { useWorkoutList } from 'queries/useWorkoutList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import S from './PlayList.module.scss';
import { ChevronLeft } from 'lucide-react';

export default function PlayList({ routineId }: { routineId: string }) {
  const { data: workoutList } = useWorkoutList(routineId);
  const [playIndex, setPlayIndex] = useState(0);
  const [currentSets, setCurrentSets] = useState(1);
  const navigate = useNavigate();

  const totalWorkoutCount = workoutList.length;
  const { name, sets: totalSets, reps } = workoutList[playIndex];
  const percentage = (currentSets / totalSets) * 100;
  const completeButtonText = (currentSets === totalSets ? '마지막 ' : currentSets) + '세트 완료!';

  const handleCompleteSetClick = () => {
    if (currentSets + 1 > totalSets) {
      // 현재 세트 수 + 1 이 현재 운동의 세트 수보다 크다면
      if (playIndex + 1 === totalWorkoutCount) {
        // 다음 운동이 없다면 루틴 종료하고 루틴 페이지로 이동
        alert('루틴 종료'); // TODO: alert 컴포넌트 제작
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

  const handleGoToBackClick = () => {
    const isConfirm = confirm('루틴을 종료하시겠어요?'); // TODO: confirm 컴포넌트 제작
    if (isConfirm) {
      navigate('/routine');
    }
  };

  return (
    <div className={S.playlist}>
      <div className={S.titleContainer}>
        <ChevronLeft onClick={handleGoToBackClick} size={38} strokeWidth={2} className={S.goToBackButton} />
        <p className={S.name}>{name}</p>
      </div>
      <div className={S.progressContainer}>
        <CircularProgressbarWithChildren
          value={percentage}
          strokeWidth={7}
          styles={buildStyles({
            // Colors
            pathColor: '#f92e48', // $red
            textColor: '#f92e48', // $red
            trailColor: '#27272a', // $gray800
          })}
        >
          <div className={S.progressbarTextContainer}>
            <p className={S.reps}>세트 당 {reps}회</p>
            <p className={S.sets}>{`${currentSets} / ${totalSets}`}</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <button className={S.completeButton} onClick={handleCompleteSetClick}>
        {completeButtonText}
      </button>
    </div>
  );
}
