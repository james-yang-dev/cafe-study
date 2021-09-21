import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import { printLabel } from '../../util/string';
import { sumReducer } from '../../util/array';
import { useRecoilValue } from 'recoil';
import { getOrderSumPrice } from '../../store';
import { OrderBody, OrderFoot, OrderHead } from '../../components/order';

CurrentOrder.propTypes = {
  orderId: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  onReset: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export function CurrentOrder({
  orderId,
  list = [],
  onReset,
  onConfirm,
  onDecrease,
}) {
  const totalPrice = useRecoilValue(getOrderSumPrice);
  const totalCount = list.map((menu) => menu.menuCount).reduce(sumReducer, 0);
  return (
    <div>
      <OrderHead
        orderId={orderId}
        totalPrice={totalPrice}
        totalCount={totalCount}
      />
      <OrderBody>
        {list.map((order) => {
          const { menuName, menuSize, menuCount, menuId, menuPrice } = order;
          const menuSumPrice = menuCount * menuPrice;
          return (
            <tr key={menuId}>
              <td>{printLabel(menuName, menuSize)}</td>
              <td>{menuCount}</td>
              <td>{menuSumPrice}</td>
              <td>
                <Button label='빼기' onClick={() => onDecrease(menuId)} />
              </td>
            </tr>
          );
        })}
      </OrderBody>
      <OrderFoot>
        <Button label='취소' onClick={onReset} />
        <Button varient='confirm' label='주문' onClick={onConfirm} />
      </OrderFoot>
    </div>
  );
}
