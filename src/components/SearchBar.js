import React, { useState } from 'react';
import { Button, Input } from '.';

export function SearchBar({ value, onChange, onSearch }) {
  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  const onClick = () => {
    onSearch();
  };

  return (
    <div>
      <Input onChange={onChange} onKeyDown={onKeyDown} value={value} />
      <Button text="검색" onClick={onClick} />
    </div>
  );
}
