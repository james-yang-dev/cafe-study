import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button } from '../../components';
import { Checkbox } from '../../components/checkbox/Checkbox';
import { printLabel } from '../../util/string';
import { OrderBody, OrderFoot, OrderHead } from '../../components/order';

OrderDetail.propTypes = {
  orderId: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  onChecked: PropTypes.func.isRequired,
  onAllPackaging: PropTypes.func.isRequired,
  onReOrder: PropTypes.func.isRequired,
  onConfirmOrder: PropTypes.func.isRequired,
};

export function OrderDetail({
  orderId,
  totalCount,
  totalPrice,
  list = [],
  onChecked,
  onAllPackaging,
  onReOrder,
  onConfirmOrder,
}) {
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
        <Button label='전체포장' onClick={onAllPackaging} />
        <Button label='다시 주문하기' onClick={onReOrder} />
        <Button varient='confirm' label='주문 확인' onClick={onConfirmOrder} />
      </OrderFoot>
    </OrderDetailWrapper>
  );
}

const OrderDetailWrapper = styled.div``;
