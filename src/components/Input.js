import React from 'react'
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export function Input({ onChange, onKeyUp ,value }) {
  return (<InputStyled type='text' onChange={onChange} onKeyUp={onKeyUp} value={value} />)
}

Input.defaultProps = {
  value: '',
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func,
  value: PropTypes.string.isRequired
}

const InputStyled = styled.input`
  border-radius: 3px;
  border-color: black;
  border: solid;
`