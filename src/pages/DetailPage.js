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

const DetailPageWrapper = styled.div`
  display: flex;
  min-width: 1420px;
  > div {
    overflow-y: auto;
    width: 49%;
    min-width: 900px;
    height: 800px;
    padding: 1.5% 3%;
    box-sizing: border-box;
    background-color: #f1f1f1;
    border-radius: 10px;
  }
  > div + div {
    margin-left: 2%;
  }

  > div:first-of-type {
    display: flex;
    flex-direction: column;
  }
`;
