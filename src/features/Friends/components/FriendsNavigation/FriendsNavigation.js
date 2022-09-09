import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { _s } from "../../../../style";
import { upperFirst } from "../../../../utilities/stringUtil";
import styles from "./FriendsNavigation.module.scss";

const navItems = ["library", "profile", "friends"];

const FriendsNavigation = ({ isOpen, toggleList, _style }) => {
  const { pathname } = useLocation();
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
        const { click, classStyle } =
          active !== item
            ? {
                click: () => {
                  console.log("clicked nav", item);
                  handleClick(item);
                },
                classStyle: styles.nav_item,
              }
            : {
                click: () => null,
                classStyle: _s(styles.nav_item, styles.active),
              };

        return (
          <span key={`friendsNav${i}`} onClick={click} className={classStyle}>
            {upperFirst(item)}
          </span>
        );
      })}
    </div>
  );
};

export default FriendsNavigation;
