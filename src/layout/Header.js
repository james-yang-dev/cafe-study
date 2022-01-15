import styled from "@emotion/styled";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <HeaderStyled>
      <Link to={"/order"}>order1</Link>
      <Link to={"/detail"}>detail</Link>
    </HeaderStyled>
  );
}

const HeaderStyled = styled.div``;
