import styles from "./NoContent.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NoContent = ({ children, ...props }) => {
  const getIcon = (icon) => {
    if (typeof icon === "function") {
      const Icon = icon;
      return <Icon style={{ width: "100%", height: "100%" }} />;
    }
    if (typeof icon === "object") {
      return (
        <FontAwesomeIcon
          icon={icon}
          style={{ fontSize: "13em", width: "100%" }}
        />
      );
    }
  };
  return (
    <div className={`${styles.container}`}>
      <div className={styles.iconWrapper}>{getIcon(props.icon)}</div>
      <div className={styles.text}>{props.text}</div>
      {children && <div className={styles.children}>{children}</div>}
    </div>
  );
};

export default NoContent;
