import React from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { setChatOpen } from "../../chatSlice";
import Chat from "../Chat/Chat";
import styles from "./ChatModal.module.scss";

const ChatModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.chat.isChatOpen);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button
          className={styles.closeButton}
          onClick={() => dispatch(setChatOpen(false))}
        >
          ×
        </button>
        <Chat />
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default ChatModal;
