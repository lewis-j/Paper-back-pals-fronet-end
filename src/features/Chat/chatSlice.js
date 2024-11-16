import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  currentRoomId: null,
  paticipantId: null,
  isChatOpen: false,
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
    setChatOpen: (state, action) => {
      state.isChatOpen = action.payload;
    },
    setParticipantId: (state, action) => {
      state.paticipantId = action.payload;
    },
    openChatWithFriend: (state, action) => {
      state.isChatOpen = true;
      state.paticipantId = action.payload;
    },
  },
});

export const {
  setMessages,
  addMessage,
  setCurrentRoomId,
  setChatOpen,
  openChatWithFriend,
  setParticipantId,
} = chatSlice.actions;
export default chatSlice.reducer;
