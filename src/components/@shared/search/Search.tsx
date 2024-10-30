import Input from 'components/@shared/input/Input';
import S from './Search.module.scss';
import { Search as SearchIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO: 루틴 추가, 운동 추가 끝나면 디바운싱 or useTransition 추가하고 입력할 때마다 검색되도록 구현하기
    const { value } = event.target as HTMLInputElement;
    setSearchValue(value);
  };

  return (
    <form className={S.searchForm}>
      <SearchIcon className={S.searchIcon} size={20} />
      <Input className={S.search} value={searchValue} onChange={handleSearchValueChange} />
    </form>
  );
}
