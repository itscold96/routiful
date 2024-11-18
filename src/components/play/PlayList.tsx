import { useWorkoutList } from 'queries/useWorkoutList';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import S from './PlayList.module.scss';
import { ChevronLeft } from 'lucide-react';
import { useConfirm } from 'hooks/useConfirm';
import { useAlert } from 'hooks/useAlert';
import Dialog from 'components/@shared/overlay/dialog/Dialog';
import { useToastAction } from 'stores/toast/action/useToastAction';

export default function PlayList({ routineId }: { routineId: string }) {
  const { data: workoutList } = useWorkoutList(routineId);
  const [playIndex, setPlayIndex] = useState(0);
  const [currentSets, setCurrentSets] = useState(1);
  const navigate = useNavigate();
  const { confirm, isConfirmOpen, confirmMessage, onConfirmCancel, onConfirmOk } = useConfirm();
  const { alert, alertMessage, isAlertOpen, onCloseAlert } = useAlert();
  const { addToast } = useToastAction();

  const totalWorkoutCount = workoutList.length;
  const { name, sets: totalSets, reps } = workoutList[playIndex];
  const percentage = (currentSets / totalSets) * 100;
  const completeButtonText = (currentSets === totalSets ? '마지막 ' : currentSets) + '세트 완료!';

  const handleGoToBackClick = async () => {
    const isConfirm = await confirm('루틴을 종료하시겠습니까?');
    if (isConfirm) {
      navigate('/routine');
      addToast({ type: 'warn', message: '다음은 꼭 해낼 거에요!' });
    }
  };

  const handleCompleteSetClick = async () => {
    if (currentSets + 1 > totalSets) {
      // 현재 세트 수 + 1 이 현재 운동의 세트 수보다 크다면
      if (playIndex + 1 === totalWorkoutCount) {
        // 다음 운동이 없다면 루틴 종료하고 루틴 페이지로 이동
        await alert('루틴을 완료했습니다!');
        navigate('/routine');
        addToast({ type: 'success', message: '오늘도 루틴 성공!' });
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
    <div className={S.playlist}>
      <div className={S.titleContainer}>
        <ChevronLeft onClick={handleGoToBackClick} size={38} strokeWidth={2} className={S.goToBackButton} />
        <Dialog isDialogOpen={isConfirmOpen} message={confirmMessage} type={'warn'}>
          <button onClick={onConfirmOk}>종료</button>
          <button onClick={onConfirmCancel}>취소</button>
        </Dialog>
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
      <Dialog isDialogOpen={isAlertOpen} message={alertMessage} type={'success'}>
        <button onClick={onCloseAlert}>확인</button>
      </Dialog>
    </div>
  );
}
