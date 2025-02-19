import { fetchBooks } from "api/books.api";
import { BOOKS_VIEW_LIMIT as BOOKS_PAGE_VIEW_LIMIT } from "constants/pagination";
import { QUERYSTRING } from "constants/querystring";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: booksData, isLoading: isBooksLoading } = useQuery(
    ["books", location.search],
    () =>
      fetchBooks({
        category_id: params.get(QUERYSTRING.CATEGORY_ID)
          ? Number(params.get(QUERYSTRING.CATEGORY_ID))
          : undefined,
        news: params.get(QUERYSTRING.NEWS) ? true : undefined,
        currentPage: params.get(QUERYSTRING.PAGE)
          ? Number(params.get(QUERYSTRING.PAGE))
          : 1,
        limit: BOOKS_PAGE_VIEW_LIMIT,
      })
  );

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
    isBooksLoading,
  };
};
