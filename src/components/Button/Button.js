import styles from "./Button.module.scss";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({
  icon,
  varient = "default",
  children,
  onClick,
  size,
  className = "",
}) => {
  const getIcon = (icon) => {
    console.log("type of icon::::", typeof icon);
    if (typeof icon === "function") {
      const Icon = icon;
      return <Icon style={{ width: "100%", height: "100%" }} />;
    }
    if (typeof icon === "object") {
      return <FontAwesomeIcon icon={icon} />;
    }
  };

  console.log("icon value", getIcon(icon));
  return (
    <button
      className={`${styles.btn} ${styles[varient]} ${styles[size]} ${className}`}
      onClick={onClick}
    >
      <span>{children}</span> {getIcon(icon)}
    </button>
  );
};

export default Button;
