import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/bookSlice";
import BookList from "./BookList";
import BookForm from "./BookForm";
import { Link } from "react-router-dom";

const BookView = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  if (status === "Pending") {
    return <p>Loading....</p>;
  }

  if (status === "Rejected") {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <BookList books={books} />
      <Link to={"/addBook"}>Go to form to add a book</Link>
    </>
  );
};

export default BookView;
