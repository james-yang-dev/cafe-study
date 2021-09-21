import styled from '@emotion/styled';
import { Button } from '../../components';

export function OrderDetailItem({ item }) {
  const name = item.orderName;
  const isIce = item.isIce;
  const price = item.price;
  const count = item.orderCount;
  const isTakeout = item.isTakeout;

  // delete 하는건 이쪽에서만 처리되기 때문에 detail에서 꼭 셋업하지 않아도 상관 없음
  // 해당되는 recoil status를 호출해서 처리
  const handleDeleteItem = () => {
    console.log('do delete order detail item in here');
  };

  return (
    <DetailItemWrapper>
      <span>{name}</span>
      <span>{isIce ? 'ICE' : 'HOT'}</span>
      <span>{count}</span>
      <span>{price}</span>
      <Button onClick={handleDeleteItem} text="빼기" />
      <span>{isTakeout}</span>
    </DetailItemWrapper>
  );
}

const DetailItemWrapper = styled.li``;
