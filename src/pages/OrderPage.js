import styled from '@emotion/styled'
import React from 'react'
import { useEffect } from 'react/cjs/react.development'
import { useRecoilState, useRecoilValue } from 'recoil'
import { OrderBoard } from '../components'
import { MenuList, OrderView } from '../features/order'
import { getNextOrderId, orderListState, orderState } from '../store'

async function fakeApi () {
  const response = await new Promise((resolve) => {
    setTimeout(() => resolve(2), 3000)
  }) 
  return response
}

export function OrderPage() {
  // 주문 페이지를 여기서 작업하세요
  const [ state, setState ]= useRecoilState(orderState)
  const nextOrderId = useRecoilValue(getNextOrderId)
  /**
   * Todos
   * 진입시 최신 주문번호 + 1 한내용 불러오기
   * 메뉴 목록 불러오기
   */
  useEffect(()=>{
    if(state.status === "INIT") {
      setState(state => {
        return {
          ...state,
          status: "PENDING",
          currentOrderId: nextOrderId
        }
      })
    }
  },[state, setState, nextOrderId])
  return (
    <OrderPageWrapper>
      <Wrapper className="left-side">
        <OrderBoard />
        <OrderView />
        {state.selectedMenuList.map(({menuId, menuName, menuPrice, menuCount},index) => <li key={`Selected__OrderItem__${index}`}>
          {menuId} / {menuName} / { menuCount } / { menuPrice }
        </li>)}
      </Wrapper>
      <Wrapper>
        <MenuList />
      </Wrapper>
    </OrderPageWrapper>
  )
}

const Wrapper = styled.div``
const OrderPageWrapper = styled.div`
  .left-side{
    float: left;
    margin-right: 1em;
  }
  .left-side + div{
    overflow:hidden;
  }
`
