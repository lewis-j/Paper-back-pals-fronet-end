import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "../../../../components";
import styles from "./UserCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const UserCard = ({ _id, username, profilePic, menuItems = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  console.log(menuItems);
  console.log("is menu open", menuOpen);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleMenu = (event) => {
    event.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const renderMenuItems = () => {
    return menuItems.map((item) => (
      <div className={styles.menuItem} key={item.label}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            item.onClick();
          }}
        >
          {item.label}
        </button>
      </div>
    ));
  };
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Avatar imgSrc={profilePic} username={username} />
      </div>
      <h4 className={styles.username}>{username}</h4>
      {menuItems.length > 0 && (
        <button className={styles.menuButton} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      )}
      {menuOpen && (
        <div
          className={`${styles.menuDropdown} ${menuOpen ? styles.open : ""}`}
          ref={dropdownRef}
        >
          {renderMenuItems()}
        </div>
      )}
    </div>
  );
};

export default UserCard;
