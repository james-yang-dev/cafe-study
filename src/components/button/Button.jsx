import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  varient: PropTypes.oneOf(['confirm', 'normal']).isRequired,
  customStyle: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export function Button({
  type,
  onClick,
  label,
  varient,
  customStyle,
  isDisabled,
  ...rest
}) {
  return (
    <ButtonStyled
      type={type}
      onClick={onClick}
      varient={varient}
      customStyle={customStyle}
      disabled={isDisabled}
      {...rest}
    >
      {label}
    </ButtonStyled>
  );
}

Button.defaultProps = {
  varient: 'normal',
  type: 'button',
  text: '',
};

// style

const ButtonStyled = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0.8em 1.5em;
  border-radius: 3px;
  cursor: pointer;
  color: ${({ varient }) => (varient === 'confirm' ? '#fff' : 'inherit')};
  background-color: ${({ varient }) =>
    varient === 'confirm' ? '#2185d0' : '#e0e1e2 '};

  &:disabled {
    cursor: not-allowed;
  }

  ${({ customStyle }) => customStyle}
`;
