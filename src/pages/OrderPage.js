import styled from '@emotion/styled'
import React from 'react'
import { OrderBoard } from '../components'
import { MenuList, OrderView } from '../features/order'

export function OrderPage() {
  // 주문 페이지를 여기서 작업하세요
  /**
   * Todos
   * 진입시 최신 주문번호 + 1 한내용 불러오기
   * 메뉴 목록 불러오기
   */
  return (
    <OrderPageWrapper>
      <Wrapper className="left-side">
        <OrderBoard />
        <OrderView />
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
