import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get(
    `https://reduxtoolkit-book-list-backend.vercel.app/books`
  );
  return response.data;
});

// Posting data
export const postBookData = createAsyncThunk(
  "book/postBookData",
  async (bookData) => {
    const response = await axios.post(
      `https://reduxtoolkit-book-list-backend.vercel.app/books`,
      bookData
    );
    return response.data;
  }
);

// deleting data
export const deleteBookData = createAsyncThunk(
  "books/deleteBook",
  async (id) => {
    const response = await axios.delete(
      `https://reduxtoolkit-book-list-backend.vercel.app/books/${id}`
    );
    return response.data;
  }
);

// update data
export const updateBookAsync = createAsyncThunk(
  "book/updateBook",
  async (book) => {
    const response = await axios.put(
      `https://reduxtoolkit-book-list-backend.vercel.app/updateBook/${book?._id}`,
      book
    );
    return response.data;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = "Fetched successfully";
      state.books = action.payload;
    });
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.status = "Rejected";
      state.error = action.error.message;
    });
    builder.addCase(postBookData.fulfilled, (state, action) => {
      state.status = "Posted data successfully";
    });
    builder.addCase(postBookData.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(postBookData.rejected, (state, action) => {
      state.status = "Rejected";
      state.error = action.error.message;
    });
    builder.addCase(deleteBookData.fulfilled, (state, action) => {
      state.status = "Deleted data successfully";
    });
    builder.addCase(deleteBookData.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(deleteBookData.rejected, (state, action) => {
      state.status = "Rejected";
      state.error = action.error.message;
    });
    builder.addCase(updateBookAsync.fulfilled, (state, action) => {
      state.status = "Data updated successfully";
    });
    builder.addCase(updateBookAsync.pending, (state) => {
      state.status = "Pending";
    });
    builder.addCase(updateBookAsync.rejected, (state, action) => {
      state.status = "Rejected";
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {  } = bookSlice.actions;

export default bookSlice.reducer;
