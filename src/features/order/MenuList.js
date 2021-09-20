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
  const handleOptionChange = (itemName) => e => {
    if(e.target.checked) {
      setOptionValue(itemName);
    }
  }
  const handleOrder = (orderInfo) => (e) => {
    // 주문
  }
  const [optionValue, setOptionValue] = useState('');

  return (
    <MenuListWrapper>
      {/* 
      리스트를 처리하는 방식을 본인 스타일로 구현
      어떻게 바꿔도 상관 없음
      리코일 사용법을 위해 간단한 예시를 둠
      분할이 필요하면 분할 할 것
       */}
      <strong>MENU LIST</strong>
      <ul>
        {
          menuList.map((item, index) => {
            const {productCode: code, productPrice: price, productName: name, isOnlyIce } = item;
            const size = price.size;
            const sizeKeys = Object.keys(size);
            return sizeKeys.map((sizeKey) => {
              const PREFIX_OPTION = `${code}_${index}_${sizeKey}`;
              return (
                <li key={`proud_${index}_${sizeKey}`}>
                  <strong>{name} ({sizeKey})</strong>
                  {
                    !isOnlyIce && (
                      <label htmlFor={`${PREFIX_OPTION}_false`}>
                        <input type="radio" id={`${PREFIX_OPTION}_false`} name="isIce" value="false" checked={`${PREFIX_OPTION}_false` === optionValue} onChange={handleOptionChange(`${PREFIX_OPTION}_false`)}/> HOT
                      </label>
                    )
                  }
                  <label htmlFor={`${PREFIX_OPTION}_true`}>
                    <input type="radio" id={`${PREFIX_OPTION}_true`} name="isIce" value="true" checked={`${PREFIX_OPTION}_true` === optionValue} onChange={handleOptionChange(`${PREFIX_OPTION}_true`)}/>ICE
                  </label>
                  <strong>{size[sizeKey]}</strong>
                  <Button onClick={handleOrder(PREFIX_OPTION)} text="주문" />
                </li>
              );
            })
          })
        }
      </ul>
    </MenuListWrapper>
  );
}

const MenuListWrapper = styled.div`
`