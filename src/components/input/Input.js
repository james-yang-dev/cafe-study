import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  customStyle: PropTypes.string,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
};

export function Input({
  onChange,
  value,
  customStyle,
  isDisabled,
  isReadOnly,
  ...rest
}) {
  return (
    <InputWrapper customStyle={customStyle}>
      <InputStyled
        type='text'
        onChange={onChange}
        value={value}
        disabled={isDisabled}
        readOnly={isReadOnly}
        {...rest}
      />
    </InputWrapper>
  );
}

Input.defaultProps = {
  text: '',
};

const InputWrapper = styled.div`
  overflow: hidden;
  ${({ customStyle }) => customStyle};
`;

const InputStyled = styled.input`
  display: inline-flex;
  height: 36px;
  line-height: 36px;
  padding: 0.6em 1em;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
`;
