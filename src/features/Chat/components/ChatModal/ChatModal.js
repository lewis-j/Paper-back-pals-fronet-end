import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { setChatOpen, setCurrentRoomId } from "../../chatSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import Chat from "../Chat/Chat";
import styles from "./ChatModal.module.scss";
import { ContactList } from "../../../Friends";
import { enterChatRoom } from "../../chatApi";
import { useState } from "react";
import { Avatar } from "../../../../components";
import { UserCard } from "../../../Friends/components/UserCard";

const ChatModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.chat.isChatOpen);
  const currentRoomId = useSelector((state) => state.chat.currentRoomId);
  const friends = useSelector((state) => state.friends.friendsList);
  const [selectedUser, setSelectedUser] = useState(null);

  const selectUserForChat = async (userId) => {
    const data = await enterChatRoom(userId);
    setSelectedUser(friends.find((friend) => friend._id === userId));
    dispatch(setCurrentRoomId(data.roomId));
  };

  const handleBack = () => {
    dispatch(setCurrentRoomId(null));
  };
  console.log("selectedUser", selectedUser);
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          {currentRoomId && (
            <>
              <button
                className={styles.backButton}
                onClick={handleBack}
                aria-label="Back to contacts"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <UserCard
                username={selectedUser?.username}
                profilePic={selectedUser?.profilePic}
              />
            </>
          )}
          <button
            className={styles.closeButton}
            onClick={() => dispatch(setChatOpen(false))}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {currentRoomId ? <Chat /> : <ContactList setUser={selectUserForChat} />}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default ChatModal;
