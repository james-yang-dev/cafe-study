import React from 'react';
import PropTypes from 'prop-types';

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onChecked: PropTypes.func.isRequired,
};

export function Checkbox({ onChecked, isChecked }) {
  return <input type='checkbox' onChange={onChecked} checked={isChecked} />;
}
