import styles from "./Button.module.scss";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  icon,
  varient = "default",
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`${styles.btn} ${styles[varient]} ${className}`}
      onClick={onClick}
    >
      <span>{children}</span> <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default Button;
