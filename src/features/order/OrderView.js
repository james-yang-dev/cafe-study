import React from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { orderState } from '../../store';
import { OrderViewItem } from './OrderViewItem';

export function OrderView() {
  const orderData = useRecoilValue(orderState);
  // 여기선 목록만 렌더링 해주고, 목록의 상세 아이템은 아이템 뷰어에서 별도 제어함
  return (
    <Wrapper>
      <Wrapper>품목 수량 금액</Wrapper>
      <Wrapper>
        <ul>
          {orderData.map((menu) => (
            <OrderViewItem key={menu.menuId} menu={menu} />
          ))}
        </ul>
      </Wrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
