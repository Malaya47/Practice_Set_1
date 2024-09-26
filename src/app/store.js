import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/bookSlice";

export default configureStore({
  reducer: {
    books: booksReducer,
  },
});
