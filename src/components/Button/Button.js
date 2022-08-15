import styles from "./Button.module.scss";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  icon,
  varient = "default",
  circle = false,
  children,
  onClick,
  size,
  className = "",
  disabled = false,
}) => {
  const getIcon = (icon) => {
    if (typeof icon === "function") {
      //if Tabler Icon
      const Icon = icon;
      return <Icon style={{ width: "100%", height: "100%" }} />;
    }
    if (typeof icon === "object") {
      return <FontAwesomeIcon icon={icon} />;
    }
  };

  return (
    <button
      disabled={disabled}
      className={`${styles.btn} ${styles[varient]} ${
        styles[size]
      } ${className} ${circle ? styles.circle : ""}`}
      onClick={onClick}
    >
      <span>{children}</span> {getIcon(icon)}
    </button>
  );
};

export default Button;
