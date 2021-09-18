import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Input, Button } from '../../components';
import { ToggleButton } from '../../components/button/ToggleButton';

MenuSearch.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export function MenuSearch({ searchValue, onChange, onSearch, onSearchReset }) {
  return (
    <MenuSearchStyled>
      <MenuRow>
        <form onSubmit={onSearch}>
          <Input
            value={searchValue}
            onChange={onChange}
            customStyle={inputTextStyle}
          />
          <Button
            type='submit'
            varient='confirm'
            label='검색'
            customStyle={confirmButtonStyle}
          />
        </form>
      </MenuRow>
      <MenuRow>
        <ToggleButton label='Tall' onClick={() => {}} />
        <ToggleButton label='Grd' onClick={() => {}} />
        <ToggleButton label='Ice' onClick={() => {}} />
        <ToggleButton label='Milk' onClick={() => {}} />
        <Button
          label='초기화'
          customStyle={toggleButtonStyle}
          onClick={onSearchReset}
        />
      </MenuRow>
    </MenuSearchStyled>
  );
}

const MenuSearchStyled = styled.div`
  display: flex;
  flex-direction: column;
`;
const MenuRow = styled.div`
  display: flex;
  justify-content: space-between;

  form {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  & + & {
    margin-top: 10px;
  }
`;

const inputTextStyle = css`
  width: calc(100% - 150px);
`;

const confirmButtonStyle = css`
  width: 100px;
`;

const toggleButtonStyle = css`
  width: 100px;
`;
