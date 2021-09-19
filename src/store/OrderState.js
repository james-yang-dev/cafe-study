import { atom, selector } from 'recoil';
import { KEY } from './key';
import { sumReducer } from '../util/array';

// 현재 오더내용은 주문번호는 별도로 관리하는것이 맞음
// 데이터구조상 현재 오더에 주문번호가 포함되면 관리의 불편함이 생김.
// 주문 화면에서 현재 주문번호와 주문내역을 별도로 가지고 있다, 주문시에 합쳐서 주문 리스트로 보내는것이 맞다고 판단됨
const initOrderState = [];

export const orderState = atom({
  key: KEY.ORDER,
  default: initOrderState,
});

// 자동으로 현재 상태를 확인해서 지정된 값을 리턴하는 함수,
// 여기서는 현재 모든 메뉴의 갯수와 가격을 곱한 총 금액을 계산한다.
export const getOrderSumData = selector({
  key: KEY.ORDER_SUM_PRICE,
  get: ({ get }) => {
    const order = get(orderState);
    const orderPriceList = order.map((menu) => menu.menuPrice * menu.menuCount);
    const orderCountList = order.map((menu) => menu.menuCount);

    const result = {
      totalCount: orderCountList.reduce(sumReducer, 0),
      totalPrice: orderPriceList.reduce(sumReducer, 0),
    };

    return result;
  },
});

// order Status 를 가져온다.
export const getOrderStatus = selector({
  key: KEY.ORDER_STATUS,
  get: ({ get }) => {
    const order = get(orderState);
    return order;
  },
});

// 메뉴 카운트에 관여하는 selector 메뉴 갯수를 변경시킬때는 이 셀렉터를 통해서 변경한다
export const setOrderMenuCount = selector({
  key: KEY.SET_ORDER_MENU,
  get: ({ get }) => {
    get(orderState);
  },
  set: ({ set }, { menuId, count }) =>
    set(orderState, (prevState) =>
      prevState
        .map((menu) =>
          menu.menuId === menuId ? { ...menu, menuCount: menu.menuCount + count } : menu,
        )
        .filter((menu) => menu.menuCount > 0),
    ),
});
