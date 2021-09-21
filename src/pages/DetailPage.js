import React from 'react';
import styled from '@emotion/styled';
import { OrderDetailContainer, OrderListContainer } from '../features/detail';

export function DetailPage() {
  return (
    <DetailPageWrapper>
      <OrderDetailContainer />
      <OrderListContainer />
    </DetailPageWrapper>
  );
}

const DetailPageWrapper = styled.div``;
