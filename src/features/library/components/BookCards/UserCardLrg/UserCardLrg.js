import React from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardTitle,
  CardFooter,
  Progress,
} from "reactstrap";

import "./UserCardLrg.scss";

import { getProgressInPercent } from "../../../../../utilities/bookUtilities";
import { dayMonthFormat } from "../../../../../utilities/timeUtil";

const UserCardLrg = ({ _id: userCard_id, book, icon, user }) => {
  const {
    coverImg,
    author,
    title,
    dueDate: _dueDate,
    currentPage = 30,
    pageCount = 224,
  } = book;
  const dueDate = dayMonthFormat(_dueDate);
  const { sender_id, username, profilePic } = user;

  const readingProgress = getProgressInPercent(currentPage, pageCount);

  return (
    <Card
      className="my-3 mx-auto UserBookCard__container"
      style={{ maxWidth: "540px" }}
    >
      <Row className="g-0">
        <Col md="3">
          <img
            src={coverImg}
            className="img-fluid rounded-start"
            alt={title}
            referrerpolicy="no-referrer"
          />
        </Col>
        <Col md="9">
          <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
            <CardTitle tag="h6">{author}</CardTitle>

            <img src={profilePic} alt="profile" width="40px" />
            {username}
            <dl className="row">
              <dt className="col-3">Due Date:</dt>
              <dd className="col-9">{dueDate}</dd>
            </dl>

            <CardFooter>
              <small className="text-muted">
                Reading Progress: {currentPage} of {pageCount}
              </small>
              <Progress
                value={readingProgress}
                className="UserBookCard__progress"
              />
            </CardFooter>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

export default UserCardLrg;
