import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./BookCard.scss";

const BookCard = ({ coverImg, title, status }) => {
  console.log("pending", status);
  return (
    <div className="BookCard__container">
      {status === "PENDING" && (
        <FontAwesomeIcon
          className="BookCard__icon"
          size="xl"
          icon={faCircleExclamation}
        />
      )}
      <img className="BookCard__img" src={coverImg} alt={title} />
    </div>
  );
};

export default BookCard;
