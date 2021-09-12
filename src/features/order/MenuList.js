import styled from '@emotion/styled';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { menuListState } from '../../store';

export function MenuList() {
  const menuList = useRecoilValue(menuListState);
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
          <div key={menuId}>
            {menuName} /
            {menuSize} /
            {menuPrice}
          </div>
        )
      })}
    </MenuListWrapper>
  )
}

const MenuListWrapper = styled.div`
`