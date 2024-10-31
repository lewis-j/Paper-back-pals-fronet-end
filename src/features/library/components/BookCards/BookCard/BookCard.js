import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styles from "./BookCard.module.scss";
import { useState } from "react";
import { Button } from "../../../../../components";
import { _s } from "../../../../../style";

const BookCard = ({
  _id,
  book,
  menuItems = [],
  isActive = false,
  setActive,
  icon = null,
  iconStyle = {},
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const { coverImg, title } = book;

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
        {icon && !isMenuVisible && (
          <FontAwesomeIcon
            className={_s(styles.badge, iconStyle)}
            icon={icon}
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
