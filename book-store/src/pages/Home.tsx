import React from "react";
import styled from "styled-components";
import MainReview from "components/main/MainReview";
import { useMain } from "hooks/useMain";
import Title from "components/common/Title";
import MainNewBooks from "components/main/MainNewBooks";
import Bestsellers from "components/main/Bestsellers";
import Banner from "components/common/banners/Banner";

function Home() {
  const { reviews, newBooks, bestsellers, banners } = useMain();

  return (
    <HomeStyle>
      <Banner banners={banners} />
      <section className="section">
        <Title size="large">Bestseller</Title>
        <Bestsellers books={bestsellers} />
      </section>
      <section className="section">
        <Title size="large">New Books</Title>
        <MainNewBooks books={newBooks} />
      </section>
      <section className="section">
        <Title size="large">Reviews</Title>
        <MainReview reviews={reviews} />
      </section>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default Home;
