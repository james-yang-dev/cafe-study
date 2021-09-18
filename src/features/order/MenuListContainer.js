import styled from '@emotion/styled';
import React, { useEffect, useReducer } from 'react';
import { useRecoilValue } from 'recoil';
import { menuListState } from '../../store';
import { MenuList } from './MenuList';
import { MenuSearch } from './MenuSearch';

export function MenuListContainer() {
  const storeMenuList = useRecoilValue(menuListState);

  const handleChangeInput = (e) => {
    const { value } = e.target;
  };

  const handleSearchMenu = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
  };

  const handleSearchReset = () => {};

  useEffect(() => {}, [storeMenuList]);

  return (
    <div>
      <MenuSearch
        onChange={handleChangeInput}
        onSearch={handleSearchMenu}
        onSearchReset={handleSearchReset}
      />
      <MenuList menuList={[]} />
    </div>
  );
}
