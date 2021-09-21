import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

OrderFoot.propTypes = {
  children: PropTypes.node.isRequired,
};

export function OrderFoot({ children }) {
  return <OrderFootStyeld>{children}</OrderFootStyeld>;
}

const OrderFootStyeld = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: flex-end;

  > button + button {
    margin-left: 10px;
  }
`;
