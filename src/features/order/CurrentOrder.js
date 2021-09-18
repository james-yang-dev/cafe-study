import React from 'react';
import styled from '@emotion/styled';
import { Button } from '../../components';

export function CurrentOrder() {
  return (
    <div>
      <CurrentOrderHead>
        <div>주문번호: A-37</div>
        <div>전체: 10개</div>
        <div>주문번호: 37,200 원</div>
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
            <tr>
              <td>아메리카노 (T)</td>
              <td>2</td>
              <td>6.600</td>
              <td>
                <Button label='빼기' onClick={() => {}} />
              </td>
            </tr>
            <tr>
              <td>아메리카노 (T)</td>
              <td>2</td>
              <td>6.600</td>
              <td>
                <Button label='빼기' onClick={() => {}} />
              </td>
            </tr>
            <tr>
              <td>아메리카노 (T)</td>
              <td>2</td>
              <td>6.600</td>
              <td>
                <Button label='빼기' onClick={() => {}} />
              </td>
            </tr>
            <tr>
              <td>아메리카노 (T)</td>
              <td>2</td>
              <td>6.600</td>
              <td>
                <Button label='빼기' onClick={() => {}} />
              </td>
            </tr>
            <tr>
              <td>아메리카노 (T)</td>
              <td>2</td>
              <td>6.600</td>
              <td>
                <Button label='빼기' onClick={() => {}} />
              </td>
            </tr>
            <tr>
              <td>아메리카노 (T)</td>
              <td>2</td>
              <td>6.600</td>
              <td>
                <Button label='빼기' onClick={() => {}} />
              </td>
            </tr>
            <tr>
              <td>아메리카노 (T)</td>
              <td>2</td>
              <td>6.600</td>
              <td>
                <Button label='빼기' onClick={() => {}} />
              </td>
            </tr>
          </tbody>
        </CurrentOrderList>
      </CurrentOrderBody>
      <CurrentOrderFoot>
        <Button label='취소' onClick={() => {}} />
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
