import React from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

function Error() {
  const error = useRouteError() as RouteError;

  return (
    <div>
      <h1>An error occurred: </h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}

export default Error;
