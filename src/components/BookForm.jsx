import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchBooks,
  postBookData,
  updateBookAsync,
} from "../features/bookSlice";
import { useLocation } from "react-router-dom";

const BookForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [bookName, setBookName] = useState(
    location.state?.book ? location.state.book.bookName : ""
  );
  const [bookAuthor, setBookAuthor] = useState(
    location.state?.book ? location.state.book.author : ""
  );
  const [bookGenre, setBookGenre] = useState(
    location.state?.book ? location.state.book.genre : ""
  );

  const bookFormSubmitHandler = async (e) => {
    e.preventDefault();

    const bookData = {
      bookName,
      author: bookAuthor,
      genre: bookGenre,
    };

    if (location.state?.book) {
      const updatedBook = {
        ...location.state.book,
        bookName,
        author: bookAuthor,
        genre: bookGenre,
      };
      //  dispatch the update async func
      await dispatch(updateBookAsync(updatedBook));
      dispatch(fetchBooks());
    } else {
      // dispatch the add async func
      await dispatch(postBookData(bookData));
      // dispatch to fetch books
      dispatch(fetchBooks());
    }
  };

  return (
    <>
      <h2>Book Form</h2>
      <form onSubmit={bookFormSubmitHandler}>
        <label htmlFor="bookName">Book Name</label> <br />
        <input
          onChange={(e) => setBookName(e.target.value)}
          type="text"
          id="bookName"
          value={bookName}
          required
        />{" "}
        <br />
        <br />
        <label htmlFor="bookAuthor">Author</label> <br />
        <input
          onChange={(e) => setBookAuthor(e.target.value)}
          type="text"
          id="bookAuthor"
          value={bookAuthor}
          required
        />{" "}
        <br />
        <br />
        <label htmlFor="bookGenre">Genre</label> <br />
        <input
          onChange={(e) => setBookGenre(e.target.value)}
          type="text"
          id="bookGenre"
          value={bookGenre}
          required
        />{" "}
        <br /> <br />
        <input type="submit" />
      </form>
    </>
  );
};

export default BookForm;
