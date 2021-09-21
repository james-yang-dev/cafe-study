import { useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { FilteredMenuListState } from '../../store';
import { Button } from '../../components';

// TODO : 메뉴 HOT, ICE 선택 - Input Change
// TODO : 주문 추가 - 없으면 메뉴에 추가, 있으면 해당 항목 item + 1
// TODO : store : recoil
// TODO : styled

// MEMO : 검색, 필터, 초기화 할 때마다 메뉴 목록이 달라짐 (완전 고정 아님)
// MEMO : '주문' 버튼 누르면 OrderDetail 정보가 달라짐
// MEMO : 주문 정보 => store에 존재 해야함, 취소 버튼을 누르기 전까지 주문 정보 유지

export function MenuList() {
  const menuList = useRecoilValue(FilteredMenuListState);
  const handleOptionChange = (itemName) => (e) => {
    if (e.target.checked) {
      setOptionValue(itemName);
    }
  };
  const handleOrder = (orderInfo) => (e) => {
    // 주문
  };
  const [optionValue, setOptionValue] = useState('');

  return (
    <MenuListWrapper>
      <strong>MENU LIST</strong>
      <ul>
        {menuList.map((item, index) => {
          const {
            productCode: code,
            productPrice: price,
            productName: name,
            isOnlyIce,
          } = item;
          const size = price.size;
          const sizeKeys = Object.keys(size);
          return sizeKeys.map((sizeKey) => {
            const PREFIX_OPTION = `${code}_${index}_${sizeKey}`;
            return (
              <li key={`proud_${index}_${sizeKey}`}>
                <strong>
                  {name} ({sizeKey})
                </strong>
                {/* 
                  UI관점에서 HOT과 ICE는 별도의 메뉴로 보이는게 접근성이 편한다고 판단됨.
                  
                  */}
                {!isOnlyIce && (
                  <label htmlFor={`${PREFIX_OPTION}_false`}>
                    <input
                      type="radio"
                      id={`${PREFIX_OPTION}_false`}
                      name="isIce"
                      value="false"
                      checked={`${PREFIX_OPTION}_false` === optionValue}
                      onChange={handleOptionChange(`${PREFIX_OPTION}_false`)}
                    />{' '}
                    HOT
                  </label>
                )}
                <label htmlFor={`${PREFIX_OPTION}_true`}>
                  <input
                    type="radio"
                    id={`${PREFIX_OPTION}_true`}
                    name="isIce"
                    value="true"
                    checked={`${PREFIX_OPTION}_true` === optionValue}
                    onChange={handleOptionChange(`${PREFIX_OPTION}_true`)}
                  />
                  ICE
                </label>
                <strong>{size[sizeKey]}</strong>
                {/* 
                  실제 주문되는 순간에 전달되는 정보는 여러개의 조합으로
                  하나의 문자를 보내고, 문자의 특수한 기호를 기준으로 다시 나눠서 사용하는 방식은 권장되지 않음.
                  데이터를 합치고 나누는 순간에 잘못될 가능성이 높아 각자의 변수로 전달하는 방식이 권장됨

                  ex -> _중간에 값이 없어서 순서가 뒤바뀌는 경우 문제가 생김
                
                  */}
                <Button onClick={handleOrder(PREFIX_OPTION)} text="주문" />
              </li>
            );
          });
        })}
      </ul>
    </MenuListWrapper>
  );
}

const MenuListWrapper = styled.div``;
