import { useMemo, useState } from 'react';
import { MENU_INGR, MENU_SIZE } from '../../store';
const initFilterMenu = {
  query: '',
  tempQuery: '',
  key: [],
};

export function useFilterMenu(menuList = []) {
  // useState를 아래에서 별도로 사용하지 않기 위해서 tempQuery를 추가함.
  // input에는 tempQeury를 기준으로 검색하고, 엔터나 클릭시 query에 값을 옮겨서 필터링 되게 처리함
  const [filterOption, setFilterOption] = useState(initFilterMenu);

  const sizeToggleList = [...Object.values(MENU_SIZE)];
  const ingToggleList = [...Object.values(MENU_INGR)];

  const filteredMenuList = useMemo(() => {
    // query를 사용하는지 확인
    const useQuery = filterOption.query.length > 0;
    // key를 사용하는지 확인
    const useSizeKey = filterOption.key.some((filterKey) =>
      sizeToggleList.some((size) => size === filterKey),
    );
    const useIngKey = filterOption.key.some((filterKey) =>
      ingToggleList.some((ing) => ing === filterKey),
    );

    return menuList.filter((menu) => {
      // query를 사용하면서 이름이나 가격이 일치하는경우 체크, 순수 숫자일때만 가격을 체크한다
      const hasQuery =
        useQuery &&
        (menu.menuName.indexOf(filterOption.query) > -1 ||
          Number(menu.menuPrice) <= Number(filterOption.query));

      // key를 사용하면서 ingredients가 포함되는지를 확인
      const hasSizeKey =
        useSizeKey && filterOption.key.some((filterKey) => menu.menuSize === filterKey);

      const hasIngKey =
        useIngKey &&
        filterOption.key.some((filterKey) => menu.ingredients.some((ing) => filterKey === ing));

      // 쿼리의 체크를 통과했는지 확인. 쿼리를 안쓰면 그냥 패스, 쿼리를 쓰면 포함됐을때 패스
      // 키의 체크도 마찬가지로 확인
      const passQuery = !useQuery || hasQuery;
      const passSizeKey = !useSizeKey || hasSizeKey;
      const passIngKey = !useIngKey || hasIngKey;

      // 최종적으로 쿼리와 키를 통과 했는지 확인한다. 통과했으면 필터에 값을 남김
      return passQuery && passSizeKey && passIngKey;
    });
  });

  // key는 별도로 토글형태로 관리되고 여러개의 키가 입력되면 다 필터링 되어야 함
  const handleToggleKey = (newKey) => {
    const prevKeys = filterOption.key;
    const hasKey = prevKeys.some((key) => key === newKey);
    const checkedKey = hasKey ? prevKeys.filter((key) => key !== newKey) : [...prevKeys, newKey];
    setFilterOption((option) => {
      return { ...option, key: checkedKey };
    });
  };

  const handleFilterQuery = () => {
    setFilterOption((option) => {
      return { ...option, query: option.tempQuery };
    });
  };

  // query는 변경된 키만 적용해서 필터링 함
  const handleChangeQuery = (tempQuery) => {
    setFilterOption((option) => {
      return { ...option, tempQuery };
    });
  };

  const resetQuery = () => {
    setFilterOption((option) => {
      return { ...option, query: '', tempQuery: '' };
    });
  };

  const resetKey = () => {
    setFilterOption((option) => {
      return { ...option, key: [] };
    });
  };

  return {
    filterOption,
    filteredMenuList,
    handleToggleKey,
    handleFilterQuery,
    handleChangeQuery,
    resetQuery,
    resetKey,
  };
}
