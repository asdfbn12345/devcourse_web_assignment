import { render, screen } from "@testing-library/react";
import Title from "./Title";
import { BookStoreThemeProvider } from "context/themeContext";

describe("Test title component", () => {
  // v1
  it("check render", () => {
    render(
      <BookStoreThemeProvider>
        <Title size="large">Title</Title>
      </BookStoreThemeProvider>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  // v2
  it("Apply size props", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large">Title</Title>
      </BookStoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({ fontSize: "2rem" });
  });

  it("Apply color props", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size="large" color="primary">
          Title
        </Title>
      </BookStoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({ color: "brown" });
  });
});
