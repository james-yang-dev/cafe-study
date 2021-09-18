import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  customStyle: PropTypes.object,
  isDisabled: PropTypes.bool,
};

export function ToggleButton({
  onClick,
  label,
  isActive,
  customStyle,
  ...rest
}) {
  return (
    <ToggleButtonStyled
      type='button'
      onClick={onClick}
      isActive={isActive}
      {...rest}
    >
      {label}
    </ToggleButtonStyled>
  );
}

const ToggleButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 36px;
  padding: 0.8em 1.5em;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  color: ${({ isActive }) => (isActive ? '#fff' : '#000')};
  background-color: ${({ isActive }) => (isActive ? '#000' : '#767676')};

  ${({ customStyle }) => customStyle}
`;
