import { useState } from "react";
import { Modal } from "../../../components";
import { getMenuItems, getModalContent } from "../dashboardMenuConfig";
import { ModalContext } from "../../../context/ModalContext";
import { useModalActions } from "../../../features/library/hooks/useModalActions";

export const useModalMenu = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    title: null,
    data: null,
  });

  const [activeCardId, setActiveCardId] = useState("");
  const modalActions = useModalActions();

  const closeModal = () => {
    setModal({ isOpen: false, type: null, title: null, data: null });
    setActiveCardId("");
  };

  const menuItems = getMenuItems(modalActions, activeCardId);

  const renderModal = () => {
    return (
      <ModalContext.Provider value={{ openModal: modalActions.openModal }}>
        <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
          {getModalContent(modal, closeModal)}
        </Modal>
      </ModalContext.Provider>
    );
  };

  return {
    menuItems,
    openModal: modalActions.openModal,
    renderModal,
    activeCardId,
    setActiveCardId,
  };
};
