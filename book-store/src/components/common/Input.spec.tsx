import { render, screen } from "@testing-library/react";
import InputText from "./InputText";
import { BookStoreThemeProvider } from "context/themeContext";
import { createRef } from "react";

describe("Test input text component", () => {
  // v1
  it("check render", () => {
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="here" />
      </BookStoreThemeProvider>
    );

    expect(screen.getByPlaceholderText("here")).toBeInTheDocument();
  });

  it("Test forwardRef", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="here" />
      </BookStoreThemeProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
