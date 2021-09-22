import { useState } from 'react';
import styled from '@emotion/styled';
import {useRecoilState, useRecoilValue} from 'recoil';
import {filterTypeState, menuListFilterState} from '../../store';
import { Button } from '../../components';

export const FilterList = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useRecoilState(menuListFilterState);
  const [filterType, setFilterType] = useRecoilState(filterTypeState);

  const activeFilterList =  (type, text) => {
    // TODO : bug fix ... 왜 안되지 ...
    const keys = Object.keys(filterType);
    let arr = [];
    keys.forEach((item) => {
      if(filterType[type].isChecked) {
        arr = [
          ...arr,
          filterType[type].text
        ]
      }
    });
    arr = [...new Set(arr)];
    return arr.join().includes(text);
  }

  const handleSearch = () => {
    setFilter({
      type: 'search',
      value: searchValue,
    });
    setSearchValue('');
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

  const handleFilter = (type, filterValue) => (e) => {
    e.preventDefault();
    setFilterType((info) => {
      return {
        ...info,
        [type]: {
          // TODO : bug fix ...
          isChecked: !info[type].isChecked,
          // TODO : bug fix ...타입이 한 개+ text가 여러개 들어가 있는 경우 ...
          text: [
            ...info[type].text,
            filterValue
          ]
        }
      }
    });
    setFilter({
      type: type,
      value: filterValue,
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
      <br/>
      <strong>필터 LIST</strong>
      <FilterButtonListWrapper>
        <FilterButtonItemWrapper>
          <FilterButton
            activeFilterList={activeFilterList("menuSize","Tall")} filterType="menuSize"
            onClick={handleFilter('menuSize', 'Tall')}
            text="Tall"
          >
            Tall
          </FilterButton>
        </FilterButtonItemWrapper>
        <FilterButtonItemWrapper>
          <FilterButton
            activeFilterList={activeFilterList("menuName", "ICE")} filterType="menuName"
            onClick={handleFilter('menuName', 'ICE')}
            text="ICE"
          >
            ICE
          </FilterButton>
        </FilterButtonItemWrapper>
        <FilterButtonItemWrapper>
          <FilterButton
            activeFilterList={activeFilterList("ingredients", 'Milk')} filterType="ingredients"
            onClick={handleFilter('ingredients', 'Milk')}
            text="Milk"
          >
            MilK
          </FilterButton>
        </FilterButtonItemWrapper>
      </FilterButtonListWrapper>
      <br/>
      <Button onClick={handleInit} text="초기화" />

    </FilterListWrapper>
  );
};

const FilterButtonListWrapper = styled.ul``;
const FilterButtonItemWrapper = styled.li``;

const FilterButton = styled.button`
  font-weight: ${(props) => props.activeFilterList ? 'bold' : 'normal'}
`

const FilterListWrapper = styled.div``;