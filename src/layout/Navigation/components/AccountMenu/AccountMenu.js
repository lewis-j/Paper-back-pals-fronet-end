import React from "react";
import { navItems } from "../config/navConfig";
import styles from "./AccountMenu.module.scss";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../../../../components";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const AccountMenu = ({ onClose }) => {
  const navigate = useNavigate();
  const { profilePic, username } = useSelector(
    (state) => state.authUser.currentUser
  );
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Avatar imgSrc={profilePic} username={username} /> {username}
        <button
          className={styles.closeButton}
          onClick={() => {
            console.log("cloding in account menu");
            onClose();
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <div className={styles.links}>
        {navItems.accountMenu.map((item) => (
          <button
            key={item.id}
            className={styles.navLink}
            onClick={() => navigate(item.path)}
          >
            <FontAwesomeIcon
              icon={item.icon}
              style={{ boxSizing: "border-box" }}
              className={styles.icon}
            />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccountMenu;
