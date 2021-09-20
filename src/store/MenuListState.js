import {atom, selector} from "recoil";
import { KEY } from "./key";

const initMenuState = [
  {
    'productCode' : 'prd1',
    'productPrice' : {
      'size': {
        'Tall': 3300,
        'Grd': 4300,
      }
    },
    isIce: true,
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
    isIce: true,
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
        'Venti': 5800,
      }
    },
    isIce: true,
    isOnlyIce: true,
    'productName' : '요거트',
    'ingredientLabel': {
      'milk': {
        en: 'milk',
        ko: '우유'
      },
      'strawberry': {
        en: 'strawberry',
        ko: '딸기'
      }
    }
  },
];
export const MenuListState = atom({
  key: KEY.MENU_LIST,
  default: initMenuState,
});

export const MenuListFilterState = atom({
  key: KEY.MENU_FILTER_LIST,
  default: {
    type: 'all',
    value: '',
  },
});

export const FilteredMenuListState = selector({
  key: KEY.FILTERED_MENU_LIST,
  get: ({ get }) => {
    const filter = get(MenuListFilterState);
    const list = get(MenuListState);
    switch (filter.type) {
      case 'size' :
        return list.filter((value) => {
          const sizeKeys = Object.keys(value.productPrice.size);
          sizeKeys.includes(filter.value)
          return sizeKeys.includes(filter.value);
        });
      case 'isIce' :
        return list.filter((value) => {
          return value.isIce;
        });
      case 'ingredientLabel' :
        const ENG_REGEX =/[a-zA-Z]/g;
        if(ENG_REGEX.test(filter.value)) {
          return list.filter((value) => {
            const valueUpperCase = filter.value.toUpperCase();
            const keyLabel = Object.keys(value.ingredientLabel).map((item) => item.toUpperCase());
            return keyLabel.includes(valueUpperCase);
          });
        } else {
          return list.filter((value) => {
            const keyInfo = Object.keys(value.ingredientLabel).map((item) => value.ingredientLabel[item].ko);
            return keyInfo.includes(filter.value);
          });
        }
      case 'search':
        const numRegex = /[0-9]/g;
        let searchResult = [];
        if(numRegex.test(filter.value)) {
          list.forEach((item, index) => {
            const size = item.productPrice.size;
            const sizeKeys = Object.keys(size);
            sizeKeys.forEach((sizeKey) => {
              if(size[sizeKey] === +filter.value) searchResult.push({
                ...item,
                productPrice: {
                  size: {
                    [sizeKey]: size[sizeKey]
                  }
                }
              });
            });
          });
        } else {
          searchResult = list.filter((item) => item.productName.indexOf(filter.value) > -1);
        }
        return searchResult;
      default :
        return list;
    }
  }
});

// 우선 둬보자..
export const MenuListStatusState = selector({
  key: KEY.MENU_LIST_STATUS,
  get: ({ get }) => {
    const menuList = get(FilteredMenuListState);
    const totalMenuList = menuList.length;
  }
});