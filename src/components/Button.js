import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

// class name 사용하지 않는게 좋음
export function Button({ onClick, text, isActive }) {
  return (
    <ButtonStyled isActive={isActive} onClick={onClick}>
      {text}
    </ButtonStyled>
  );
}

Button.defaultProps = {
  text: '',
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

const ButtonStyled = styled.button`
  border-color: 'black';
  background-color: ${(props) => (props.isActive ? 'red' : '')};
  border: solid;
`;
