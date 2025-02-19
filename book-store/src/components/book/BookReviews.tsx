import { BookReviewItem, BookReviewItemWrite } from "models/book.model";
import styled from "styled-components";
import BookReview from "./BookReview";
import BookReviewAdd from "./BookReviewAdd";

interface BookReviewProps {
  reviews: BookReviewItem[];
  onAdd: (data: BookReviewItemWrite) => void;
}

function BookReviews({ reviews, onAdd }: BookReviewProps) {
  return (
    <BookReviewStyle>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReview review={review} />
      ))}
    </BookReviewStyle>
  );
}

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default BookReviews;
