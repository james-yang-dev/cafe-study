import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Button } from '../../components/button/Button';
import { printLabel } from '../../util/string';

MenuItem.propTypes = {
  menuName: PropTypes.string.isRequired,
  menuSize: PropTypes.string.isRequired,
  menuPrice: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export function MenuItem({ menuName, menuSize, menuPrice, onClick }) {
  return (
    <MenuItemStyled>
      <Button
        label={printLabel(menuName, menuSize)}
        customStyle={menuItemButton}
        onClick={onClick}
      />
      <PriceBox>{menuPrice}</PriceBox>
    </MenuItemStyled>
  );
}

// style

const MenuItemStyled = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & + & {
    margin-top: 10px;
  }
`;

const menuItemButton = css`
  width: 80%;
  height: 40px;
  background-color: seagreen;
  color: #fff;
`;

const PriceBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18%;
  margin-left: 2%;
`;
