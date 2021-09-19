import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Input, Button } from '../../components';
import { ToggleButton } from '../../components/button/ToggleButton';

MenuSearch.propTypes = {
  filterOptionList: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onFilterReset: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export function MenuSearch({
  filterData,
  filterOptionList,
  onSubmit,
  onFilterReset,
  onToggle,
}) {
  const [inputValue, setInputValue] = useState('');
  const onChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputValue);
  };
  const { options } = filterData;
  return (
    <MenuSearchStyled>
      <MenuRow>
        <form onSubmit={handleSubmit}>
          <Input
            value={inputValue}
            onChange={onChange}
            customStyle={inputTextStyle}
          />
          <Button
            type='submit'
            varient='confirm'
            label='검색'
            customStyle={confirmButtonStyle}
            onClick={handleSubmit}
          />
        </form>
      </MenuRow>
      <MenuRow>
        {filterOptionList.map((opt) => {
          const buttonLabel = opt.replace(opt[0], opt[0].toUpperCase());
          const isActive = options.includes(opt);
          return (
            <ToggleButton
              key={opt}
              isActive={isActive}
              label={buttonLabel}
              onClick={() => onToggle(opt)}
            />
          );
        })}
        <Button
          label='초기화'
          customStyle={toggleButtonStyle}
          onClick={onFilterReset}
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
