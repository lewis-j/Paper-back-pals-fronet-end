import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { upperFirst } from "../../../../utilities/stringUtil";
import styles from "./FriendsNavigation.module.scss";

const navItems = ["library", "profile", "friends"];

const FriendsNavigation = ({ isOpen, toggleList, _style }) => {
  const { pathname, state } = useLocation();
  const [active, set] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    //fetch user data with user_id
    const name = pathname.split("/")[2];
    set(name);
  }, [pathname]);

  const handleClick = (name) => {
    navigate(name);
  };

  return (
    <div className={styles.nav} style={_style}>
      <span onClick={() => toggleList()} className={styles.nav_item}>
        <FontAwesomeIcon
          icon={faCircleChevronDown}
          className={
            isOpen ? styles.icon : `${styles.icon} ${styles.iconRotate}`
          }
        />
      </span>

      {navItems.map((item, i) => {
        return active === item ? (
          <span
            className={`${styles.nav_item}  ${styles.active}`}
            key={`friendsNav${i}`}
          >
            {item}
          </span>
        ) : (
          <span
            key={`friendsNav${i}`}
            onClick={() => handleClick(item)}
            className={styles.nav_item}
          >
            {upperFirst(item)}
          </span>
        );
      })}
    </div>
  );
};

export default FriendsNavigation;
