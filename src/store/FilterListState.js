import { atom } from "recoil";
import { KEY } from "./key";

const initFilterState = [
  {
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

export const FilterListState = atom(
  {
    key: KEY.FILTER_LIST,
    default: initFilterState,
  }
)