import styled from '@emotion/styled';
import { FilterList, MenuList } from '../features/order';
import { OrderDetail } from "../features/detail";

export function OrderPage() {
  // 주문 페이지를 여기서 작업하세요
  /**
   * Todos
   * 진입시 최신 주문번호 + 1 한내용 불러오기
   * 메뉴 목록 불러오기
   */
  return (
    <OrderPageWrapper>
      <FilterList/>
      <MenuList />
      <OrderDetail />
    </OrderPageWrapper>
  );
};

const OrderPageWrapper = styled.div`
`;