import React from 'react';
import { useRecoilState } from 'recoil';
import { OrderDetail } from '.';
import { orderDetailListState } from '../../store';

export function OrderDetailContainer() {
  const [orderDetailList, setOrderDetailList] =
    useRecoilState(orderDetailListState);

  // console.log(orders);
  const handleChangePackageState = (menuId) => {
    const newOrderDetailList = orderDetailList.map((menu) =>
      menu.menuId === menuId
        ? { ...menu, isPackaging: !menu.isPackaging }
        : menu
    );
    setOrderDetailList(newOrderDetailList);
  };

  return (
    <OrderDetail list={orderDetailList} onChecked={handleChangePackageState} />
  );
}
