import styled from '@emotion/styled';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '../../components';
import { getNextOrderId, _OrderListState } from '../../store';
import { randomNumber } from '../../util/number';
import { OrderDetailItem } from './OrderDetailItem';

// TODO : 주문번호 INDEX + 1 (주문 상세로 이동하는 경우에는 유지)
// TODO : 주문 목록에서 삭제
// TODO : 주문 전체 수량, 가격 구하기
// TODO : 주문 LIST 정보
// TODO : 주문 내역 확인 경우 / 주문 상태인 경우에 따른 버튼, 항목 변경
// TODO : 전체 포장 (전체 선택)
// TODO : 다시 주문 하기 (주문 페이지로 이동, 이전 주문 데이터 불러오기)
// TODO : store : recoil
// TODO : styled
// TODO : 더미데이터 > API

// MEMO : '취소', 빼기, 포장, 다시 주문하기, 전체 포장 누르면 orderDetail 달라짐
// MEMO : '전체 포장' 누르면 OrderList 달라짐

export function OrderDetail() {
  const userOrderList = [
    {
      orderName: '아메리카노(Tall)',
      isIce: true,
      orderCount: 2,
      price: 4000,
      isTakeout: false,
    },
    {
      orderName: '라떼(Tall)',
      isIce: false,
      orderCount: 10,
      price: 20000,
      isTakeout: false,
    },
  ];

  const [orders, setOrders] = useRecoilState(_OrderListState);
  const nextOrderId = useRecoilValue(getNextOrderId);

  const handleRandomOrder = () => {
    const newOrder = {
      orderId: nextOrderId,
      orderCount: randomNumber(),
      orderPrice: randomNumber(1000, 20000),
      orderDetail: [{}],
    };

    setOrders((orders) => [...orders, newOrder]);
  };

  const handleCancel = () => {
    if (window.confirm('주문을 취소하시겠습니까?')) {
      console.log('취소 yes');
    } else {
      console.log('취소 no');
    }
  };

  const handleOrder = () => {
    console.log('주문');
  };

  const handleAllCheck = () => {
    console.log('전체 포장');
  };

  const handleReorder = () => {
    console.log('다시 주문 하기');
  };

  const handleConfirm = () => {
    console.log('주문 확인');
  };

  const orderId = 'A-37';
  const orderCount = 10;
  const orderTotal = 37200;

  const buttonText = '랜덤 주문 생성';

  return (
    <OrderDetailWrapper>
      <div>
        <strong>주문 정보</strong>
        {/*  dl은 주문번호 관련된 정보를 처리하기에 적합하지 않은것으로 보임 
          주문번호가 아래의 ul리스트와 연결되어 있기때문에 dl이 전체의 정보를 포함하지 않았다고 판단됨
        */}
        <dl>
          <dt>주문번호</dt>
          <dd>{orderId}</dd>
          <dt>전체 주문 수량</dt>
          <dd>{orderCount}</dd>
          <dt>주문 금액</dt>
          <dd>{orderTotal}원</dd>
        </dl>
        <strong>주문 LIST</strong>
        <ul>
          {/* `user_order_${index}` key를 이렇게 생성해도 index만 넣는것과 다를바 없음 */}
          {userOrderList.map((item, index) => (
            <OrderDetailItem key={index} item={item} />
          ))}
        </ul>
        <Button onClick={handleCancel} text="취소" />
        <Button onClick={handleOrder} text="주문" />
        <Button onClick={handleAllCheck} text="전체포장" />
        <Button onClick={handleReorder} text="다시주문하기" />
        <Button onClick={handleConfirm} text="주문확인" />
      </div>
      <Button onClick={handleRandomOrder} text={buttonText} />
    </OrderDetailWrapper>
  );
}

const OrderDetailWrapper = styled.div``;
