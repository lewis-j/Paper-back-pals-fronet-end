import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setMessages, addMessage, setCurrentRoomId } from "../../chatSlice";
import { getMessages, enterChatRoom } from "../../chatApi";
import chatStyles from "./Chat.module.scss";
const nestURL = process.env.REACT_APP_NEST_URI;

const Chat = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.friends.currentFriend);
  console.log("current freind", selectedUser);
  const roomId = useSelector((state) => state.chat.currentRoomId);
  const messages = useSelector((state) => state.chat.messages);
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const currentUser = useSelector((state) => state.authUser.currentUser);
  //get selectedUserId

  useEffect(() => {
    const fetch = async () => {
      if (selectedUser) {
        const data = await enterChatRoom(selectedUser._id);
        dispatch(setCurrentRoomId(data.roomId));
      }
    };
    fetch();
  }, [selectedUser, dispatch]);

  useEffect(() => {
    console.log("nestURl", nestURL);
    const newSocket = io(nestURL);
    setSocket(newSocket);

    newSocket.emit("joinRoom", roomId);
    dispatch(setCurrentRoomId(roomId));
    const fetchMessages = async () => {
      const messages = await getMessages(roomId);
      console.log("message", messages);
      dispatch(setMessages(messages));
    };

    fetchMessages();

    newSocket.on("newMessage", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      newSocket.emit("leaveRoom", roomId);
      newSocket.disconnect();
    };
  }, [roomId, dispatch]);

  const sendMessage = () => {
    if (messageInput.trim() && socket) {
      const messageData = {
        roomId,
        message: messageInput,
        sender: selectedUser._id,
      };
      console.log("sending message data", messageData);
      socket.emit("sendMessage", messageData);
      setMessageInput("");
    }
  };
  return (
    <div className={chatStyles.chatContainer}>
      <div className={chatStyles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${chatStyles.message} ${
              msg.sender === currentUser ? chatStyles.sent : chatStyles.received
            }`}
          >
            <div className={chatStyles.messageContent}>{msg.content}</div>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
