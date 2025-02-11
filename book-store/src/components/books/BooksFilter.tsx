import Button from "components/common/Button";
import { QUERYSTRING } from "constants/querystring";
import { useCategory } from "hooks/useCategory";
import React from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

function BooksFilter() {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (id === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get("news")) {
      newSearchParams.delete("news");
    } else {
      newSearchParams.set("news", "true");
    }
  };

  const currentCategory = searchParams.get(QUERYSTRING.CATEGORY_ID);

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button
            size="medium"
            scheme={
              currentCategory === item.id?.toString() ? "primary" : "normal"
            }
            key={item.id}
            onClick={() => handleCategory(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          size="medium"
          scheme={searchParams.get("news") ? "primary" : "normal"}
          onClick={() => handleNews()}
        >
          New books
        </Button>
      </div>
    </BooksFilterStyle>
  );
}

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;

export default BooksFilter;
