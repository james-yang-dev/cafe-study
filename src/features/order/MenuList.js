import styled from '@emotion/styled';
import React from 'react'
import {useRecoilState, useRecoilValue} from 'recoil';
import {filteredMenuListState, orderState} from '../../store';
import {nanoid} from "nanoid";
import {Button} from "../../components";

export function MenuList() {
  const menuList = useRecoilValue(filteredMenuListState);

  /*

const initOrderState = {
  selectedMenuList: [{
    menuId: 'initMenu',
    menuPrice: 0,
    menuCount: 1,
    isTakeout: false
  }],
}

   */

  const [selectMenuList, setSelectMenuList] = useRecoilState(orderState);

  const handleAddOrder = ({menuName, menuSize, menuPrice}) => (e) => {
    setSelectMenuList((menuItem) => {
      // TODO : grouping
      let res = {
        selectedMenuList: [
          ...menuItem.selectedMenuList,
          {
            menuId:  nanoid(),
            menuName,
            menuPrice: +menuPrice,
            menuSize,
            menuCount: 1,
            isTakeout: false,
          }
        ]
      };
      return res;
    });

  };

  return (
    <MenuListWrapper>
      {/*
      리스트를 처리하는 방식을 본인 스타일로 구현
      어떻게 바꿔도 상관 없음
      리코일 사용법을 위해 간단한 예시를 둠
      분할이 필요하면 분할 할 것
       */}
      {menuList.map(menu => {
        const { menuId, menuName, menuSize, menuPrice } = menu
        return (
          <MenuItemWrapper key={menuId} onClick={handleAddOrder({menuName, menuSize, menuPrice})}>
            {menuName} / {menuSize} / {menuPrice}
          </MenuItemWrapper>
        )
      })}
    </MenuListWrapper>
  )
}

const MenuListWrapper = styled.ul`
`

const MenuItemWrapper = styled.li `
cursor: pointer;
`