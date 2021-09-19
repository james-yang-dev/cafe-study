import styled from '@emotion/styled';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { MenuList, OrderView, OrderButton, OrderBoard } from '../features/order';
import { menuListState } from '../store';

export function OrderPage() {
  // 메뉴리스트는 한 번만 조회해서 페이지에서 조회해야 함
  const menuList = useRecoilValue(menuListState);

  return (
    <OrderPageWrapper>
      <Wrapper className="left-side">
        <OrderBoard />
        <OrderView />
        <OrderButton />
      </Wrapper>
      <Wrapper>
        <MenuList menuList={menuList} />
      </Wrapper>
    </OrderPageWrapper>
  );
}
const OrderPageWrapper = styled.div`
  .left-side {
    float: left;
    width: 400px;
    margin-right: 1em;
  }
  .left-side + div {
    overflow: hidden;
  }
`;
const Wrapper = styled.div``;
