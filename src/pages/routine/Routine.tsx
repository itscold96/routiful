import Search from 'components/@shared/search/Search';
import S from './Routine.module.scss';
import RoutineList from 'components/routine/routineList/RoutineList';
import { Suspense, useEffect, useState } from 'react';
import Loading from 'components/@shared/loading/Loading';
import Dialog from 'components/@shared/overlay/dialog/Dialog';
import { useConfirm } from 'hooks/useConfirm';

export default function Routine() {
  const [keyword, setKeyword] = useState('');
  const { confirm, confirmMessage, isConfirmOpen, onConfirmCancel, onConfirmOk } = useConfirm();

  const handleConfirm = async () => {
    const isConfirm = await confirm('튜토리얼');
    if (isConfirm) {
      // 다시 보지 않기 클릭
      localStorage.setItem('isTutorialRequired', JSON.stringify({ isRequired: false }));
    }
  };

  useEffect(() => {
    // 로컬스토리지에서 isTutorialRequired 꺼냄
    const storage = localStorage.getItem('isTutorialRequired');
    if (!storage) {
      // isTutorialRequired 키가 없다면 생성 후 튜토리얼 모달을 띄움
      localStorage.setItem('isTutorialRequired', JSON.stringify({ isRequired: true }));
    } else {
      // isTutorialRequired 키가 있다면 값을 판단함
      const { isRequired } = JSON.parse(storage) as { isRequired: boolean };
      if (isRequired) {
        handleConfirm();
      }
    }
  }, []);

  return (
    <div className={S.routineContainer}>
      <h1 className={S.title}>루틴리스트</h1>
      <Search setKeyword={setKeyword} />
      <Suspense fallback={<Loading />}>
        <RoutineList keyword={keyword} />
      </Suspense>
      <Dialog isDialogOpen={isConfirmOpen} message={confirmMessage}>
        <button onClick={onConfirmOk}>다시 보지 않기</button>
        <button onClick={onConfirmCancel}>확인</button>
      </Dialog>
    </div>
  );
}
