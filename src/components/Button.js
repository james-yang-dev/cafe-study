import React from 'react'
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export function Button({ onClick, text, className }) {
  return (<ButtonStyled className={className} onClick={onClick}>{text}</ButtonStyled>)
}

Button.defaultProps = {
  text: '',
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

const ButtonStyled = styled.button`
  border-color: red;
  border: solid;
`