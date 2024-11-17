import { useState } from "react";
import styles from "./ChangePageCountForm.module.scss";
import { dayMonthFormat } from "../../../../../utilities/timeUtil";
import { getProgressInPercent } from "../../../../../utilities/bookUtilities";
import { Avatar, Button, ProgressBar } from "../../../../../components";

const ChangePageCountForm = ({ userBook, onConfirm }) => {
  const {
    _id: userBook_id,
    owner,
    book,
    dueDate,
    request,
    currentPage,
  } = userBook;

  const [value, setValue] = useState(currentPage);
  if (!userBook) return null;
  const { coverImg, authors, title, pageCount = 0 } = book;
  const { username, profilePic } = owner;
  const formattedDueDate = dueDate ? dayMonthFormat(dueDate) : null;

  const handleSubmit = () => {
    onConfirm(request.request_id, value, userBook_id);
  };

  const readingProgress =
    currentPage === 0 || pageCount === 0
      ? 0
      : getProgressInPercent(currentPage, pageCount);

  return (
    <div className={styles.container}>
      <div className={styles.bookCard}>
        <div className={styles.imgContainer}>
          <img
            src={coverImg}
            alt={title}
            className={styles.coverImg}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className={styles.body}>
          <h5 className={styles.title}>{title}</h5>
          <h6 className={styles.subTitle}>{authors[0]}</h6>

          <Avatar imgSrc={profilePic} username={username} />
          {username}

          <dl className={styles.dueDate}>
            <dt>Due Date:</dt>
            <dd>{formattedDueDate}</dd>
          </dl>

          {readingProgress !== 0 && (
            <div className={styles.progressContainer}>
              <small>
                Reading Progress: {currentPage} of {pageCount}
              </small>
              <ProgressBar
                value={readingProgress}
                className={styles.progress}
              />
            </div>
          )}
        </div>
      </div>

      <div className={styles.pageCountForm}>
        <div className={styles.label}>Update your current page</div>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onFocus={(e) => e.target.select()}
        />
        <Button varient="accept" onClick={handleSubmit}>
          Enter
        </Button>
      </div>
    </div>
  );
};

export default ChangePageCountForm;
