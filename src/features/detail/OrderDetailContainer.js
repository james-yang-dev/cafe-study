import React from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { OrderDetail } from '.';
import {
  getOrderSumPrice,
  orderDetailListState,
  orderListState,
  orderState,
} from '../../store';
import { sumReducer } from '../../util/array';

export function OrderDetailContainer() {
  const [orderDetailList, setOrderDetailList] =
    useRecoilState(orderDetailListState);

  const { orderId, orderList } = orderDetailList;

  const totalPrice = useRecoilValue(getOrderSumPrice);
  const totalCount = orderList
    .map((menu) => menu.menuCount)
    .reduce(sumReducer, 0);
  // console.log(orders);
  const handleChangePackageState = (menuId) => {
    const newOrderDetailList = orderList?.map((menu) =>
      menu.menuId === menuId
        ? { ...menu, isPackaging: !menu.isPackaging }
        : menu
    );
    setOrderDetailList({ ...orderDetailList, orderList: newOrderDetailList });
  };

  const handleAllPackaging = () => {
    const newOrderDetailList = orderList.map((menu) => ({
      ...menu,
      isPackaging: true,
    }));
    setOrderDetailList({ ...orderDetailList, orderList: newOrderDetailList });
  };

  const history = useHistory();
  const handleReOrder = () => {
    if (window.confirm('다시 주문하시겠습니까?')) {
      setOrderDetailList({ ...orderDetailList, orderList: [] });
      history.push('/order');
    }
  };

  const [orderStatusList, setOrderStatusList] = useRecoilState(orderListState);
  const [currentOrderList, setCurrentOrderList] = useRecoilState(orderState);
  const handleConfirmOrder = () => {
    const newOrder = {
      orderId,
      orderCount: totalCount,
      orderPrice: totalPrice,
      orderDetail: orderList,
      isComplete: false,
    };
    setOrderDetailList({ ...orderDetailList, orderList: [] });
    setCurrentOrderList({ ...currentOrderList, selectedMenuList: [] });
    setOrderStatusList([newOrder, ...orderStatusList]);
    history.push('/order');
  };

  return (
    <OrderDetail
      orderId={orderId}
      totalPrice={totalPrice}
      totalCount={totalCount}
      list={orderList}
      onChecked={handleChangePackageState}
      onAllPackaging={handleAllPackaging}
      onReOrder={handleReOrder}
      onConfirmOrder={handleConfirmOrder}
    />
  );
}
