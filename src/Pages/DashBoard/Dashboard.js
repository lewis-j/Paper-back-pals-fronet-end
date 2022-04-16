import React from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardTitle,
  CardText,
  CardFooter,
  Container,
  Progress,
} from "reactstrap";

const bookData = {
  imgUrl:
    "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  bookTitle: "GIRL WITH THE DRAGON TATTOO",
  bookSubtitle: "Stieg Larson",
  lender: "Lindsey Jackson",
  lenderImgUrl:
    "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
};

const ProfileCard = () => {
  return (
    <Card className="my-3 mx-auto" style={{ maxWidth: "540px" }}>
      <Row className="g-0">
        <Col md="3">
          <img
            src={bookData.imgUrl}
            className="img-fluid rounded-start"
            alt="..."
          />
        </Col>
        <Col md="9">
          <CardBody>
            <CardTitle tag="h5">{bookData.bookTitle}</CardTitle>
            <CardTitle tag="h6">{bookData.bookSubtitle}</CardTitle>

            <dl className="row">
              <dt className="col-3">Lender:</dt>
              <dd className="col-9">
                <img src={bookData.lenderImgUrl} alt="profile" width="40" />
                {bookData.lender}
              </dd>
            </dl>

            <CardFooter>
              <small className="text-muted">Reading Progress</small>
              <Progress value={50} />
            </CardFooter>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div>
      <Container>
        <h3 style={{ maxWidth: "540px" }} className="mx-auto my-3">
          Currrent Read
        </h3>
        <ProfileCard />
      </Container>
    </div>
  );
};

export default Dashboard;
