import S from './Slogan.module.scss';
import { BicepsFlexed, Disc3 } from 'lucide-react';
import classNames from 'classnames';

export default function Slogan() {
  return (
    <div className={S.slogan}>
      <p>
        루틴을 <Disc3 size={40} strokeWidth={2.5} className={S.red} />
      </p>
      <p>플레이리스트처럼!</p>
      <p>
        매일매일 <BicepsFlexed size={40} strokeWidth={2.5} className={S.red} />
      </p>
      <p>
        <span className={classNames(S.red, S.stroke)}>Routiful</span> 하게!
      </p>
    </div>
  );
}
