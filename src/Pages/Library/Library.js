import React, { useEffect, cloneElement, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { UserBookCardSm } from "../../components/UserBookCardSm";
import Placeholder from "../../components/Placeholders/PlaceholderCardSm";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/userBooksSlice";
import "./Library.scss";
import { getProgressInPercent } from "../../utilities/bookUtilities";
import BookCard from "../../components/BookCard";
import { Button } from "reactstrap";

const Library = () => {
  const dispatch = useDispatch();
  const { books, status, error } = useSelector((state) => state.userBooks);

  const checkedInState = useState(12);
  const checkedOutState = useState(12);
  const loadingInSection = useState(false);
  const loadingOutSection = useState(false);

  console.log("error", error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);

  const menuList = [
    {
      text: "message friend",
      clickHandler: (i) => {
        console.log("itemclicked: ", i);
      },
    },
  ];

  const mapCheckedOutBooks = (bookData, i) => {
    const progressValue = getProgressInPercent(
      bookData.currentPage,
      bookData.pageCount
    );
    return (
      <Col sm="4" md="3" xl="2" className="mb-3" key={i}>
        <UserBookCardSm
          bookData={{ ...bookData, progressValue }}
          menuList={menuList}
        />
      </Col>
    );
  };

  const mapCheckedInBooks = (bookData, i) => {
    const { coverImg, title, status } = bookData;

    return (
      <Col sm="4" md="3" xl="2" className="mb-3" key={i}>
        <BookCard coverImg={coverImg} title={title} status={status} />
      </Col>
    );
  };

  const checkedOutBooks = books
    .filter((book) => book.status === "CHECKED_OUT")
    .map(mapCheckedOutBooks);
  const checkedInBooks = books
    .filter((book) => book.status !== "CHECKED_OUT")
    .map(mapCheckedInBooks);

  const renderSection = (section, status, state, loadingSectionState) => {
    if (!section) return <div>Currently no books</div>;

    if (status === "loading")
      return [...Array(12).keys()].map((i) => (
        <Col sm="4" md="3" xl="2" key={i} className="mb-3">
          <Placeholder />
        </Col>
      ));

    const [renderBookCount, setRenderBookCount] = state;
    const [loadingSection, setLoadingSection] = loadingSectionState;
    const renderBooks = section.slice(0, renderBookCount);
    const loadingCount = section.slice(
      renderBookCount,
      renderBookCount + 12
    ).length;

    return (
      <>
        {renderBooks}
        {loadingSection &&
          [...Array(loadingCount).keys()].map((i) => (
            <Col sm="4" md="3" xl="2" key={i} className="mb-3">
              <Placeholder />
            </Col>
          ))}
        {section.length > renderBookCount && (
          <Button
            onClick={() => {
              setLoadingSection(true);
              setTimeout(() => {
                setLoadingSection(false);
                setRenderBookCount((previousState) => previousState + 12);
              }, 600);
            }}
          >
            Show more
          </Button>
        )}
      </>
    );
  };

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
          {renderSection(
            checkedOutBooks,
            status,
            checkedOutState,
            loadingOutSection
          )}
        </Row>
        <div>
          <h4 className="Library__subtitle">Checked in Books</h4>
        </div>
        <Row className="Library__section1">
          {renderSection(
            checkedInBooks,
            status,
            checkedInState,
            loadingInSection
          )}
        </Row>
      </Container>
    </>
  );
};

export default Library;
