import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import UserBookCardSm from "../../components/UserBookCardSm/UserBookCardSm";
import Placeholder from "../../components/UserBookCardSm/Placeholder";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/userBooksSlice";
import "./Library.scss";
import { getProgressInPercent } from "../../utilities/bookUtilities";

const Library = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.userBooks);

  console.log("error", error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  const RenderUserBooksSection = () => {
    if (!books) return <></>;

    if (status === "loading")
      return [...Array(12).keys()].map((i) => (
        <Col sm="4" md="3" xl="2" className="placeholder-glow mb-3" key={i}>
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
          <RenderUserBooksSection />
        </Row>
        <div>
          <h4 className="Library__subtitle">Checked in Books</h4>
        </div>
        <Row className="Library__section1">
          <RenderUserBooksSection />
        </Row>
      </Container>
    </>
  );
};

export default Library;
