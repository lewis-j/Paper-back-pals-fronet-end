import * as status from "../data/status";

const rejectionReducer = (state, action) => {
  state.status = status.FAILED;
  state.error = action.error.message;
  console.error(action.error.message);
};

const pendingReducer = (state) => {
  state.status = status.LOADING;
  state.error = null;
};

const setSuccessState = (state) => {
  state.status = status.SUCCEEDED;
  state.error = null;
};

export { rejectionReducer, pendingReducer, setSuccessState };
