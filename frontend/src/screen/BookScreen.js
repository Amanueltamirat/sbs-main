import React from "react";
import { Helmet } from "react-helmet-async";

function BookScreen() {
  return (
    <div>
      <Helmet>
        <title>SBC-Books</title>
      </Helmet>

      <h1>Books</h1>
    </div>
  );
}

export default BookScreen;
