import { useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FilterListState, MenuListFilterState } from '../../store';
import { Button } from '../../components';

// TODO : styled (맨 나중)
// MEMO : 검색, 필터, 초기화 할 때마다 메뉴 목록이 달라짐 (완전 고정 아님)

export const FilterList = () => {
  const filterConditionList = useRecoilValue(FilterListState);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    setFilter({
      type: 'search',
      value: searchValue,
    });
    setSearchValue('');
  };

  const [filter, setFilter] = useRecoilState(MenuListFilterState);

  const handleFilter = (type, filterValue) => (e) => {
    e.preventDefault();
    setFilter({
      type,
      value: filterValue,
    });
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleInit = () => {
    setFilter({
      type: 'all',
      value: '',
    });
  };

  return (
    <FilterListWrapper>
      <strong>메뉴 검색</strong>
      <input
        type="text"
        id="searchKeyword"
        title="검색"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <Button onClick={handleSearch} text="검색" />
      <strong>필터 LIST</strong>
      <ul>
        {filterConditionList.map((item) => {
          return (
            <li key={`item_${item.id}`}>
              {/* TODO : filter.value와 일치하는 버튼이 있으면 강조 */}
              <Button
                onClick={handleFilter(item.type, item.text)}
                text={item.text}
              />
            </li>
          );
        })}
      </ul>
      <Button onClick={handleInit} text="초기화" />
    </FilterListWrapper>
  );
};

const FilterListWrapper = styled.div``;
