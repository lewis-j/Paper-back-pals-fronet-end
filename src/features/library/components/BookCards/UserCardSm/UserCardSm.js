import React, { useState } from "react";
import styles from "./UserCardSm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { Progress, ListGroupItem } from "reactstrap";
import { Button } from "../../../../../components";

const UserCardSm = ({
  bookData: {
    coverImg,
    title,
    dueDate,
    lenderId,
    lender,
    lenderImg,
    progressValue,
  },
  menuItems = [
    {
      text: "message",
      clickHandler: () => {
        console.log("testing");
      },
    },
  ],
  isActive = false,
  setActive,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const cardFilter = isActive
    ? {
        infoStyle: styles.infoOpen,
        imgStyle: styles.imgOpen,
        icon: faX,
        size: "xs",
        menuBtnClick: () => {
          setActive("");
        },
      }
    : {
        infoStyle: styles.info,
        imgStyle: styles.img,
        icon: faBars,
        size: "sm",
        menuBtnClick: () => {
          setActive(lenderId);
        },
      };
  return (
    <>
      <div className={styles.container}>
        <div
          className={cardFilter.imgStyle}
          onTransitionEnd={() => {
            setIsMenuVisible(isActive);
          }}
        >
          <img
            src={coverImg}
            alt={`${title} book cover`}
            referrerpolicy="no-referrer"
          />
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
        <div className={cardFilter.infoStyle}>
          <img
            className={styles.avatar}
            src={lenderImg}
            alt={`${lender} avatar`}
          />
          <div className={styles.tracking}>
            <div className={styles.dueDate}>{dueDate}</div>
            <Progress className={styles.progress} value={progressValue} />
          </div>
          <div className={styles.menuBtn} onClick={cardFilter.menuBtnClick}>
            <FontAwesomeIcon size="lg" type="button" icon={cardFilter.icon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCardSm;
