import { fetchBook, likeBook } from "api/books.api";
import {
  BookDetail,
  BookReviewItem,
  BookReviewItemWrite,
} from "models/book.model";
import { useEffect, useState } from "react";
import { useAuthStore } from "store/autStore";
import { useAlert } from "./useAlert";
import { addCart } from "api/carts.api";
import { addBookReview, fetchBookReview } from "api/review.api";
import { addReview } from "mock/review";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const [reviews, setReviews] = useState<BookReviewItem[]>([]);
  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();

  const likeToggle = () => {
    if (!isLoggedIn) {
      showAlert("Login required.");
    }

    if (!book) return;

    if (book.liked) {
      setBook({
        ...book,
        liked: false,
        likes: book.likes - 1,
      });
    } else {
      likeBook(book.id).then(() => {
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1,
        });
      });
    }
  };

  const addToCart = (quantity: number) => {
    if (!book) return;

    addCart({
      book_id: book.id,
      quantity: quantity,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book);
    });

    fetchBookReview(bookId).then((reviews) => {
      setReviews(reviews);
    });
  }, [bookId]);

  const addReview = (data: BookReviewItemWrite) => {
    if (!book) return;

    addBookReview(book.id.toString(), data).then((res) => {
      fetchBookReview(book.id.toString()).then((reviews) => {
        setReviews(reviews);
      });
    });
  };

  return { book, likeToggle, addToCart, cartAdded, reviews, addReview };
};
