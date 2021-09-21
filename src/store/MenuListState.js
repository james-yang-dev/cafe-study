import { atom, selector } from 'recoil';
import { KEY } from './key';

const initMenuState = [
  {
    productCode: 'prd1',
    /**
     * price와 사이즈를 합친다면 size안에 별도의 속성으로 분리할 필요 없이
     * 합쳐진 형태로 진행하는편이 더 명확했을거라 판단됨
     * Object를 추추할 때 key, value 를 분리해서 추출이 가능하니 더 수월할듯.
     *
     * productPrice: {
     *  Tall: 3300,
     * }
     *
     * 개인적인 성향으로 오브젝트가 디비의 구조처럼 끝없이 하위 오브젝트로 설정되는것은 기피함
     * 2뎁스 이상의 오브젝트는 탐색이 아주 불편해서 lodash등 보조 라이브러리의 도움이 필요
     * -> flatten 같은 기능 등
     *
     */
    /**
     추가로 사이즈에 커피샷이 표시된다고 가정하면 오브젝트로 잡은 구조는 힘들어질 수 있다고 판단됨
     */
    productPrice: {
      size: {
        Tall: 3300,
        Grd: 4300,
      },
    },
    /**
    다른 메뉴의 속성과는 다르게 ice 여부만 true로 2가지 타입을 체크하는데,
    이것도 하나의 속성에서 ice, hot 여부를 배열이나 속성으로 가져가는게 낫지 않았나 싶음
    필터를 적용하는데 있어 이 부분만 적용방식이 다르다면,
    공통된 방식으로 적용할 수 없고, 유지보수 측면에서 불편함이 따를거로 예상됨
    isIce 하나의 속성으로 on/off가 되었다면 좋았지만, isOnlyIce의 추가로 복잡함이 증가됨

    추가로 현실고증을 위해 hot/ice가 추가된거면,
    대부분의 카페에서 hot/ice의 가격이 다른점도 반영해야 되는데 지금 구조에서는 힘들다고 판단됨.
     */
    isIce: true,
    isOnlyIce: false,
    productName: '아메리카노',
    /*
    재료의 경우 en, ko는 현재 전체를 구현하기에는 불필요했다고 보임
    만약 검색을 위해 영문으로 된 키가 필요했다면 재료 리스트를 별도로 구현하고
    각 메뉴에서 재료의 코드만 가져 쓰는 방식으로 구현하는편이 더 좋았을거라 판단됨
    매번 같은 재료의 형태가 각 메뉴별로 주입되는건 문제가 있을 수 있음. 데이터의 유효성 검증이 가장 힘들다고 판단

    export const INGR_LIST = {
      milk: {
        en: 'mlik',
        ko: '우유
      }
    }

    ingredientLabel: [INGR_KEY_LIST.milk]
    */
    ingredientLabel: {},
  },
  {
    productCode: 'prd2',
    productPrice: {
      size: {
        Tall: 5300,
        Grd: 6800,
      },
    },
    isIce: true,
    isOnlyIce: false,
    productName: '바닐라라떼',
    ingredientLabel: {
      milk: {
        en: 'milk',
        ko: '우유',
      },
    },
  },
  {
    productCode: 'prd3',
    productPrice: {
      size: {
        Venti: 5800,
      },
    },

    isIce: true,
    isOnlyIce: true,
    productName: '요거트',
    ingredientLabel: {
      milk: {
        en: 'milk',
        ko: '우유',
      },
      strawberry: {
        en: 'strawberry',
        ko: '딸기',
      },
    },
  },
];
const ENG_REGEX = /[a-zA-Z]/g;
const NUM_REGEX = /[0-9]/g;

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

/*
이 필터 구조에서는 tall과 ice의 동시 적용이 불가능 함
filter를 토글 형태로 눌러서 끄고 키는 기능의 적용 여부도 고려해야 할듯
*/
export const FilteredMenuListState = selector({
  key: KEY.FILTERED_MENU_LIST,
  get: ({ get }) => {
    const filter = get(MenuListFilterState);
    const list = get(MenuListState);
    switch (filter.type) {
      case 'size':
        return list.filter((value) => {
          const sizeKeys = Object.keys(value.productPrice.size);
          sizeKeys.includes(filter.value);
          return sizeKeys.includes(filter.value);
        });
      case 'isIce':
        return list.filter((value) => {
          return value.isIce;
        });
      case 'ingredientLabel':
        if (ENG_REGEX.test(filter.value)) {
          return list.filter((value) => {
            const valueUpperCase = filter.value.toUpperCase();
            const keyLabel = Object.keys(value.ingredientLabel).map((item) =>
              item.toUpperCase()
            );
            return keyLabel.includes(valueUpperCase);
          });
        } else {
          return list.filter((value) => {
            const keyInfo = Object.keys(value.ingredientLabel).map(
              (item) => value.ingredientLabel[item].ko
            );
            return keyInfo.includes(filter.value);
          });
        }
      case 'search':
        let searchResult = [];
        if (NUM_REGEX.test(filter.value)) {
          list.forEach((item, index) => {
            const size = item.productPrice.size;
            const sizeKeys = Object.keys(size);
            sizeKeys.forEach((sizeKey) => {
              if (size[sizeKey] === +filter.value)
                searchResult.push({
                  ...item,
                  productPrice: {
                    size: {
                      [sizeKey]: size[sizeKey],
                    },
                  },
                });
            });
          });
        } else {
          searchResult = list.filter(
            (item) => item.productName.indexOf(filter.value) > -1
          );
        }
        return searchResult;
      default:
        return list;
    }
  },
});
