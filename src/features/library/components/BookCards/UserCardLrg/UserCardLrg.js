import React from "react";
import { Avatar, Button, ProgressBar } from "../../../../../components";

import "./UserCardLrg.scss";
import styles from "./UserCardLrg.module.scss";

import { getProgressInPercent } from "../../../../../utilities/bookUtilities";
import { dayMonthFormat } from "../../../../../utilities/timeUtil";

const UserCardLrg = ({
  _id: userCard_id,
  book,
  icon,
  user,
  progress = true,
  menuItems = [],
  isMenuVisible = false,
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

  const readingProgress = getProgressInPercent(currentPage, pageCount);

  return (
    <div className={styles.container} style={{ maxWidth: "540px" }}>
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
