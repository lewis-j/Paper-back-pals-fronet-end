import * as Redux from "redux";
import actions from "./actions";

const reducer = (
  state = {
    library: {
      count: 0,
      books: [],
    },
  },
  action
) => {
  switch (action.type) {
    case actions.ADD_BOOK_LIBRARY:
      console.log("ADD_BOOK_LIBRARY", action.data);
      const newState = Object.assign({}, state, {
        library: {
          count: state.library.count + 1,
          books: [...state.library.books, action.data],
        },
      });
      console.log("state", newState);
      return newState;
  }

  return state;
};

let store = Redux.createStore(reducer);

export default store;
