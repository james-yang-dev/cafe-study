import { atom, selector } from 'recoil';
import { KEY } from './key';
import { uniqueString } from '../util/string';

// 메뉴 사이즈를 공유한다.
// 사이즈 선택필터링시 해당 메뉴만 공유한다
export const MENU_SIZE = {
  T: 'tall',
  G: 'grande',
  V: 'venti',
};

// 메뉴에 들어간 재료 목록을 의미한다.
// 실제 메뉴가 늘어날경우를 대비해서 구현해야 함. 이지선다 형태로 구현하지 말것
export const MENU_INGR = {
  ICE: 'ice',
  MILK: 'milk',
  CAFFEINE: 'caffeine',
};

const initMenuState = [
  {
    menuId: uniqueString(),
    menuName: '아메리카노',
    menuSize: MENU_SIZE.T,
    menuPrice: 3300,
    ingredients: [MENU_INGR.CAFFEINE],
  },
  {
    menuId: uniqueString(),
    menuName: '아메리카노',
    menuSize: MENU_SIZE.G,
    menuPrice: 4300,
    ingredients: [MENU_INGR.CAFFEINE],
  },
  {
    menuId: uniqueString(),
    menuName: '아메리카노',
    menuSize: MENU_SIZE.V,
    menuPrice: 5300,
    ingredients: [MENU_INGR.CAFFEINE],
  },
  {
    menuId: uniqueString(),
    menuName: '라떼',
    menuSize: MENU_SIZE.T,
    menuPrice: 4800,
    ingredients: [MENU_INGR.CAFFEINE, MENU_INGR.MILK],
  },
  {
    menuId: uniqueString(),
    menuName: '라떼',
    menuSize: MENU_SIZE.G,
    menuPrice: 6300,
    ingredients: [MENU_INGR.CAFFEINE, MENU_INGR.MILK],
  },
  {
    menuId: uniqueString(),
    menuName: '요거트',
    menuSize: MENU_SIZE.T,
    menuPrice: 4800,
    ingredients: [MENU_INGR.MILK],
  },
  {
    menuId: uniqueString(),
    menuName: '요거트',
    menuSize: MENU_SIZE.G,
    menuPrice: 6300,
    ingredients: [MENU_INGR.MILK],
  },
];

export const menuListState = atom({
  key: KEY.MENU_LIST,
  default: initMenuState,
});

export const menuListFilterState = atom({
  key: KEY.MENU_LIST_FILTER,
  default: { keyword: '', options: [] },
});

export const filterdMenuListState = selector({
  key: KEY.FILTERED_MENU_LIST,
  get: ({ get }) => {
    const menuList = get(menuListState);
    const filterState = get(menuListFilterState);
    const { keyword, options } = filterState;
    let filteredList = [...menuList];

    if (keyword.length > 0) {
      filteredList = filteredList.filter((menu) => {
        const keywordFilter =
          menu.menuName.includes(keyword) ||
          String(menu.menuPrice).includes(keyword);

        return keywordFilter;
      });
    }

    if (options.length > 0) {
      filteredList = filteredList.filter((menu) => {
        return Object.keys(menu).some(() => {
          const sizeFilter = options.some((opt) => menu['menuSize'] === opt);
          const ingrFilter = options.some((opt) =>
            menu['ingredients'].includes(opt)
          );
          return sizeFilter || ingrFilter;
        });
      });
    }

    return filteredList;
  },
});
