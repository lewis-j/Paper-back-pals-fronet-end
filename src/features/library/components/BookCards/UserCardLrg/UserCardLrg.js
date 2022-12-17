import React from "react";
import { Avatar, Button, ProgressBar } from "../../../../../components";

import "./UserCardLrg.scss";
import styles from "./UserCardLrg.module.scss";

import { getProgressInPercent } from "../../../../../utilities/bookUtilities";
import { dayMonthFormat } from "../../../../../utilities/timeUtil";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

const UserCardLrg = ({
  _id: userCard_id,
  book,
  icon,
  user,
  progress = true,
  menuItems = [],
}) => {
  const {
    coverImg,
    authors,
    title,
    dueDate: _dueDate,
    currentPage = 30,
    pageCount = 224,
  } = book;

  const dueDate = dayMonthFormat(_dueDate);
  const { username, profilePic } = user;
  const [isMenuVisible, setIsMenuVisible] = useState();

  const readingProgress = getProgressInPercent(currentPage, pageCount);

  return (
    <div className={styles.container} style={{ maxWidth: "540px" }}>
      {!isMenuVisible && (
        <div className={styles.menuBtn} onClick={() => setIsMenuVisible(true)}>
          <FontAwesomeIcon icon={faBars} size="lg" />
        </div>
      )}
      <div className={styles.imgContainer}>
        <img
          src={coverImg}
          alt={title}
          className={styles.coverImg}
          referrerpolicy="no-referrer"
        />
      </div>
      <div className={styles.body}>
        <h5 className={styles.title}>{title}</h5>
        <h6 className={styles.subTitle}>{authors[0]}</h6>

        <Avatar imgSrc={profilePic} username={username} />
        {username}
        <dl className={styles.dueDate}>
          <dt>Due Date:</dt>
          <dd>{dueDate}</dd>
        </dl>

        {progress && (
          <div className={styles.progressContainer}>
            <small>
              Reading Progress: {currentPage} of {pageCount}
            </small>
            <ProgressBar value={readingProgress} className={styles.progress} />
          </div>
        )}
      </div>
      {isMenuVisible && menuItems.length !== 0 && (
        <div className={styles.menu}>
          <div
            className={styles.menuClose}
            onClick={() => {
              setIsMenuVisible(false);
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </div>
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
  );
};

export default UserCardLrg;
