import styled from '@emotion/styled';
import React from 'react'
import { useRecoilValue } from 'recoil';
import { menuListState } from '../../store';
import {Button} from "../../components";

// TODO : 메뉴 HOT, ICE 선택 - Input Change
// TODO : 주문 추가 - 없으면 메뉴에 추가, 있으면 해당 항목 item + 1
// TODO : Filter (메뉴명, 메뉴 태그)
// TODO : 검색 (메뉴명, 금액) - Input Change
// TODO : store : recoil
// TODO : styled
// TODO : 더미데이터 > API

// MEMO : 주문 정보 => store에 존재 해야함, 취소 버튼을 누르기 전까지 주문 정보 유지

export function MenuList() {
  const productList = {
    'items': [
      {
        'productCode' : 'prd1',
        'productPrice' : {
          'size': {
            'Tall': 3300,
            'Grd': 4300,
          }
        },
        'productName' : '아메리카노',
        'productTag': [],
      },
      {
        'productCode' : 'prd2',
        'productPrice' : {
          'size': {
            'Tall': 5300,
            'Grd': 6800,
          }
        },
        'productName' : '바닐라라떼',
        'productTag': ['Milk','우유'],
      },
      {
        'productCode' : 'prd3',
        'productPrice' : {
          'size': {
            'Tall': 4800,
            'Grd': 6200
          }
        },
        'productName' : '요거트',
        'productTag': ['Milk','우유']
      },
    ],
  };

  const filterConditionList = ['Tall', 'Grd', 'ICE', 'Milk'];

  const handleSearch = () => {
    console.log('검색');
  };

  const handleFilter = (e) => (item) => {
    console.log('필터');
    console.log(e);
    console.log(item);
  };

  const menuList = useRecoilValue(menuListState);
  return (
    <MenuListWrapper>
      {/* 
      리스트를 처리하는 방식을 본인 스타일로 구현
      어떻게 바꿔도 상관 없음
      리코일 사용법을 위해 간단한 예시를 둠
      분할이 필요하면 분할 할 것
       */}
      <strong>메뉴 검색</strong>
      <input type="text" id="searchKeyword" title="검색" />
      <Button onClick={handleSearch} text="검색"/>
      <strong>필터 LIST</strong>
      <ul>
        {
          filterConditionList.map((item, index) => {
            return (
              <li key={`item_${index}`}>
                <Button onClick={handleFilter(item)} text={item} />
              </li>
            )
          })
        }
      </ul>
      <strong>MENU LIST</strong>
      <ul>
        {
          productList.items.map((item, index) => {
            const size = item.productPrice.size;
            const name = item.productName;
            const sizeKeys = Object.keys(size);
            return sizeKeys.map((sizeKey) => {
              return (
                <li key={`proud_${index}_${sizeKey}`}>
                  <strong>{name} ({sizeKey})</strong>
                  <label>
                    <input type="radio" name="isIce" value="false"/>HOT
                    <input type="radio" name="isIce" value="true"/>ICE
                  </label>
                  <strong>{size[sizeKey]}</strong>
                </li>
              )
            })
          })
        }
      </ul>

      {/*{menuList.map(menu => {*/}
      {/*  const { menuId, menuName, menuSize, menuPrice } = menu*/}
      {/*  return (*/}
      {/*    <div key={menuId}>*/}
      {/*      {menuName} /*/}
      {/*      {menuSize} /*/}
      {/*      {menuPrice}*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*})}*/}
    </MenuListWrapper>
  )
}

const MenuListWrapper = styled.div`
`