import styled from '@emotion/styled';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { orderListState } from '../../store';

// TODO : 주문 전체 목록 불러오기
// TODO : 개별 주문 상태 변경 (완료 버튼 누를 경우 취소선 적용)
// TODO : store : recoil
// TODO : styled
// TODO : 더미데이터 > API

export function OrderList() {
  const allOrderList = [
    {
      "orderCode": "A-32",
      "orderCount": 2,
      "totalPrice": 4000,
      "isComplete": true
    },
    {
      "orderCode": "A-34",
      "orderCount": 10,
      "totalPrice": 20000,
      "isComplete": false
    },
  ]
  const orderList = useRecoilValue(orderListState);
  return (
    <OrderListWrapper>
      <strong>전체 주문 목록</strong>
      <ul>
        {
          allOrderList.map((item) => {
            const code = item.orderCode;
            const count = item.orderCount;
            const isComplete = item.isComplete;
            const totalPrice = item.totalPrice;
            return (
              // isComplete가 true면 취소선 처리
              <li key={item.orderCode}>
                {code} / {count}개 / {totalPrice}
              </li>
            )
          })
        }
      </ul>
      {/*
      리스트를 처리하는 방식을 본인 스타일로 구현
      어떻게 바꿔도 상관 없음
      리코일 사용법을 위해 간단한 예시를 둠
       */}
      {/*{orderList.map(order => {*/}
      {/*  const { orderId, orderCount, orderPrice } = order*/}
      {/*  return (*/}
      {/*    <div key={orderId}>*/}
      {/*      {orderId} /*/}
      {/*      {orderCount} /*/}
      {/*      {orderPrice}*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*})}*/}
    </OrderListWrapper>
  )
}

const OrderListWrapper = styled.div`
`