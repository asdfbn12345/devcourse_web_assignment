import Button from "components/common/Button";
import { QUERYSTRING } from "constants/querystring";
import React, { useEffect } from "react";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const viewOptions = [
  {
    value: "list",
    icon: <FaList />,
  },
  {
    value: "grid",
    icon: <FaTh />,
  },
];

export type ViewMode = "grid" | "list";

function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSwitch = (value: ViewMode) => {
    const newSearchPrams = new URLSearchParams(searchParams);

    newSearchPrams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchPrams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch("grid");
    }
  });

  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((option) => (
        <Button
          size="medium"
          scheme={
            searchParams.get(QUERYSTRING.VIEW) === option.value
              ? "primary"
              : "normal"
          }
          onClick={() => handleSwitch(option.value as ViewMode)}
        >
          {option.icon}
        </Button>
      ))}
    </BooksViewSwitcherStyle>
  );
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
`;

export default BooksViewSwitcher;
