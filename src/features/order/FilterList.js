import styled from '@emotion/styled';
import {useRecoilState, useRecoilValue} from 'recoil';
import {FilterListState, MenuListFilterState, MenuListState} from '../../store';
import {Button} from '../../components';
import React, {useState} from "react";

// TODO : 초기화
// TODO : Filter (메뉴명, 메뉴 태그)
// TODO : 검색 (메뉴명, 금액) - Input Change
// TODO : store : recoil
// TODO : styled
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
  }
  const handleInit = () => {
    setFilter({
      type: 'all',
      value: '',
    });
  }


  return (
    <FilterListWrapper>
      <strong>메뉴 검색</strong>
      <input type="text" id="searchKeyword" title="검색" value={searchValue} onChange={handleSearchChange}/>
      <Button onClick={handleSearch} text="검색"/>
      <strong>필터 LIST</strong>
      <ul>
        {
          filterConditionList.map((item) => {
            return (
              <li key={`item_${item.id}`}>
                <Button onClick={handleFilter(item.type, item.text)} text={item.text} />
              </li>
            );
          })
        }
      </ul>
      <Button onClick={handleInit} text="초기화"/>
    </FilterListWrapper>
  )
};

const FilterListWrapper = styled.div `
`