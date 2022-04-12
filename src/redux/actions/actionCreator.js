import { bookActions } from "./actions";

const { ADD_BOOK_LIBRARY } = bookActions;

export const bookActionCreators = {
  addBook: (bookInfo) => {
    return { type: ADD_BOOK_LIBRARY, info: bookInfo };
  },
};
