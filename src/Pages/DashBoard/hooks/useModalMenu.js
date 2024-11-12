import React, { useState } from "react";
import { Modal } from "../../../components";
import { getMenuItems, getModalContent } from "../dashboardMenuConfig";

const useModalMenu = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    title: null,
    data: null,
  });

  const [activeCardId, setActiveCardId] = useState("");

  const openModal = (type, title, data = null) => {
    setModal({ isOpen: true, type, title, data });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null, title: null, data: null });
    setActiveCardId("");
  };

  const menuItems = getMenuItems(openModal, activeCardId);

  const renderModal = () => {
    console.log("modal", modal);
    return (
      <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
        {getModalContent(modal, closeModal)}
      </Modal>
    );
  };
  return {
    menuItems,
    openModal,
    renderModal,
    activeCardId,
    setActiveCardId,
  };
};

export default useModalMenu;
