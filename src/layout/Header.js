import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <HeaderStyled>
      <Link to={'/order'}>order</Link>
      <Link to={'/detail'}>detail</Link>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.div`
`;