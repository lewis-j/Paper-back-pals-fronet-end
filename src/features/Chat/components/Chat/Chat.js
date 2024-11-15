import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setMessages, addMessage, setCurrentRoomId } from "../../chatSlice";
import { getMessages, enterChatRoom } from "../../chatApi";
import chatStyles from "./Chat.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const nestURL = process.env.REACT_APP_NEST_URI;

const Chat = ({ participantId }) => {
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.chat.currentRoomId);
  const messages = useSelector((state) => state.chat.messages);
  const [socket, setSocket] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const currentUser = useSelector((state) => state.authUser.currentUser);
  //get selectedUserId

  useEffect(() => {
    const newSocket = io(nestURL);
    setSocket(newSocket);

    newSocket.emit("joinRoom", roomId);
    const fetchMessages = async () => {
      const messages = await getMessages(roomId);
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
        sender: participantId,
      };
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
              msg.sender === currentUser._id
                ? chatStyles.sent
                : chatStyles.received
            }`}
          >
            <div className={chatStyles.messageContent}>{msg.content}</div>
          </div>
        ))}
      </div>
      <div className={chatStyles.inputContainer}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className={chatStyles.messageInput}
          placeholder="Type a message"
        />
        <button onClick={sendMessage} className={chatStyles.sendButton}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
