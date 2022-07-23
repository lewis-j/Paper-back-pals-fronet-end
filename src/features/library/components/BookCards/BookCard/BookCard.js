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

const BookCard = ({
  cardInfo,
  menuItems = [],
  isActive = false,
  setActive,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { _id, coverImg, title, status } = cardInfo;

  const cardFilter = isActive
    ? {
        className: styles.isOpen,
        icon: faX,
        size: "xs",
        menuBtnClick: () => {
          setActive("");
        },
      }
    : {
        className: styles.menuBtn,
        icon: faBars,
        size: "sm",
        menuBtnClick: () => {
          setActive(_id);
        },
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
            setIsMenuVisible(isActive);
          }}
          className={cardFilter.className}
          onClick={cardFilter.menuBtnClick}
        >
          <FontAwesomeIcon icon={cardFilter.icon} size={cardFilter.size} />
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
