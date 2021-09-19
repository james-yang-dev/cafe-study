import React from 'react';

import styled from '@emotion/styled';
import { orderState, setOrderMenuCount } from '../../store';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Button } from '../../components';

export function MenuListItem({ menu }) {
  const setMenuCount = useSetRecoilState(setOrderMenuCount);
  const [orderData, setOrderData] = useRecoilState(orderState);

  const { menuId, menuName, menuSize, menuPrice } = menu;

  // 메뉴 추가시에 내부적으로 메뉴리스트와 비교하여 호출함수를 변경하도록 기능 수정함
  const handleClickMenuAdd = () => {
    const hasMenu = orderData.some((menu) => menu.menuId === menuId);
    if (hasMenu) {
      setMenuCount({ menuId, count: 1 });
    } else {
      setOrderData((prev) => [...prev, { ...menu, menuCount: 1 }]);
    }
  };

  return (
    <MenuLisItemWrapper>
      <Button text={menuName} onClick={handleClickMenuAdd}></Button> /{' '}
      <MenuText>{menuSize}</MenuText> / <MenuText>{menuPrice}</MenuText>
    </MenuLisItemWrapper>
  );
}

const MenuLisItemWrapper = styled.li``;

const MenuText = styled.span`
  display: inline-block;
  vertical-align: top;
`;
