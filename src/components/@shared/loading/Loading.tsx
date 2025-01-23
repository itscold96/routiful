import { leapfrog } from 'ldrs';
import S from './Loading.module.scss';
import { colors } from 'constants/colors';

export default function Loading() {
  leapfrog.register();

  return (
    <div className={S.loading}>
      <l-leapfrog size="40" speed="2.5" color={colors.$red} />
    </div>
  );
}
