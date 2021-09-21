import { atom, selector } from 'recoil';
import { KEY } from './key';
import { orderState } from './OrderState';

const initOrderListState = [
  {
    orderId: 1,
    orderCount: 10,
    orderPrice: 10200,
    orderDetail: [{}],
  },
];

export const orderListState = atom({
  key: KEY.ORDER_LIST,
  default: initOrderListState,
});

export const orderDetailListState = atom({
  key: KEY.ORDER_DETAIL_LIST_STATE,
  default: [],
});

// 자동으로 현재 상태를 확인해서 지정된 값을 리턴하는 함수, 여기서는 다음 오더 아이디를 가져온다
export const getNextOrderId = selector({
  key: KEY.NEXT_ORDER_ID,
  get: ({ get }) => {
    const orderList = get(orderListState);
    const orderIdList = orderList.map((order) => order.orderId);
    const maxOrderId = Math.max(...orderIdList);

    return maxOrderId ? maxOrderId + 1 : 1;
  },
});
