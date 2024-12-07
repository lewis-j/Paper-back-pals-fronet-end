import { useState } from "react";
import { MODAL_TYPES, useFriendModalActions } from "./friendModalTyps";
import { Modal } from "../../../components";
import FriendModalContent from "../components/FriendModalContent/FriendModalContent";

export const useFriendRequestModal = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    title: null,
    data: null,
  });
  const closeModal = () => {
    setModal({ isOpen: false, type: null, title: null, data: null });
  };

  const openModal = (type, data) => {
    console.log("type", type, data);
    const config = MODAL_TYPES[type];
    if (!config) {
      console.warn(`No configuration found for modal type: ${type}`);
      return;
    }
    setModal({ isOpen: true, type: config.value, title: config.title, data });
  };

  const friendModalActions = useFriendModalActions(openModal);

  const getModalContent = (type, data) => {
    if (!data) return null;
    switch (type) {
      case MODAL_TYPES.MAKE_FRIEND_REQUEST.value:
        return (
          <FriendModalContent.MakeFriendRequest
            user={data}
            onClose={closeModal}
          />
        );
      case MODAL_TYPES.ACCEPT_FRIEND_REQUEST.value:
        return (
          <FriendModalContent.AcceptFriendRequest
            user={data}
            onClose={closeModal}
          />
        );
      default:
        return null;
    }
  };

  const renderModal = () => {
    return (
      <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
        {getModalContent(modal.type, modal.data)}
      </Modal>
    );
  };

  return { renderModal, friendModalActions };
};
