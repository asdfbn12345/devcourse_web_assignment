import BookItem from "components/books/BookItem";
import { Book } from "models/book.model";
import styled from "styled-components";

interface MainNewBooksProps {
  books: Book[];
}

function MainNewBooks({ books }: MainNewBooksProps) {
  return (
    <MainNewBooksStyle>
      {books.map((book) => (
        <BookItem key={book.id} book={book} view="grid" />
      ))}
    </MainNewBooksStyle>
  );
}

const MainNewBooksStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MainNewBooks;
