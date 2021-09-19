import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button } from '../../components';
import { printLabel } from '../../util/string';
import { sumReducer } from '../../util/array';
import { useRecoilValue } from 'recoil';
import { getOrderSumPrice } from '../../store';

CurrentOrder.propTypes = {
  list: PropTypes.array.isRequired,
  onReset: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

export function CurrentOrder({ list = [], onReset, onDecrease }) {
  const totalPrice = useRecoilValue(getOrderSumPrice);
  const totalCount = list.map((menu) => menu.menuCount).reduce(sumReducer, 0);
  return (
    <div>
      <CurrentOrderHead>
        <div>주문번호: A-37</div>
        <div>전체: {totalCount}개</div>
        <div>{totalPrice} 원</div>
      </CurrentOrderHead>
      <CurrentOrderBody>
        <CurrentOrderList>
          <thead>
            <tr>
              <th>품목</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {list.map((order) => {
              const { menuName, menuSize, menuCount, menuId, menuPrice } =
                order;
              const menuSumPrice = menuCount * menuPrice;
              return (
                <tr key={menuId}>
                  <td>{printLabel(menuName, menuSize)}</td>
                  <td>{menuCount}</td>
                  <td>{menuSumPrice}</td>
                  <td>
                    <Button label='빼기' onClick={() => onDecrease(menuId)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </CurrentOrderList>
      </CurrentOrderBody>
      <CurrentOrderFoot>
        <Button label='취소' onClick={onReset} />
        <Button varient='confirm' label='주문' onClick={() => {}} />
      </CurrentOrderFoot>
    </div>
  );
}

const CurrentOrderHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;
const CurrentOrderBody = styled.div`
  overflow-y: auto;
  max-height: 400px;
`;
const CurrentOrderList = styled.table`
  width: 100%;
  margin-top: 10px;
  th,
  td {
    height: 40px;
    text-align: center;
  }
`;
const CurrentOrderFoot = styled.div`
  display: flex;
  margin-top: auto;
  justify-content: flex-end;

  > button + button {
    margin-left: 10px;
  }
`;
