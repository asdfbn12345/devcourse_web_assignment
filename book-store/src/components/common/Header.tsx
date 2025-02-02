import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <header>
      <h1>book store</h1>
    </header>
  );
}

const HeaderStyle = styled.header`
  background-color: ${({ theme }) => theme.color.background};

  h1 {
    color: ${({ theme }) => theme.color.primary};
  }
`;

export default Header;
