import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { MenuItem } from './MenuItem';

MenuList.propTypes = {
  menuList: PropTypes.array.isRequired,
};

export function MenuList({ menuList, onAdd }) {
  return (
    <MenuListWrapper>
      {menuList.map((menu) => {
        const { menuId, menuName, menuSize, menuPrice } = menu;
        return (
          <MenuItem
            key={menuId}
            menuName={menuName}
            menuSize={menuSize}
            menuPrice={menuPrice}
            onClick={() => onAdd(menu)}
          />
        );
      })}
    </MenuListWrapper>
  );
}

const MenuListWrapper = styled.ul`
  margin: 50px 0 0 0;
  padding: 0;
`;
