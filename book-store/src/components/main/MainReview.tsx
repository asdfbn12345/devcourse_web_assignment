import BookReview from "components/book/BookReview";
import { BookReviewItem } from "models/book.model";
import styled from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "hooks/useMediaQuery";

interface MainReviewProps {
  reviews: BookReviewItem[];
}

function MainReview({ reviews }: MainReviewProps) {
  const { isMobile } = useMediaQuery();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: isMobile ? 1 : 3,
    gap: 16,
  };

  return (
    <MainReviewStyle>
      <Slider {...sliderSettings}>
        {reviews.map((review) => (
          <BookReview key={review.id} review={review} />
        ))}
      </Slider>
    </MainReviewStyle>
  );
}

const MainReviewStyle = styled.div`
  padding: 0 0 24px 0;

  .slick-track {
    padding: 12px 0;
  }

  .slick-slide {
    padding: 12px 0;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #800;
  }

  @media screen AND ${({ theme }) => theme.mediaQuery.mobile} {
    .slick-prev {
      left: 0;
    }
    .slick-next {
      right: 0;
    }
  }
`;

export default MainReview;
