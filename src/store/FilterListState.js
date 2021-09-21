import { atom } from 'recoil';
import { KEY } from './key';

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
    type: 'isIce',
  },
  {
    id: 'filterId4',
    text: 'Milk',
    type: 'ingredientLabel',
  },
  {
    id: 'filterId5',
    text: '딸기',
    type: 'ingredientLabel',
  },
  {
    id: 'filterId6',
    text: 'Venti',
    type: 'size',
  },
];

export const FilterListState = atom({
  key: KEY.FILTER_LIST,
  default: initFilterState,
});
