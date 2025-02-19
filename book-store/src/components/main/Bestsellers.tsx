import Bestseller from "components/book/Bestseller";
import { Book } from "models/book.model";
import styled from "styled-components";

interface BestsellersProps {
  books: Book[];
}

function Bestsellers({ books }: BestsellersProps) {
  return (
    <BestsellersStyle>
      {books.map((book, index) => (
        <Bestseller key={book.id} book={book} itemIndex={index} />
      ))}
    </BestsellersStyle>
  );
}

const BestsellersStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default Bestsellers;
