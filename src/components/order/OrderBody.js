import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

OrderBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export function OrderBody({ children }) {
  return (
    <OrderBodyStyeld>
      <OrderTable>
        <thead>
          <tr>
            <th>품목</th>
            <th>수량</th>
            <th>금액</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </OrderTable>
    </OrderBodyStyeld>
  );
}

const OrderBodyStyeld = styled.div`
  overflow-y: auto;
  max-height: 400px;
`;
const OrderTable = styled.table`
  width: 100%;
  margin-top: 10px;
  th,
  td {
    height: 40px;
    text-align: center;
  }
`;
