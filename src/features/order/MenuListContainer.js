import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  filterdMenuListState,
  menuListFilterState,
  MENU_INGR,
  MENU_SIZE,
  orderState,
} from '../../store';
import { MenuList } from './MenuList';
import { MenuSearch } from './MenuSearch';

export function MenuListContainer() {
  const [filterData, setFilterData] = useRecoilState(menuListFilterState);
  const storeMenuList = useRecoilValue(filterdMenuListState);
  const filterOptionList = [
    ...Object.values(MENU_SIZE),
    ...Object.values(MENU_INGR),
  ];

  const handleSubmit = (keywordValue) => {
    setFilterData({ ...filterData, keyword: keywordValue });
  };

  const handleToggleFilter = (filterOption) => {
    const hasOption = filterData.options.includes(filterOption);
    const filteredToggleOption = hasOption
      ? filterData.options.filter((option) => option !== filterOption)
      : [...filterData.options, filterOption];
    setFilterData({
      ...filterData,
      options: filteredToggleOption,
    });
  };

  const handleFilterReset = () => {
    setFilterData({ keyword: '', options: [] });
  };

  const [orderStateList, setOrderStateList] = useRecoilState(orderState);
  const handleAddOrderList = (menuData) => {
    const { selectedMenuList } = orderStateList;

    const hasSameMenuOrder = selectedMenuList.find((menu) => {
      return menu.menuId === menuData.menuId;
    });

    if (hasSameMenuOrder) {
      setOrderStateList({
        ...orderStateList,
        selectedMenuList: selectedMenuList.map((menu) => {
          if (menu.menuId === menuData.menuId) {
            return {
              ...menu,
              menuCount: menu.menuCount + 1,
            };
          } else {
            return { ...menu };
          }
        }),
      });
    } else {
      setOrderStateList({
        ...orderStateList,
        selectedMenuList: [
          ...orderStateList.selectedMenuList,
          { ...menuData, menuCount: 1 },
        ],
      });
    }
  };

  return (
    <div>
      <MenuSearch
        filterData={filterData}
        filterOptionList={filterOptionList}
        onSubmit={handleSubmit}
        onFilterReset={handleFilterReset}
        onToggle={handleToggleFilter}
      />
      <MenuList menuList={storeMenuList} onAdd={handleAddOrderList} />
    </div>
  );
}
