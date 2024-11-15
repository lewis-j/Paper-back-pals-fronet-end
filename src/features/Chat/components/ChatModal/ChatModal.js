import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setChatOpen,
  setCurrentRoomId,
  setParticipantId,
} from "../../chatSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons";
import Chat from "../Chat/Chat";
import styles from "./ChatModal.module.scss";
import { ContactList } from "../../../Friends";
import { enterChatRoom } from "../../chatApi";
import { UserCard } from "../../../Friends/components/UserCard";
import { useEffect } from "react";

const ChatModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.chat.isChatOpen);
  const participantId = useSelector((state) => state.chat.paticipantId);
  const friends = useSelector((state) => state.friends.friendsList);
  const selectedUser = friends.find((friend) => friend._id === participantId);

  useEffect(() => {
    if (participantId) {
      const fetch = async () => {
        const data = await enterChatRoom(participantId);
        dispatch(setCurrentRoomId(data.roomId));
      };
      fetch();
    }
  }, [participantId, dispatch]);

  const selectUserForChat = async (userId) => {
    dispatch(setParticipantId(userId));
    // const data = await enterChatRoom(userId);
    // dispatch(setCurrentRoomId(data.roomId));
  };

  const handleBack = () => {
    dispatch(setCurrentRoomId(null));
    dispatch(setParticipantId(null));
  };
  console.log("selectedUser", selectedUser);
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          {participantId && (
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
        {participantId ? (
          <Chat participantId={participantId} />
        ) : (
          <ContactList setUser={selectUserForChat} />
        )}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default ChatModal;
