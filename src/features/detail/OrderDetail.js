import styled from '@emotion/styled';
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '../../components';
import {getNextOrderId, orderListState, orderState} from '../../store';
import { randomNumber } from '../../util/number'

export function OrderDetail() {
  const [orders, setOrders] = useRecoilState(orderListState);
  const nextOrderId = useRecoilValue(getNextOrderId)

  const [menuList, setMenuList] = useRecoilState(orderState);

  const handleRandomOrder = () => {
    const newOrder = {
      orderId: nextOrderId,
      orderCount: randomNumber(),
      orderPrice: randomNumber(1000, 20000),
      orderDetail: [{}]
    }

    setOrders((orders) => [...orders, newOrder])
  }

  const buttonText = '랜덤 주문 생성'

  return (
    <OrderDetailWrapper>
      {/* 
      화면상 주문을 이곳에서 확인하고 주문 완료시에 리스트로 넘어가는 기능을 구현
      랜덤 주문 생성은 recoil 사용법을 가이드 함
      */}
      <ul>
        {
          menuList.selectedMenuList.map(({menuId, menuName, menuPrice, menuSize, menuCount})=> {
            return (
              <li key={menuId}>{menuName} {menuSize} {menuPrice} {menuCount}</li>
            )
          })
        }
      </ul>
      <Button onClick={handleRandomOrder} text={buttonText} />
    </OrderDetailWrapper>
  )
}

const OrderDetailWrapper = styled.div`
  
`