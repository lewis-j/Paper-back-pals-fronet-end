import React from "react";
import "./UserBookCardSm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import {
  Progress,
  UncontrolledPopover,
  PopoverBody,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const UserBookCardSm = ({
  bookData: { coverImg, title, dueDate, lender, lenderImg, progressValue },
  menuList = [],
}) => {
  const renderListItems = (meneItems) =>
    meneItems.map(({ text, clickHandler }, i) => (
      <ListGroupItem
        key={i}
        action
        tag="button"
        className="p-1"
        onClick={() => clickHandler(i)}
      >
        {text}
      </ListGroupItem>
    ));
  return (
    <>
      <div className="UserBookCardSm__container">
        <div className="UserBookCardSm__img">
          <img
            src={coverImg}
            alt={`${title} book cover`}
            referrerPolicy="no-referrer"
          />
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
            <FontAwesomeIcon
              size="lg"
              id="PopoverLegacy"
              type="button"
              icon={faEllipsisVertical}
            />
          </div>
        </div>
      </div>
      <UncontrolledPopover
        placement="top"
        target="PopoverLegacy"
        trigger="legacy"
      >
        <PopoverBody>
          <ListGroup>{renderListItems(menuList)}</ListGroup>
        </PopoverBody>
      </UncontrolledPopover>
    </>
  );
};

export default UserBookCardSm;
