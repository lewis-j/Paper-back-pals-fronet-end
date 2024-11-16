import { useState } from "react";
import { Modal } from "../../../components";
import {
  getMenuItems,
  getModalContent,
  ModalContent,
} from "../../../Pages/Dashboard/dashboardMenuConfig";
import { ModalContext } from "../../../context/ModalContext";
import { useModalActions } from "../../../features/library/hooks/useModalActions";
import { MODAL_CONFIG } from "../../../features/library/config/modals/modalConfig";

export const useModalMenu = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    title: null,
    data: null,
  });

  const [activeCardId, setActiveCardId] = useState("");

  const openModal = (type, data) => {
    const config = MODAL_CONFIG[type];
    if (!config) {
      console.warn(`No configuration found for modal type: ${type}`);
      return;
    }
    setModal({ isOpen: true, type, title: config.title, data });
  };
  const modalActions = useModalActions(openModal);

  const closeModal = () => {
    setModal({ isOpen: false, type: null, title: null, data: null });
    setActiveCardId("");
  };

  const menuItems = getMenuItems(modalActions, activeCardId);

  const renderModal = () => {
    return (
      <ModalContext.Provider value={{ openModal: modalActions.openModal }}>
        <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
          <ModalContent modal={modal} onClose={closeModal} />
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
