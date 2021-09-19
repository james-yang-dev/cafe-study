import { atom, selector } from 'recoil';
import { KEY } from './key';
import { sumReducer } from '../util/array';

const initOrderState = {
  selectedMenuList: [],
};

export const orderState = atom({
  key: KEY.ORDER,
  default: initOrderState,
});

// 자동으로 현재 상태를 확인해서 지정된 값을 리턴하는 함수,
// 여기서는 현재 모든 메뉴의 갯수와 가격을 곱한 총 금액을 계산한다.
export const getOrderSumPrice = selector({
  key: KEY.ORDER_SUM_PRICE,
  get: ({ get }) => {
    const order = get(orderState);
    const orderPriceList = order.selectedMenuList.map(
      (menu) => menu.menuPrice * menu.menuCount
    );
    const totalPrice = orderPriceList.reduce(sumReducer, 0);

    return totalPrice ? totalPrice : 0;
  },
});
