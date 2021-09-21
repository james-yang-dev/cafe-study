import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

OrderHead.propTypes = {
  orderId: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export function OrderHead({ orderId, totalCount, totalPrice }) {
  return (
    <OrderHeadStyled>
      <div>{orderId}</div>
      <div>전체: {totalCount}개</div>
      <div>{totalPrice} 원</div>
    </OrderHeadStyled>
  );
}

const OrderHeadStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;
