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

import "./currentRead.scss";

import { getProgressInPercent } from "../../utilities/bookUtilities";

const CurrentRead = ({
  currentBook: {
    title,
    author,
    coverImg,
    dueDate,
    lender,
    lenderImg,
    currentPage,
    pageCount,
  },
}) => {
  const readingProgress = getProgressInPercent(currentPage, pageCount);

  return (
    <Card className="my-3 mx-auto" style={{ maxWidth: "540px" }}>
      <Row className="g-0">
        <Col md="3">
          <img src={coverImg} className="img-fluid rounded-start" alt="..." />
        </Col>
        <Col md="9">
          <CardBody>
            <CardTitle tag="h5">{title}</CardTitle>
            <CardTitle tag="h6">{author}</CardTitle>

            <img src={lenderImg} alt="profile" width="40px" />
            {lender}
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
                className="CurrentRead__progress"
              />
            </CardFooter>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

export default CurrentRead;
