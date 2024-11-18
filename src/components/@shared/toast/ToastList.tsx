import S from './ToastList.module.scss';
import Toast from './Toast';
import { useToastStore } from 'stores/toast/useToastStore';

export default function ToastList() {
  const toastList = useToastStore((state) => state.toastList);

  return (
    <div className={S.toastContainer}>
      {toastList.map((toast) => (
        <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} />
      ))}
    </div>
  );
}
