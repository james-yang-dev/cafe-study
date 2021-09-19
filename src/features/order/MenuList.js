import React from 'react';
import styled from '@emotion/styled';
import { MenuListItem } from './MenuListItem';
import { MenuSearch } from './MenuSearch';

import { useFilterMenu } from './useFilterMenu';

// 메뉴 리스트 데이터는 최초에 로딩시에만 조회하니 페이지 단위에서 컨트롤 하는게 맞음.
// 이 페이지는 전달받은 메뉴리스트 데이터를 가공하고 필터링 하는데 그 목적이 있음
export function MenuList({ menuList }) {
  // 복잡한 필터링 로직은 커스텀 훅으로 별도 분리함
  const { filterOption, filteredMenuList, handleToggleKey, handleFilterQuery, handleChangeQuery } =
    useFilterMenu(menuList);

  return (
    <MenuListWrapper>
      <MenuSearch
        option={filterOption}
        onChangeKey={handleToggleKey}
        onChangeQuery={handleChangeQuery}
        onFilterQuery={handleFilterQuery}
      />
      <ul>
        {/* 반복되는 아이템은 별도의 컴포넌트로 분리함 */}
        {filteredMenuList.map((menu) => (
          <MenuListItem key={menu.menuId} menu={menu} />
        ))}
      </ul>
    </MenuListWrapper>
  );
}

const MenuListWrapper = styled.div``;
