import React from "react";
import { useDispatch } from "react-redux";
import { deleteBookData, fetchBooks } from "../features/bookSlice";

import { Link } from "react-router-dom";

const BookList = ({ books }) => {
  const dispatch = useDispatch();
  const deleteBookHandler = async (id) => {
    await dispatch(deleteBookData(id));
    dispatch(fetchBooks());
  };

  return (
    <>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            {book.bookName} - {book.author} - {book.genre}{" "}
            <button>
              {" "}
              <Link to={"/addBook"} state={{ book: book }}>
                Edit
              </Link>
            </button>
            <button onClick={() => deleteBookHandler(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BookList;
