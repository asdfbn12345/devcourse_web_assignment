import React from "react";
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import { BookStoreThemeProvider } from "./context/themeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "components/common/Error";
import SignUp from "pages/SignUp";
import ResetPassword from "pages/ResetPassword";
import Login from "pages/Login";
import Books from "pages/Books";
import BookDetail from "pages/BookDetail";
import { QueryClientProvider } from "react-query";
import { queryClient } from "api/queryClient";

const routeList = [
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/reset",
    element: <ResetPassword />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/book/:bookId",
    element: <BookDetail />,
  },
];

const router = createBrowserRouter(
  routeList.map((route) => {
    return {
      ...route,
      element: <Layout>{route.element}</Layout>,
      errorElement: <Error />,
    };
  })
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookStoreThemeProvider>
        <RouterProvider router={router} />
      </BookStoreThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
