import styled from '@emotion/styled'
import React from 'react'
import { useEffect } from 'react/cjs/react.development'
import { useRecoilState, useRecoilValue } from 'recoil'
import { Button, OrderBoard } from '../components'
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

  const updateMenu = (menuId) => () => {
    setState(state => ({
      ...state,
      selectedMenuList: state.selectedMenuList
          .map(menu => menu.menuId === menuId ? { ...menu, menuCount: menu.menuCount - 1 } : menu)
          .filter(menu => menu.menuCount > 0)
    }))
  }
  const resetOrder = () => {
    if(window.confirm("초기화 하시겠습니까?")) setState(state => ({...state, selectedMenuList: []}))
  }
  const order = () => {
    if(state.selectedMenuList.length) {
      console.log("order")      
    }
  }
  return (
    <OrderPageWrapper>
      <Wrapper className="left-side">
        <OrderBoard />
        <OrderView >
          {state.selectedMenuList.map(({menuId, menuName, menuSize, menuPrice, menuCount},index) => 
          <li key={`Selected__OrderItem__${index}`}>
            <MenuItem>{menuName}</MenuItem><MenuItem>{ menuSize }</MenuItem><MenuItem>{ menuCount }</MenuItem><MenuItem>{ menuCount * menuPrice }</MenuItem> <Button text="빼기" onClick={updateMenu(menuId)} />
          </li>)}
        </OrderView>
        <Button text="취소" onClick={resetOrder} /><Button text="주문" onClick={order} />
      </Wrapper>
      <Wrapper>
        <MenuList />
      </Wrapper>
    </OrderPageWrapper>
  )
}
const OrderPageWrapper = styled.div`
  .left-side{
    float: left;
    width: 400px;
    margin-right: 1em;
  }
  .left-side + div{
    overflow:hidden;
  }
`
const Wrapper = styled.div``
const MenuItem = styled.span`
  display: inline-block;
  vertical-align: top;
  width: 15%;
`
