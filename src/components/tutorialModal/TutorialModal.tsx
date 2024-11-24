import Dialog from 'components/@shared/overlay/dialog/Dialog';
import { useConfirm } from 'hooks/useConfirm';
import { useEffect } from 'react';
import S from './TutorialModal.module.scss';
import Carousel from './Carousel';

export default function TutorialModal() {
  const { confirm, confirmMessage, isConfirmOpen, onConfirmCancel, onConfirmOk } = useConfirm();

  const handleConfirm = async () => {
    const isConfirm = await confirm('루티플 사용법');
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
    <Dialog isDialogOpen={isConfirmOpen} message={confirmMessage}>
      <div className={S.modalContainer}>
        <Carousel />
        <section className={S.buttonContainer}>
          <button onClick={onConfirmOk} className={S.optOut}>
            다시 보지 않기
          </button>
          <button onClick={onConfirmCancel}>닫기</button>
        </section>
      </div>
    </Dialog>
  );
}
