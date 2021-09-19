import styled from '@emotion/styled';
import React, {useState} from 'react'
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
        isOnlyIce: false,
        'productName' : '아메리카노',
        'ingredientLabel': {},
      },
      {
        'productCode' : 'prd2',
        'productPrice' : {
          'size': {
            'Tall': 5300,
            'Grd': 6800,
          }
        },
        isOnlyIce: false,
        'productName' : '바닐라라떼',
        'ingredientLabel': {
          'milk': {
            en: 'milk',
            ko: '우유'
          }
        }
      },
      {
        'productCode' : 'prd3',
        'productPrice' : {
          'size': {
            'Tall': 4800,
            'Grd': 6200
          }
        },
        isOnlyIce: true,
        'productName' : '요거트',
        'ingredientLabel': {
          'milk': {
            en: 'milk',
            ko: '우유'
          },
          'apple': {
            en: 'apple',
            ko: '사과'
          }
        }
      },
    ],
  };

  const filterConditionList = [{
    id: 'filterId1',
    text: 'Tall',
    type: 'size',
  },
  {
    id: 'filterId2',
    text: 'Grd',
    type: 'size',
  },
  {
    id: 'filterId3',
    text: 'ICE',
    type: 'isOnlyIce',
  },
  {
    id: 'filterId4',
    text: 'Milk',
    type: 'ingredientLabel',
  },
  {
    id: 'filterId5',
    text: '우유',
    type: 'ingredientLabel',
  }
  ];



  const numRegex = /[0-9]/g;
  const handleSearch = () => {
    let searchResult = [];
    if(numRegex.test(searchValue)) {
      productList.items.forEach((item, index) => {
        const size = item.productPrice.size;
        const sizeKeys = Object.keys(size);
        sizeKeys.forEach((sizeKey) => {
          if(size[sizeKey] === +searchValue) searchResult.push(item);
        });
      });
    } else {
      searchResult = productList.items.filter((item) => item.productName.indexOf(searchValue) > -1);
    }
  };

  const handleFilter = (type, filterValue) => (e) => {
    const ENG_REGEX =/[a-zA-Z]/g;

    let filterResult = [];
    filterResult = productList.items.filter((value) => {
      switch (type) {
        case 'size' :
          const sizeKeys = Object.keys(value.productPrice.size);
          sizeKeys.includes(filterValue)
          return sizeKeys.includes(filterValue);
        case 'isOnlyIce' :
          return value.isOnlyIce;
        case 'ingredientLabel' :
          if(ENG_REGEX.test(filterValue)) {
            const valueUpperCase = filterValue.toUpperCase();
            const keyLabel = Object.keys(value.ingredientLabel).map((item) => item.toUpperCase());
            return keyLabel.includes(valueUpperCase);
          } else {
            const keyInfo = Object.keys(value.ingredientLabel).map((item) => value.ingredientLabel[item].ko);
            return keyInfo.includes(filterValue);
          }
      }
    });
    console.log(filterResult);
  };

  const handleOptionChange = (itemName) => e => {
    if(e.target.checked){
      setOptionValue(itemName);
      // 주문 진행
    }
  }

  const menuList = useRecoilValue(menuListState);
  const [searchValue, setSearchValue] = useState('');
  const [optionValue, setOptionValue] = useState('');
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }
  return (
    <MenuListWrapper>
      {/* 
      리스트를 처리하는 방식을 본인 스타일로 구현
      어떻게 바꿔도 상관 없음
      리코일 사용법을 위해 간단한 예시를 둠
      분할이 필요하면 분할 할 것
       */}
      <strong>메뉴 검색</strong>
      <input type="text" id="searchKeyword" title="검색" value={searchValue} onChange={handleSearchChange}/>
      <Button onClick={handleSearch} text="검색"/>
      <strong>필터 LIST</strong>
      <ul>
        {
          filterConditionList.map((item, index) => {
            return (
              <li key={`item_${item.id}`}>
                <Button onClick={handleFilter(item.type, item.text)} text={item.text} />
              </li>
            )
          })
        }
      </ul>
      <strong>MENU LIST</strong>
      <ul>
        {
          productList.items.map((item, index) => {
            const code = item.productCode;
            const size = item.productPrice.size;
            const name = item.productName;
            const isOnlyIce = item.isOnlyIce;
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