import React from "react";
import { Col, Container, Row } from "reactstrap";
import UserBookCardSm from "../../components/UserBookCardSm";
import "./Library.scss";
import { getProgressInPercent } from "../../utilities/bookUtilities";

const userBooks = [
  {
    coverImg:
      "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "GIRL WITH THE DRAGON TATTOO",
    author: "Stieg Larson",
    dueDate: "3/22/2022",
    lender: "Lindsey Jackson",
    lenderId: "1",
    lenderImg:
      "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
    currentPage: 304,
    pageCount: 480,
  },
  {
    coverImg:
      "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "GIRL WITH THE DRAGON TATTOO",
    author: "Stieg Larson",
    dueDate: "3/22/2022",
    lender: "Lindsey Jackson",
    lenderId: "1",
    lenderImg:
      "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
    currentPage: 304,
    pageCount: 480,
  },
  {
    coverImg:
      "http://books.google.com/books/content?id=lMM4jgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    title: "Harry Potter",
    author: "JK Rolling",
    dueDate: "3/22/2022",
    lender: "Lindsey Jackson",
    lenderId: "1",
    lenderImg:
      "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
    currentPage: 304,
    pageCount: 480,
  },
  {
    coverImg:
      "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "GIRL WITH THE DRAGON TATTOO",
    author: "Stieg Larson",
    dueDate: "3/22/2022",
    lender: "Lindsey Jackson",
    lenderId: "1",
    lenderImg:
      "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
    currentPage: 304,
    pageCount: 480,
  },
];

const Library = () => {
  const renderBooks = userBooks.map((bookData) => {
    bookData.progressValue = getProgressInPercent(
      bookData.currentPage,
      bookData.pageCount
    );

    return (
      <Col>
        <UserBookCardSm bookData={bookData} />
      </Col>
    );
  });

  return (
    <>
      <Container>
        <div>
          <h1>Your Library</h1>
        </div>
        <div>
          <h4>Checked Out Books</h4>
        </div>
        <Row>{renderBooks}</Row>
      </Container>
    </>
  );
};

export default Library;
