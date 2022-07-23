import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./FriendsNavigation.module.scss";

const data = [
  {
    title: "Library",
    route: "library",
  },
  {
    title: "Profile",
    route: "profile",
  },
];

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

      {data.map((item, i) => {
        return active === item.route ? (
          <span
            className={`${styles.nav_item}  ${styles.active}`}
            key={`friendsNav${i}`}
          >
            {item.title}
          </span>
        ) : (
          <span
            key={`friendsNav${i}`}
            onClick={() => handleClick(item.route)}
            className={styles.nav_item}
          >
            {item.title}
          </span>
        );
      })}
    </div>
  );
};

export default FriendsNavigation;
