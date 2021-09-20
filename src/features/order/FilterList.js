import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import {FilterListState, MenuListState} from '../../store';
import {Button} from '../../components';
import React, {useState} from "react";

export const FilterList = () => {
  const numRegex = /[0-9]/g;
  const menuList = useRecoilValue(MenuListState);

  const filterConditionList = useRecoilValue(FilterListState);
  const [searchValue, setSearchValue] = useState('');
  const handleSearch = () => {
    let searchResult = [];
    if(numRegex.test(searchValue)) {
      menuList.items.forEach((item, index) => {
        const size = item.productPrice.size;
        const sizeKeys = Object.keys(size);
        sizeKeys.forEach((sizeKey) => {
          if(size[sizeKey] === +searchValue) searchResult.push(item);
        });
      });
    } else {
      searchResult = menuList.items.filter((item) => item.productName.indexOf(searchValue) > -1);
    }
  };
  const handleInit = () => {
    console.log('초기화');
  }
  const handleFilter = (type, filterValue) => (e) => {
    const ENG_REGEX =/[a-zA-Z]/g;

    let filterResult = [];
    filterResult = menuList.items.filter((value) => {
      switch (type) {
        case 'size' :
          const sizeKeys = Object.keys(value.productPrice.size);
          sizeKeys.includes(filterValue)
          return sizeKeys.includes(filterValue);
        case 'isOnlyIce' :
          return value.isOnlyIce;
        default :
          if(ENG_REGEX.test(filterValue)) {
            const valueUpperCase = filterValue.toUpperCase();
            const keyLabel = Object.keys(value.ingredientLabel).map((item) => item.toUpperCase());
            return keyLabel.includes(valueUpperCase);
          } else {
            const keyInfo = Object.keys(value.ingredientLabel).map((item) => value.ingredientLabel[item].ko);
            return keyInfo.includes(filterValue);
          }
      }
    });
    // 상품 목록 진하게 표시
  };
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
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