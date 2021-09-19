import React from 'react';

import styled from '@emotion/styled';
import { Button } from '../../components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { getNextOrderId, orderState } from '../../store';

export function OrderButton({}) {
  const order = useRecoilValue(orderState);
  const nextOrderId = useRecoilValue(getNextOrderId);
  const resetOrderState = useResetRecoilState(orderState);

  // 주문 초기화
  const handleResetOrder = () => {
    if (window.confirm('초기화 하시겠습니까?')) {
      resetOrderState();
    }
  };

  // 주문 진행
  const handleOrder = () => {
    if (order.selectedMenuList.length) {
      // 나중에 주문리스트로 전송하는 기능 추가
      console.log('order', nextOrderId, order);
    }
  };

  return (
    <OrderButtonWrapper>
      <Button text="취소" onClick={handleResetOrder} />
      <Button text="주문" onClick={handleOrder} />
    </OrderButtonWrapper>
  );
}

const OrderButtonWrapper = styled.div``;
