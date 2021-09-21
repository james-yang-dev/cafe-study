import PropTypes from 'prop-types';
import styled from '@emotion/styled';

export function Button({ onClick, text }) {
  return <ButtonStyled onClick={onClick}>{text}</ButtonStyled>;
}

Button.defaultProps = {
  text: '',
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const ButtonStyled = styled.button`
  border: 1px solid red;
`;
