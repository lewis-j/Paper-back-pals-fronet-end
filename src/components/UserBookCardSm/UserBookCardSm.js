import React from "react";
import "./UserBookCardSm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Progress } from "reactstrap";

const UserBookCardSm = ({
  bookData: { coverImg, title, dueDate, lender, lenderImg, progressValue },
}) => {
  return (
    <div className="UserBookCardSm__container">
      <div className="UserBookCardSm__img">
        <img src={coverImg} alt={`${title} book cover`} />
      </div>
      <div className="UserBookCardSm__info">
        <img
          className="UserBookCardSm__avatar"
          src={lenderImg}
          alt={`${lender} avatar`}
        />
        <div className="UserBookCardSm__tracking">
          <div className="UserBookCardSm__duedate">{dueDate}</div>
          <Progress
            className="UserBookCardSm__progress"
            value={progressValue}
          />
        </div>
        <div className="UserBookCardSm__menu">
          <FontAwesomeIcon size="lg" icon={faEllipsisVertical} />
        </div>
      </div>
    </div>
  );
};

export default UserBookCardSm;
