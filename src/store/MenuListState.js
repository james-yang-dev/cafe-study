import { atom, selector } from "recoil";
import { KEY } from "./key";
import { uniqueString } from '../util/string'

const NUM_REGEX = /[0-9]/g;

// 메뉴 사이즈를 공유한다. 
// 사이즈 선택필터링시 해당 메뉴만 공유한다
export const MENU_SIZE = {
  T: 'tall',
  G: 'grande',
  V: 'venti'
}

// 메뉴에 들어간 재료 목록을 의미한다.
// 실제 메뉴가 늘어날경우를 대비해서 구현해야 함. 이지선다 형태로 구현하지 말것
export const MENU_INGR = {
  MILK: 'milk',
  CAFFEINE: 'caffeine'
}

const initMenuState = [
  {
    menuId: uniqueString(),
    menuName: '아메리카노 (HOT)',
    menuSize: MENU_SIZE.T,
    menuPrice: 3300,
    ingredients: [MENU_INGR.CAFFEINE]
  },
  {
    menuId: uniqueString(),
    menuName: '아메리카노 (HOT)',
    menuSize: MENU_SIZE.G,
    menuPrice: 4300,
    ingredients: [MENU_INGR.CAFFEINE]
  },
  {
    menuId: uniqueString(),
    menuName: '아메리카노 (HOT)',
    menuSize: MENU_SIZE.V,
    menuPrice: 5300,
    ingredients: [MENU_INGR.CAFFEINE]
  },
  {
    menuId: uniqueString(),
    menuName: '아메리카노 (ICE)',
    menuSize: MENU_SIZE.T,
    menuPrice: 3300,
    ingredients: [MENU_INGR.CAFFEINE]
  },
  {
    menuId: uniqueString(),
    menuName: '아메리카노 (ICE)',
    menuSize: MENU_SIZE.G,
    menuPrice: 4300,
    ingredients: [MENU_INGR.CAFFEINE]
  },
  {
    menuId: uniqueString(),
    menuName: '아메리카노 (ICE)',
    menuSize: MENU_SIZE.V,
    menuPrice: 5300,
    ingredients: [MENU_INGR.CAFFEINE]
  },
  {
    menuId: uniqueString(),
    menuName: '라떼 (HOT)',
    menuSize: MENU_SIZE.T,
    menuPrice: 4800,
    ingredients: [MENU_INGR.CAFFEINE, MENU_INGR.MILK]
  },
  {
    menuId: uniqueString(),
    menuName: '라떼 (HOT)',
    menuSize: MENU_SIZE.G,
    menuPrice: 6300,
    ingredients: [MENU_INGR.CAFFEINE, MENU_INGR.MILK]
  },
  {
    menuId: uniqueString(),
    menuName: '라떼 (ICE)',
    menuSize: MENU_SIZE.T,
    menuPrice: 4800,
    ingredients: [MENU_INGR.CAFFEINE, MENU_INGR.MILK]
  },
  {
    menuId: uniqueString(),
    menuName: '라떼 (ICE)',
    menuSize: MENU_SIZE.G,
    menuPrice: 6300,
    ingredients: [MENU_INGR.CAFFEINE, MENU_INGR.MILK]
  },
  {
    menuId: uniqueString(),
    menuName: '요거트 (ICE)',
    menuSize: MENU_SIZE.T,
    menuPrice: 4800,
    ingredients: [MENU_INGR.MILK]
  },
  {
    menuId: uniqueString(),
    menuName: '요거트 (ICE)',
    menuSize: MENU_SIZE.G,
    menuPrice: 6300,
    ingredients: [MENU_INGR.MILK]
  },
]

export const menuListState = atom({
  key: KEY.MENU_LIST,
  default: initMenuState
});

export const menuListFilterState = atom({
  key: KEY.MENU_FILTER_LIST,
  default: {
    type: 'all',
    value: '',
  },
});

export const filterTypeState = atom({
  key: 'filterTypeState',
  default: {
    menuSize: {
      isChecked: false,
      text: []
    },
    menuName: {
      isChecked: false,
      text: []
    },
    ingredients: {
      isChecked: false,
      text: []
    },
  }
});

export const filteredMenuListState = selector({
  key: KEY.FILTERED_MENU_LIST,
  get: ({ get }) => {
    const list = get(menuListState);
    const filter = get(menuListFilterState); // 검색
    const filterType = get(filterTypeState); // 필터

    if(filter.type === 'search') {
      if (NUM_REGEX.test(filter.value)) {
        return list.filter(
          (item) => item.menuPrice === +filter.value
        )
      } else {
        return list.filter(
          (item) => (item.menuName.toLowerCase().indexOf(filter.value.toLowerCase()) > -1) || item.menuSize.toLowerCase().indexOf(filter.value.toLowerCase()) > -1
        );
      }
    } else if(filter.type === 'all') {
      return list
    } else {
      const filterKey = Object.keys(filterType);
      const getItems = (list, item) => {
        let arr = [];
        list.forEach((value) => {
          if(item === 'ingredients') {
            const arr1 = filterType[item].text.map((item)=> item.toLowerCase());
            const arr2 = value[item].map((item) => item.toLowerCase());
            const compare = arr1.filter((compareItem) => arr2.includes(compareItem));
            if(compare.length>0){
              arr = [
                ...arr,
                value
              ]
            }
          } else {
            const arr1 = filterType[item].text.map((item)=> item.toLowerCase());
            const compare = arr1.filter((compareItem) => value[item].toLowerCase().includes(compareItem));
            if(compare.length>0) {
              arr = [
                ...arr,
                value
              ]
            }
          }
        });
        return [...new Set(arr)]
      }
      let res = [];
      filterKey.forEach((item) => {
        if(filterType[item].isChecked) {
          // TODO : bug fix , A 조건 이면서 B 조건, C 조건... 모두 충족하는 결과를 출력 하고 싶음.
          res = getItems(list, item);
        }
      });
      return res.length > 0 ? res : list;
    }
  },
});

