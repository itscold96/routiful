import Search from 'components/@shared/search/Search';
import S from './Routine.module.scss';

export default function Routine() {
  return (
    <div className={S.routineContainer}>
      <h1 className={S.title}>루틴 리스트</h1>
      <Search />
    </div>
  );
}
