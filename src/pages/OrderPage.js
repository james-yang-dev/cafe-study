import styled from '@emotion/styled';
import React from 'react';
import {FilterList, MenuList} from '../features/order';

export function OrderPage() {
  // 주문 페이지를 여기서 작업하세요
  /**
   * Todos
   * 진입시 최신 주문번호 + 1 한내용 불러오기
   * 메뉴 목록 불러오기
   */
  return (
    <OrderPageWrapper>
      <FilterList/>
      <MenuList />
    </OrderPageWrapper>
  );
};

const OrderPageWrapper = styled.div`
`;