import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/userBook/userBooksSlice";
import "./Library.scss";
import { getProgressInPercent } from "../../utilities/bookUtilities";
import { BookCard, UserCardSm, Placeholder } from "../../components";
import { Button } from "reactstrap";
import * as condition from "../../redux/status";

const Library = () => {
  const dispatch = useDispatch();
  const {
    books: { borrowed, owned: books },
    status: fetchStatus,
    error,
  } = useSelector((state) => state.userBooks);
  const { _id: id } = useSelector((state) => state.user.currentUser);

  const checkedInState = useState(12);
  const checkedOutState = useState(12);
  const loadingInSection = useState(false);
  const loadingOutSection = useState(false);
 

  useEffect(() => {
    if (fetchStatus === condition.IDLE) {
      dispatch(fetchBooks({ id }));
    }
  }, [dispatch, fetchStatus]);

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
        <UserCardSm
          bookData={{ ...bookData, progressValue }}
          menuList={menuList}
        />
      </Col>
    );
  };

  const mapCheckedInBooks = ({ book, status }, i) => {
  
    const { coverImg, title } = book;

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

  const renderSection = (section, fetchStatus, state, loadingSectionState) => {
    if (!section) return <div>Currently no books</div>;

    if (fetchStatus === condition.LOADING)
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
            fetchStatus,
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
            fetchStatus,
            checkedInState,
            loadingInSection
          )}
        </Row>
      </Container>
    </>
  );
};

export default Library;
