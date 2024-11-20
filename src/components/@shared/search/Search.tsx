import Input from 'components/@shared/input/Input';
import S from './Search.module.scss';
import { RotateCcw, Search as SearchIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, useDeferredValue, useState, MouseEvent } from 'react';
import { useSearchRoutine } from 'queries/useSearchRoutine';
import { useToggle } from 'hooks/useToggle';

interface SearchProps {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search({ setKeyword }: SearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const deferredValue = useDeferredValue(searchValue);
  const { data: searchList } = useSearchRoutine({ keyword: deferredValue });
  // 검색 실행 시, 자동 완성 미리보기 결과가 있더라도 미리보기를 숨겨야 함.
  const { toggleValue: isHiddenPreview, toggleDispatch } = useToggle();
  const isShowPreview = searchList && searchList.length > 0 && !isHiddenPreview;

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setSearchValue(value);
    toggleDispatch({ type: 'off' });
    if (value === '') {
      setKeyword('');
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(searchValue);
    toggleDispatch({ type: 'on' });
  };

  const handlePreviewItemClick = (event: MouseEvent<HTMLUListElement>) => {
    const { name } = (event.target as HTMLUListElement).dataset;
    if (name) {
      setKeyword(name);
      setSearchValue(name);
      toggleDispatch({ type: 'on' });
    }
  };

  const handleResetClick = () => {
    setSearchValue('');
    setKeyword('');
  };

  return (
    <form className={S.searchForm} onSubmit={handleFormSubmit}>
      <SearchIcon className={S.searchIcon} size={25} strokeWidth={2.5} />
      <Input
        className={S.searchInput}
        value={searchValue}
        onChange={handleSearchValueChange}
        onClick={() => toggleDispatch({ type: 'on' })}
      />
      <button className={S.resetButton}>
        <RotateCcw size={25} strokeWidth={2.5} onClick={handleResetClick} />
      </button>
      {isShowPreview && (
        <ul onClick={handlePreviewItemClick} className={S.preview}>
          {searchList?.map((routine) => (
            <li key={routine.id} className={S.previewItem} data-name={routine.name}>
              {routine.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
