import { Button } from '../../components';
import { SearchBar } from '../../components/SearchBar';
import { TOGGLE_KEY_LIST } from '../../store';

export function MenuSearch({ option, onChangeQuery, onFilterQuery, onChangeKey }) {
  return (
    <div>
      {/* 서치바에서 동작하는 기능은 내부로 이전함 */}
      <SearchBar value={option.tempQuery} onChange={onChangeQuery} onSearch={onFilterQuery} />
      <div>
        {TOGGLE_KEY_LIST.map((keyValue) => {
          const handleToggleClick = () => onChangeKey(keyValue);
          const isActive = option.key.some((optKey) => optKey === keyValue);

          // 버튼 하나로 처리가 가능해서 별도의 컴포넌트 생성하지 않음
          // class 사용하지 않도록 props를 별도 적용함
          return (
            <Button
              key={keyValue}
              isActive={isActive}
              onClick={handleToggleClick}
              text={keyValue}
            />
          );
        })}
      </div>
    </div>
  );
}

MenuSearch.defaultProps = {
  option: {
    key: [''],
    query: '',
    tempQuery: '',
  },
  onChangeKey: (key) => {
    console.log(key);
  },
  onChangeQuery: (query) => {
    console.log(query);
  },
  keyList: [],
};
