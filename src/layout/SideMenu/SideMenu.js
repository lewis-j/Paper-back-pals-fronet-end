import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useEffect } from "react";
import { _s } from "../../style";
import styles from "./SideMenu.module.scss";

const SideMenu = ({ open = false, close, children, header }) => {
  const [isClosing, setIsClosing] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }

    return () => (document.body.style.overflow = "inherit");
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const closeModal = () => {
      setIsClosing(true);
    };
    window.addEventListener("click", closeModal);

    return () => {
      window.removeEventListener("click", closeModal);
    };
  }, [open, setIsClosing]);
  if (!open) return null;
  const animStyle = isClosing ? styles.slideOut : styles.slideIn;
  return (
    <div className={styles.wrapper}>
      <div
        className={_s(styles.container, animStyle)}
        onAnimationEnd={() => {
          if (open && isClosing) {
            close();
            setIsClosing(false);
          }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.header}>{header}</h3>
        <div
          className={styles.close}
          onClick={() => {
            setIsClosing(true);
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
export default SideMenu;
