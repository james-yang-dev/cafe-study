import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { getNextOrderId, getOrderSumData } from '../../store';

export function OrderBoard() {
  // order State 값들만 뿌려 준다
  const nextOrderId = useRecoilValue(getNextOrderId);
  const { totalCount, totalPrice } = useRecoilValue(getOrderSumData);
  // TODO
  return (
    <Wrapper>
      주문 번호 : {nextOrderId} 수량: {totalCount} 금액 : {totalPrice} 원
    </Wrapper>
  );
}

const Wrapper = styled.div``;
