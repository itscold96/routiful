import { leapfrog } from 'ldrs';
import S from './Loading.module.scss';

export default function Loading() {
  leapfrog.register();

  return (
    <div className={S.loading}>
      <l-leapfrog size="40" speed="2.5" color="#f92e48" />
    </div>
  );
}
