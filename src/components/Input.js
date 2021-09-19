import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export function Input({ onChange, onKeyDown, value }) {
  // event.target.value를 여기서 셋팅해줘야 함
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return <InputStyled type="text" onChange={handleChange} onKeyDown={onKeyDown} value={value} />;
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  value: PropTypes.string.isRequired,
};

const InputStyled = styled.input`
  border-radius: 3px;
  border-color: black;
  border: solid;
`;
