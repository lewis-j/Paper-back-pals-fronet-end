import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styles from "./BookCard.module.scss";
import { useState } from "react";
import { Button } from "../../../../../components";

const BookCard = ({ coverImg, title, status, menuItems = [] }) => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const openMenu = () => {
    setisMenuOpen(!isMenuOpen);
  };
  return (
    <div className={styles.container}>
      <div className={styles.book}>
        {status === "PENDING" && (
          <FontAwesomeIcon
            className={styles.badge}
            size="xl"
            icon={faCircleExclamation}
          />
        )}
        <img className={styles.img} src={coverImg} alt={title} />
        <div
          onTransitionEnd={() => {
            setIsMenuVisible(isMenuOpen);
          }}
          className={isMenuOpen ? styles.isOpen : styles.menuBtn}
          onClick={() => openMenu()}
        >
          <FontAwesomeIcon
            icon={isMenuOpen ? faX : faBars}
            size={isMenuOpen ? "xs" : ""}
          />
        </div>
        {isMenuVisible && menuItems.length !== 0 && (
          <div className={styles.menu}>
            {menuItems.map(({ text, clickHandler }, i) => (
              <Button
                key={`menu-list${i}`}
                onClick={clickHandler}
                varient="white-outline"
              >
                {text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
