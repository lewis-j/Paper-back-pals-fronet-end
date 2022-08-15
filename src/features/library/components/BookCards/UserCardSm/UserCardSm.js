import React, { useState } from "react";
import styles from "./UserCardSm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { Progress } from "reactstrap";
import { Avatar, Button } from "../../../../../components";

const UserCardSm = ({
  book,
  user,
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
  const {
    _id: userCard_id,
    coverImg,
    title,
    dueDate,
    progressValue = 10,
  } = book;
  const { sender_id, username, profilePic } = user;
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
          <div className={styles.avatar}>
            <Avatar imgSrc={profilePic} size="sm" username={username} />
          </div>

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
