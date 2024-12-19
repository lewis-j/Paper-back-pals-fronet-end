import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./SlidePanel.module.scss";
import { _s } from "../../style";

const SlidePanel = ({ open = false, onClose, children }) => {
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
    const closePanel = (e) => {
      if (e.target.closest(`.${styles.container}`)) return;
      setIsClosing(true);
    };
    window.addEventListener("click", closePanel);
    return () => window.removeEventListener("click", closePanel);
  }, [open]);

  if (!open) return null;

  const animStyle = isClosing ? styles.slideOut : styles.slideIn;

  return createPortal(
    <div className={styles.wrapper}>
      <div
        className={_s(styles.container, animStyle)}
        onAnimationEnd={() => {
          if (open && isClosing) {
            onClose();
            setIsClosing(false);
          }
        }}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.getElementById("slide-panel")
  );
};

export default SlidePanel;
