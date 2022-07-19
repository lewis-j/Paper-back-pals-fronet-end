import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styles from "./BookCard.module.scss";
import { useState } from "react";
import { Button } from "../../Button";

const BookCard = ({ coverImg, title, status }) => {
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const openMenu = () => {
    console.log("clicked", isMenuOpen);
    setisMenuOpen(!isMenuOpen);
  };
  return (
    <div className={styles.container}>
      {console.log("rendering bookcard")}
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
        {isMenuVisible && (
          <div className={styles.menu}>
            <Button varient="white-outline">Request</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
