import BooksEmpty from "components/books/BooksEmpty";
import BooksFilter from "components/books/BooksFilter";
import BooksList from "components/books/BooksList";
import BooksViewSwitcher from "components/books/BooksViewSwitcher";
import Button from "components/common/Button";
import Loading from "components/common/Loading";
import Title from "components/common/Title";
import { useBooksInfinite } from "hooks/useBookInfinite";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

function Books() {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  const loadMore = () => {
    fetchNextPage();
  };

  if (isEmpty) {
    return <BooksEmpty />;
  }

  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        {/* <Pagination pagination={pagination} /> */}

        <div className="more" ref={moreRef}>
          <Button
            size="medium"
            scheme="normal"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            {hasNextPage ? "More" : "Last page"}
          </Button>
        </div>
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    align-items: center;
  }
`;

export default Books;
