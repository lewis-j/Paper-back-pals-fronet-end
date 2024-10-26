import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import styles from "./Modal.module.scss";

const Modal = ({ children, title, setIsOpen, isOpen, style }) => {
  useEffect(() => {
    if (!isOpen) return null;
    const closeModal = () => {
      setIsOpen(false);
    };
    window.addEventListener("click", closeModal);

    return () => {
      window.removeEventListener("click", closeModal);
    };
  }, [isOpen, setIsOpen]);
  if (!isOpen) return null;
  return (
    <div className={styles.wrapper}>
      <div
        style={style}
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
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
