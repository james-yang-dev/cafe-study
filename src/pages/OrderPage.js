import styled from '@emotion/styled';
import React from 'react';
import { CurrentOrderContainer } from '../features/order/CurrentOrderContainer';
import { MenuListContainer } from '../features/order/MenuListContainer';


export function OrderPage() {
  // 주문 페이지를 여기서 작업하세요
  /**
   * Todos
   * 진입시 최신 주문번호 + 1 한내용 불러오기
   * 메뉴 목록 불러오기
   */
  return (
    <OrderPageWrapper>
      <CurrentOrderContainer />
      <MenuListContainer />
    </OrderPageWrapper>
  );
}

const OrderPageWrapper = styled.div`
  display: flex;
  min-width: 1420px;
  > div {
    width: 49%;
    min-width: 900px;
    height: 800px;
    padding: 1.5% 3%;
    box-sizing: border-box;
    background-color: #f1f1f1;
    border-radius: 10px;
  }
  > div + div {
    margin-left: 2%;
  }

  > div:first-of-type {
    display: flex;
    flex-direction: column;
  }
`;
