import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

const Modal = ({ children, title, isOpen = false, setIsOpen, style }) => {
  const [isInit, setIsInit] = useState(false);
  const greyAreaRef = useRef();

  const closeModal = (event) => {
    if (event.target === greyAreaRef.current) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen && isInit) return;
    window.addEventListener("click", closeModal);
    setIsInit(true);
    return () => {
      window.removeEventListener("click", closeModal);
    };
  }, [isOpen, isInit]);

  if (!isOpen) return null;

  return (
    <div className={styles.wrapper} ref={greyAreaRef}>
      <div style={style} className={styles.container}>
        <div className={styles.header}>
          <h5>{title}</h5>
          <span onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
