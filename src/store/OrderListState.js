import { atom, selector } from 'recoil';
import { KEY } from './key';

const initOrderListState = [];

export const orderListState = atom({
  key: KEY.ORDER_LIST,
  default: initOrderListState,
});

export const orderDetailListState = atom({
  key: KEY.ORDER_DETAIL_LIST_STATE,
  default: { orderId: '', orderList: [] },
});

// 자동으로 현재 상태를 확인해서 지정된 값을 리턴하는 함수, 여기서는 다음 오더 아이디를 가져온다
export const getNextOrderId = selector({
  key: KEY.NEXT_ORDER_ID,
  get: ({ get }) => {
    const orderList = get(orderListState);
    const orderIdList = orderList.map((order) => order.orderId);
    const maxOrderId = orderIdList.length > 0 ? Math.max(...orderIdList) : null;

    return maxOrderId ? maxOrderId + 1 : 1;
  },
});
