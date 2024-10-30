import { useState } from "react";

export const useDashboardState = () => {
  const [activeCard, setActiveCard] = useState("");
  const [modal, setModal] = useState({
    isOpen: false,
    type: null,
    data: null,
  });

  const openModal = (type, title, data = null) => {
    console.log("openModal", type, title, data);
    setModal({ isOpen: true, type, title, data });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null, title: null, data: null });
  };

  return {
    modal,
    activeCard,
    setActiveCard,
    openModal,
    closeModal,
  };
};
