import styled from '@emotion/styled';
import {useRecoilValue} from "recoil";
import {getOrderSumCount, getOrderSumPrice} from "../../store";

export function OrderInfo () {
  const totalCount = useRecoilValue(getOrderSumCount);
  const totalPrice = useRecoilValue(getOrderSumPrice);

  return (
    <OrderInfoWrapper>
      <ul>
        <li>주문 번호 : </li>
        <li>전체 : {totalCount} 개</li>
        <li>{totalPrice}원</li>
      </ul>
    </OrderInfoWrapper>
  )
}

const OrderInfoWrapper = styled.div``;