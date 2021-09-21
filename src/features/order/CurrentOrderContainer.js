import React from 'react';
import { useHistory } from 'react-router';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getNextOrderId, orderDetailListState, orderState } from '../../store';
import { CurrentOrder } from './CurrentOrder';

export function CurrentOrderContainer() {
  const history = useHistory();
  const orderId = String(useRecoilValue(getNextOrderId));
  const [currentOrderList, setCurrentOrderList] = useRecoilState(orderState);
  const { selectedMenuList } = currentOrderList;
  const setOrderDetailList = useSetRecoilState(orderDetailListState);

  const handleConfirmOrder = () => {
    const newOrderDetailList = selectedMenuList.map((menu) => ({
      ...menu,
      isPackaging: false,
    }));

    setOrderDetailList(newOrderDetailList);
    history.push('/detail');
  };

  const handleDecreaseOrder = (menuId) => {
    setCurrentOrderList({
      ...currentOrderList,
      selectedMenuList: selectedMenuList
        .map((menu) => {
          if (menu.menuId === menuId) {
            return {
              ...menu,
              menuCount: menu.menuCount - 1,
            };
          } else {
            return { ...menu };
          }
        })
        .filter((menu) => menu.menuCount > 0),
    });
  };

  const handleResetOrderList = () => {
    if (window.confirm('주문을 초기화 하시겠습니까?')) {
      setCurrentOrderList({ ...currentOrderList, selectedMenuList: [] });
    }
  };

  return (
    <CurrentOrder
      orderId={orderId}
      list={selectedMenuList}
      onReset={handleResetOrderList}
      onConfirm={handleConfirmOrder}
      onDecrease={handleDecreaseOrder}
    />
  );
}
