import React, { useEffect, cloneElement } from "react";
import { Col, Container, Row } from "reactstrap";
import { UserBookCardSm } from "../../components/UserBookCardSm";
import Placeholder from "../../components/Placeholders/PlaceholderCardSm";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/userBooksSlice";
import "./Library.scss";
import { getProgressInPercent } from "../../utilities/bookUtilities";
import BookCard from "../../components/BookCard";

const Library = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.userBooks);

  console.log("error", error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  const checkedOutBooks = books.filter((book) => book.status === "CHECKED_OUT");
  const checkedInBooks = books.filter((book) => book.status !== "CHECKED_OUT");

  const renderCheckedOutSection = (checkedOutBooks, status) => {
    const books = checkedOutBooks;
    if (!books) return <></>;

    if (status === "loading")
      return [...Array(12).keys()].map((i) => (
        <Col sm="4" md="3" xl="2" key={i} className="mb-3">
          <Placeholder />
        </Col>
      ));
    return books.map((bookData, i) => {
      const progressValue = getProgressInPercent(
        bookData.currentPage,
        bookData.pageCount
      );

      return (
        <Col sm="4" md="3" xl="2" className="mb-3" key={i}>
          <UserBookCardSm bookData={{ ...bookData, progressValue }} />
        </Col>
      );
    });
  };

  const renderCheckedInSection = (checkedInBooks, status) => {
    const books = checkedInBooks;
    if (!books) return <></>;

    if (status === "loading")
      return [...Array(12).keys()].map((i) => (
        <Col sm="4" md="3" xl="2" key={i} className="mb-3">
          <Placeholder />
        </Col>
      ));
    return books.map((bookData, i) => {
      const { coverImg, title, status } = bookData;

      return (
        <Col sm="4" md="3" xl="2" className="mb-3" key={i}>
          <BookCard coverImg={coverImg} title={title} status={status} />
        </Col>
      );
    });
  };

  console.log("books from slice", books);

  return (
    <>
      <Container>
        <div className="Library__title__container">
          <h1 className="Library__title">Your Library</h1>
        </div>
        <div>
          <h4 className="Library__subtitle">Checked Out Books</h4>
        </div>
        <Row className="Library__section1">
          {renderCheckedOutSection(checkedOutBooks, status)}
        </Row>
        <div>
          <h4 className="Library__subtitle">Checked in Books</h4>
        </div>
        <Row className="Library__section1">
          {renderCheckedInSection(checkedInBooks, status)}
        </Row>
      </Container>
    </>
  );
};

export default Library;
