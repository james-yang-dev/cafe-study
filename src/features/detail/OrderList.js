import React from 'react';
import styled from '@emotion/styled';
import { Button } from '../../components';

export function OrderList({ list, onComplete }) {
  return (
    <OrderListWrapper>
      {/* 
      리스트를 처리하는 방식을 본인 스타일로 구현
      어떻게 바꿔도 상관 없음
      리코일 사용법을 위해 간단한 예시를 둠
       */}
      <OrderListStyled>
        {list.map((order) => {
          const { orderId, orderCount, orderPrice, isComplete } = order;
          return (
            <OrderListItem key={orderId} isComplete={isComplete}>
              <div>
                <span> 주문번호: {orderId}</span>
                <span>수량: {orderCount} </span>
                <span>전체가격: {orderPrice}</span>
              </div>
              {!isComplete && (
                <Button label='완료' onClick={() => onComplete(orderId)} />
              )}
            </OrderListItem>
          );
        })}
      </OrderListStyled>
    </OrderListWrapper>
  );
}

const OrderListWrapper = styled.div``;
const OrderListStyled = styled.ul`
  > li + li {
    margin-top: 15px;
  }
`;
const OrderListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 16px;
  font-weight: bold;

  ${({ isComplete }) => isComplete && 'text-decoration : line-through'};

  > div > span + span {
    margin-left: 20px;
  }
`;
