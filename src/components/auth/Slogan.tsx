import S from './Slogan.module.scss';
import { BicepsFlexed, Disc3 } from 'lucide-react';
import classNames from 'classnames';

export default function Slogan() {
  return (
    <div className={S.slogan}>
      <p>
        루틴을 <Disc3 strokeWidth={2.5} className={classNames(S.red, S.icon)} />
      </p>
      <p>플레이리스트처럼!</p>
      <p>
        매일매일 <BicepsFlexed strokeWidth={2.5} className={classNames(S.red, S.icon)} />
      </p>
      <p>
        <span className={classNames(S.red, S.stroke)}>Routiful</span> 하게!
      </p>
    </div>
  );
}
