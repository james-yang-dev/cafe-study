import styled from '@emotion/styled'
import React from 'react'
import { OrderDetail, OrderList } from '../features/detail'
import {OrderInfo} from "../features/order";

export function DetailPage() {
  return (
    <DetailPageWrapper>
      <OrderInfo/>
      <OrderDetail />
      <OrderList />
    </DetailPageWrapper>
  )
}

const DetailPageWrapper = styled.div`
`