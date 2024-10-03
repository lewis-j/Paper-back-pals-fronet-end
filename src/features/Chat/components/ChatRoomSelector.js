// src/components/ChatRoomSelector.tsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentRoomId } from "../features/chat/chatSlice";
import chatApi from "../chatApi";

const ChatRoomSelector = ({ currentUserId }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const dispatch = useDispatch();
  const currentRoomId = useSelector((state) => state.chat.currentRoomId);

  useEffect(() => {
    // Fetch chat rooms for the current user
    // fetch(`http://localhost:3000/chat/rooms/${currentUserId}`)
    //   .then((response) => response.json())
    //   .then((data) => setChatRooms(data));
    const fetchChatRooms = async () => {
      const chatRooms = await chatApi.getChatRooms(currentUserId);
      setChatRooms(chatRooms);
    };
    fetchChatRooms();
  }, [currentUserId]);

  const createOrGetChatRoom = async () => {
    if (selectedUserId) {
      const data = await chatApi.enterChatRoom(currentUserId, selectedUserId);
      dispatch(setCurrentRoomId(data.roomId));
    }
  };

  return (
    <div>
      <select
        value={currentRoomId || ""}
        onChange={(e) => dispatch(setCurrentRoomId(e.target.value))}
      >
        <option value="">Select a chat room</option>
        {chatRooms.map((room) => (
          <option key={room.roomId} value={room.roomId}>
            Chat with {room.participants.find((id) => id !== currentUserId)}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={selectedUserId}
        onChange={(e) => setSelectedUserId(e.target.value)}
        placeholder="Enter user ID to chat with"
      />
      <button onClick={createOrGetChatRoom}>Start Chat</button>
    </div>
  );
};

export default ChatRoomSelector;
