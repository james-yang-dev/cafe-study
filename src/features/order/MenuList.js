import styled from '@emotion/styled';
import React, { useMemo } from 'react'
import { useState } from 'react/cjs/react.development';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button } from '../../components';
import { menuListState, MENU_INGR, MENU_SIZE, orderState } from '../../store';
import { MenuSearch } from './MenuSearch';


function hasFilterKeyByMeneCondition(menuCondition, filterOptionKeys) {
  return Object.values(menuCondition).some( condition => filterOptionKeys.some(opt => opt === condition))
}

export function MenuList() {
  const [ order, setOrder ]= useRecoilState(orderState)
  const menuList = useRecoilValue(menuListState);
  const keyList = [...Object.values(MENU_SIZE), ...Object.values(MENU_INGR)] 
  const [filterOption, setFilterOption] = useState({
    query: "",
    key: []
  })
  const onChange = (key) => (value) => {
    setFilterOption((option) => {
      option[key] = value
      return {...option}
    })
  }
  

  const filteredMenuList = useMemo(()=> {
    let tmp = menuList.slice()
    if(filterOption.query.length > 0){
      tmp = tmp.filter(menu => menu.menuName.indexOf(filterOption.query) > -1 || menu.menuPrice.toString().indexOf(filterOption.query.replace(/,/,'')) > -1)
    }
    if(hasFilterKeyByMeneCondition(MENU_SIZE, filterOption.key)){
      tmp = tmp.filter(menu => filterOption.key.some(opt => {
        return opt === menu.menuSize
      }))
    }
    if(hasFilterKeyByMeneCondition(MENU_INGR, filterOption.key)){
      tmp = tmp.filter(menu => filterOption.key.some(
        key => menu.ingredients.some((ingredient)=> ingredient === key)
      ))
    }
    return tmp
  }, [menuList, filterOption])

  const onClickOrderMenuWithId = (menu) => () => {
    setOrder((state)=>{
      let index = state.selectedMenuList.findIndex(selected => selected.menuId === menu.menuId)
      if(index > -1) {
        return {
          ...state,
          selectedMenuList: state.selectedMenuList.map((selected, currIndex) => {
            if(currIndex === index) {
              let menuCount = selected.menuCount + 1
              let menuPrice = menu.menuPrice * menuCount
              return {
                ...selected,
                menuCount,
                menuPrice
              }
            }
            return {...selected}
          })
        }
      }
      return  {
          ...state, 
          selectedMenuList: [...state.selectedMenuList, {
              menuId: menu.menuId,
              menuName: menu.menuName,
              menuPrice: menu.menuPrice,
              menuCount: 1
          }]
        }
    })
  }

  return (
    <MenuListWrapper>
      <MenuSearch 
        keyList={keyList} 
        option={filterOption}
        onChangeKey={onChange("key")} 
        onChangeQuery={onChange("query")}
      />
      {/* 
      리스트를 처리하는 방식을 본인 스타일로 구현
      어떻게 바꿔도 상관 없음
      리코일 사용법을 위해 간단한 예시를 둠
      분할이 필요하면 분할 할 것
       */}
      <ul>
      {filteredMenuList.map(menu => {
        const { menuId, menuName, menuSize, menuPrice } = menu
        return (
          <li key={menuId}>
            <Button text={menuName} onClick={onClickOrderMenuWithId(menu)}></Button> / <MenuText>{menuSize}</MenuText> / <MenuText>{menuPrice}</MenuText>
          </li>
        )
      })}
      </ul>
    </MenuListWrapper>
  )
}

const MenuListWrapper = styled.div`
`
const MenuText = styled.span`
  display: inline-block;
  vertical-align: top;
`