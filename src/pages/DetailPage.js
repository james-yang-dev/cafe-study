import styled from '@emotion/styled';
import React from 'react';
import { OrderDetail, OrderList } from '../features/detail';

export function DetailPage() {
  return (
    <DetailPageWrapper>
      <OrderDetail />
      <OrderList />
    </DetailPageWrapper>
  );
}

const DetailPageWrapper = styled.div``;
