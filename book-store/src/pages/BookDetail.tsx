import BookReviews from "components/book/BookReviews";
import LikeButton from "components/book/LikeButton";
import Modal from "components/common/Modal";
import { Tab, Tabs } from "components/common/Tabs";
import Title from "components/common/Title";
import { useBook } from "hooks/useBook";
import { BookDetail as IBookDetail } from "models/book.model";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { formatDate, formatNumber } from "utils/format";
import { getImgSrc } from "utils/image";

const bookInfoList = [
  {
    label: "Category",
    key: "categoryName",
    filter: (book: IBookDetail) => (
      <Link to={`/books?category_id=${book.category_id}`}>
        {book.categoryName}
      </Link>
    ),
  },
  {
    label: "Format",
    key: "form",
  },
  {
    label: "Pages",
    key: "pages",
  },
  {
    label: "ISBN",
    key: "isbn",
  },
  {
    label: "Publication Date",
    key: "pubDate",
    filter: (book: IBookDetail) => {
      return formatDate(book.pubDate);
    },
  },
  {
    label: "Price",
    key: "price",
    filter: (book: IBookDetail) => {
      return `${formatNumber(book.price)} 원`;
    },
  },
];

function BookDetail() {
  const { bookId } = useParams();
  const { book, likeToggle, reviews, addReview } = useBook(bookId);
  const [isImgOpen, setIsImgOpen] = useState(false);

  if (!book) return null;

  return (
    <BookDetailStyle>
      <header className="header">
        <div className="img" onClick={() => setIsImgOpen(true)}>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <Modal isOpen={isImgOpen} onClose={() => setIsImgOpen(false)}>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </Modal>
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>
          {bookInfoList.map((bookInfo) => (
            <dl>
              <dt>{bookInfo.label}</dt>
              <dd>
                {bookInfo.filter
                  ? bookInfo.filter(book)
                  : book[bookInfo.key as keyof IBookDetail]}
              </dd>
            </dl>
          ))}
          <p className="summary">{book.summary}</p>

          <div className="like">
            <LikeButton book={book} onClick={likeToggle} />
          </div>

          <div className="add-cart">Add cart</div>
        </div>
      </header>
      <div className="content">
        <Tabs>
          <Tab title="Detail">
            <Title size="medium">Detail</Title>
            <p className="detail">{book.detail}</p>
          </Tab>
          <Tab title="Contents">
            <Title size="medium">Contents</Title>
            <p className="contents">{book.contents}</p>
          </Tab>
          <Tab title="Review">
            <Title size="medium">Review</Title>
            <BookReviews reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
      </div>
    </BookDetailStyle>
  );
}

const BookDetailStyle = styled.div`
  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

      dl {
        display: flex;
        margin: 0;
      }
      dt {
        width: 80px;
        color: ${({ theme }) => theme.color.secondary};
      }
      a {
        color: ${({ theme }) => theme.color.primary};
      }
    }
  }

  .content {
    .detail {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }
`;

export default BookDetail;
