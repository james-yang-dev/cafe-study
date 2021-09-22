import styled from '@emotion/styled';
import React from 'react'
import {useRecoilValue} from 'recoil';
import {orderListState, orderState} from '../../store';

export function OrderList() {
  const orderList = useRecoilValue(orderListState);
  return (
    <OrderListWrapper>
      {/* 
      리스트를 처리하는 방식을 본인 스타일로 구현
      어떻게 바꿔도 상관 없음
      리코일 사용법을 위해 간단한 예시를 둠
       */}
      {orderList.map(order => {
        const { orderId, orderCount, orderPrice } = order
        return (
          <div key={orderId}>
            {orderId} /
            {orderCount} /
            {orderPrice}
          </div>
        )
      })}
    </OrderListWrapper>
  )
}

const OrderListWrapper = styled.div`
`