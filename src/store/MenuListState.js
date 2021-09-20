import { atom } from "recoil";
import { KEY } from "./key";

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
          'Venti': 5800,
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

const initMenuState = productList.items;

export const MenuListState = atom({
  key: KEY.MENU_LIST,
  default: initMenuState,
})
