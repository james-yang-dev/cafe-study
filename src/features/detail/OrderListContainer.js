import React from 'react';
import { useRecoilState } from 'recoil';
import { OrderList } from '.';
import { orderListState } from '../../store';

export function OrderListContainer() {
  const [orderList, setOrderList] = useRecoilState(orderListState);
  const sortedOrderList = [...orderList].sort(
    (a, b) => a.isComplete - b.isComplete
  );
  const handleCopmelteOrder = (orderId) => {
    const newOrderList = orderList.map((order) =>
      order.orderId === orderId
        ? { ...order, isComplete: !order.isComplete }
        : order
    );
    setOrderList(newOrderList);
  };

  return <OrderList list={sortedOrderList} onComplete={handleCopmelteOrder} />;
}
