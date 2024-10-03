import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  currentRoomId: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setCurrentRoomId: (state, action) => {
      state.currentRoomId = action.payload;
    },
  },
});

export const { setMessages, addMessage, setCurrentRoomId } = chatSlice.actions;
export default chatSlice.reducer;
