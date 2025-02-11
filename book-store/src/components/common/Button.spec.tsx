import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { BookStoreThemeProvider } from "context/themeContext";

describe("Test title component", () => {
  it("check render", () => {
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          Button
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByText("Button")).toBeInTheDocument();
  });
});
