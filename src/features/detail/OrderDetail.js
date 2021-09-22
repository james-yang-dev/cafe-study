import styled from '@emotion/styled';
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '../../components';
import {getNextOrderId, getOrderSumCount, getOrderSumPrice, orderListState, orderState} from '../../store';

export function OrderDetail() {
  const [orders, setOrders] = useRecoilState(orderListState);
  const nextOrderId = useRecoilValue(getNextOrderId)
  const [menuList, setMenuList] = useRecoilState(orderState);
  const [selectMenuList, setSelectMenuList] = useRecoilState(orderState);
  const totalCount = useRecoilValue(getOrderSumCount);
  const totalPrice = useRecoilValue(getOrderSumPrice);

  const handleRemoveOrder = ({ menuId }) => (e) => {
    setSelectMenuList((menuItem) => {
      return {
        selectedMenuList: menuItem?.selectedMenuList.filter((item) => item.menuId !== menuId)
      };
    });
  };

  const handleTakeout = ({ menuId }) => (e) => {
    setSelectMenuList((menuItem) => {
      let filterArr = menuItem.selectedMenuList.filter((item) => item.menuId === menuId).map((item) => {
        const isTakeout = !item.isTakeout
        return {
          ...item,
          isTakeout
        }
      });
      let arr = menuItem.selectedMenuList.filter((item) => item.menuId !== menuId);

      return {
        selectedMenuList: [
          ...arr,
          ...filterArr,
        ]
      };
    });
  };

  const handleTakeoutAll = () => {
    setSelectMenuList((menuItem) => {
      let newArr = menuItem.selectedMenuList.map((item) => {
        const isTakeout = !item.isTakeout;
        return {
          ...item,
          isTakeout,
        }
      });

      return {
        selectedMenuList: [
          ...newArr,
        ]
      };
    });
  }

  const handleOrderComplete = (e) => {
    const newOrder = {
      orderId: nextOrderId,
      orderCount: totalCount,
      orderPrice: totalPrice,
      orderDetail: [selectMenuList.selectedMenuList]
    }

    setOrders((orders) => [...orders, newOrder])

  }

  const handleOrderCancel = (e) => {
    if(window.confirm('정말로 전체 주문을 취소 하시겠습니까?')) {
      setSelectMenuList({
        selectedMenuList: []
      })
    }
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
          menuList.selectedMenuList.map(({menuId, menuName, menuPrice, menuSize, menuCount, isTakeout})=> {
            return (
              <li key={menuId}>
                {menuName} {menuSize} {menuPrice} {menuCount}
                <Button onClick={handleRemoveOrder({menuId})} text="빼기"/>
                <label>
                  <ScreenOut>포장 여부</ScreenOut>
                  <input type="checkbox" checked={isTakeout} onChange={handleTakeout({menuId})}/>
                </label>
              </li>
            )
          })
        }
      </ul>
      <Button onClick={handleTakeoutAll} text="전체포장" />
      <Button onClick={handleOrderCancel} text="전체취소" />
      <Button onClick={handleOrderComplete} text="주문완료" />
    </OrderDetailWrapper>
  )
}

const OrderDetailWrapper = styled.div`
  
`
const ScreenOut = styled.span`
  overflow: hidden;
  position: absolute;
  width: 0;
  height: 0;
  line-height: 0;
  text-indent: -9999px;
`;