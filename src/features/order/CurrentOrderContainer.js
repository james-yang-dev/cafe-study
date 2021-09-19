import React from 'react';
import { useRecoilState } from 'recoil';
import { orderState } from '../../store';
import { CurrentOrder } from './CurrentOrder';

export function CurrentOrderContainer() {
  const [currentOrderList, setCurrentOrderList] = useRecoilState(orderState);
  const { selectedMenuList } = currentOrderList;

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
      list={selectedMenuList}
      onReset={handleResetOrderList}
      onDecrease={handleDecreaseOrder}
    />
  );
}
