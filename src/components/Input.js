import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export function Input({ onChange, value }) {
  return (<InputStyled type='text' onChange={onChange} value={value} />)
};

Input.defaultProps = {
  text: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

const InputStyled = styled.input`
  border: 3px solid black;
`;