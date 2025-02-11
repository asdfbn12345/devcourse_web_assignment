import Title from "components/common/Title";
import React from "react";
import { FaSmileWink } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";

function BooksEmpty() {
  return (
    <BooksEmptyStyle>
      <div className="icon">
        <FaSmileWink />
      </div>
      <Title size="large" color="secondary">
        Couldn't find anything.
      </Title>
      <p>
        <Link to="/books">Go to books page</Link>
      </p>
    </BooksEmptyStyle>
  );
}

const BooksEmptyStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      fill: #ccc;
    }
  }
`;

export default BooksEmpty;
