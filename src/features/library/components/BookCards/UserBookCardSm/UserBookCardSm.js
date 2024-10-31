import React, { useState } from "react";
import styles from "./UserBookCardSm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { Progress } from "reactstrap";
import { Avatar, Button } from "../../../../../components";
import { dayMonthFormat } from "../../../../../utilities/timeUtil";
import { getProgressInPercent } from "../../../../../utilities/bookUtilities";

const UserBookCardSm = ({
  _id: userCard_id,
  book,
  user,
  dueDate,
  currentPage = 0,
  menuItems = [],
  isActive = false,
  setActive,
}) => {
  const { coverImg, title, pageCount = 0 } = book;
  const { username, profilePic } = user;
  const formattedDueDate = dueDate ? dayMonthFormat(dueDate) : null;
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const readingProgress =
    currentPage === 0 || pageCount === 0
      ? 0
      : getProgressInPercent(currentPage, pageCount);

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
          console.log("userCard_id", userCard_id);
          setActive(userCard_id);
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
            referrerPolicy="no-referrer"
          />
          {isMenuVisible && menuItems.length !== 0 && (
            <div className={styles.menu}>
              {menuItems.map(({ text, clickHandler }, i) => (
                <Button
                  key={`menu-list${i}`}
                  onClick={() => clickHandler(userCard_id)}
                  varient="white-outline"
                >
                  {text}
                </Button>
              ))}
            </div>
          )}
        </div>
        <div className={cardFilter.infoStyle}>
          <div className={styles.avatar}>
            <Avatar imgSrc={profilePic} size="sm" username={username} />
          </div>
          <div className={styles.tracking}>
            <div className={styles.dueDate}>{formattedDueDate}</div>
            <Progress className={styles.progress} value={readingProgress} />
          </div>
          <div className={styles.menuBtn} onClick={cardFilter.menuBtnClick}>
            <FontAwesomeIcon size="lg" type="button" icon={cardFilter.icon} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookCardSm;
