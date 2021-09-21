import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button } from '../../components';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { printLabel } from '../../util/string';
import { OrderBody, OrderFoot, OrderHead } from '../../components/order';
import { useRecoilValue } from 'recoil';
import { sumReducer } from '../../util/array';
import { getOrderSumPrice } from '../../store';

OrderDetail.propTypes = {
  orderId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export function OrderDetail({ orderId, list = [], onChecked }) {
  const totalPrice = useRecoilValue(getOrderSumPrice);
  const totalCount = list.map((menu) => menu.menuCount).reduce(sumReducer, 0);
  return (
    <OrderDetailWrapper>
      {/* 
      화면상 주문을 이곳에서 확인하고 주문 완료시에 리스트로 넘어가는 기능을 구현
      랜덤 주문 생성은 recoil 사용법을 가이드 함
      */}
      <OrderHead
        orderId={orderId}
        totalPrice={totalPrice}
        totalCount={totalCount}
      />
      <OrderBody>
        {list.map((order) => {
          const {
            menuId,
            menuName,
            menuSize,
            menuCount,
            menuPrice,
            isPackaging,
          } = order;
          const menuSumPrice = menuCount * menuPrice;
          return (
            <tr key={menuId}>
              <td>{printLabel(menuName, menuSize)}</td>
              <td>{menuCount}</td>
              <td>{menuSumPrice}</td>
              <td>
                <Checkbox
                  isChecked={isPackaging}
                  onChecked={() => onChecked(menuId)}
                />
              </td>
            </tr>
          );
        })}
      </OrderBody>
      <OrderFoot>
        <Button label='취소' onClick={() => {}} />
        <Button label='다시주문하기' onClick={() => {}} />
        <Button varient='confirm' label='주문' onClick={() => {}} />
      </OrderFoot>
    </OrderDetailWrapper>
  );
}

const OrderDetailWrapper = styled.div``;
