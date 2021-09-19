import React from 'react';

import styled from '@emotion/styled';
import { useSetRecoilState } from 'recoil';
import { setOrderMenuCount } from '../../store';
import { Button } from '../../components';

export function OrderViewItem({ menu }) {
  const setMenuCount = useSetRecoilState(setOrderMenuCount);

  const { menuId, menuName, menuSize, menuPrice, menuCount } = menu;

  // 라인 전체를 클릭시에는 1개를 카운트 증가 시킨다. 필요하면 대상 영역을 변경하기도 함
  const handlePlusMenuCount = () => {
    setMenuCount({ menuId, count: +1 });
  };

  // 빼기 버튼 클릭시에는 갯수를 한개 뺀다. 상위 래퍼에 전체 증가시키는 이벤트가 있어서 이벤트 전파를 중단시킨다.
  const handleMinusMenuCount = (event) => {
    event.stopPropagation();
    setMenuCount({ menuId, count: -1 });
  };

  return (
    <OrderViewItemWrapper onClick={handlePlusMenuCount}>
      <MenuItem>{menuName}</MenuItem>
      <MenuItem>{menuSize}</MenuItem>
      <MenuItem>{menuCount}</MenuItem>
      <MenuItem>{menuCount * menuPrice}</MenuItem>{' '}
      <Button text="빼기" onClick={handleMinusMenuCount} />
    </OrderViewItemWrapper>
  );
}

const OrderViewItemWrapper = styled.li``;

const MenuItem = styled.span`
  display: inline-block;
  vertical-align: top;
  width: 15%;
`;
