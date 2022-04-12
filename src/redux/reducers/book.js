import { bookActions } from "../actions/actions";

const { ADD_BOOK_LIBRARY } = bookActions;

export default function books(
  state = {
    library: {
      count: 0,
      books: [],
    },
  },
  action
) {
  switch (action.type) {
    case ADD_BOOK_LIBRARY:
      console.log("ADD_BOOK_LIBRARY", action.info);
      const newState = Object.assign({}, state, {
        library: {
          count: state.library.count + 1,
          books: [...state.library.books, action.data],
        },
      });
      return newState;
    default:
      return state;
  }
}
