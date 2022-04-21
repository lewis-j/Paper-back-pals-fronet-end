import React from "react";
import "./LentBookSm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Progress } from "reactstrap";

const LentBookSm = ({
  bookData: { coverImg, title, dueDate, lender, lenderImg, progressValue },
  index,
}) => {
  return (
    <div className="LentBookSm__container">
      <div className="LentBookSm__img">
        <img src={coverImg} alt={`${title} book cover`} />
      </div>
      <div className="LentBookSm__info">
        <img
          className="LentBookSm__avatar"
          src={lenderImg}
          alt={`${lender} avatar`}
        />
        <div className="LentBookSm__tracking">
          <div className="LentBookSm__duedate">{dueDate}</div>
          <Progress className="LentBookSm__progress" value={progressValue} />
        </div>
        <div className="LentBookSm__menu">
          <FontAwesomeIcon size="lg" icon={faEllipsisVertical} />
        </div>
      </div>
    </div>
  );
};

export default LentBookSm;
