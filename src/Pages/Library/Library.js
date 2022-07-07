import React, { useEffect, useState } from "react";
import { IconBookOff } from "@tabler/icons";
import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProgressInPercent } from "../../utilities/bookUtilities";
import {
  BookCard,
  UserCardSm,
  Placeholder,
  Button,
  NoContent,
} from "../../components";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import * as condition from "../../redux/status";
import styles from "./Library.module.scss";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    books: { borrowed, owned: books },
    status: fetchStatus,
    error,
  } = useSelector((state) => state.userBooks);

  console.log("books", books);

  const checkedInState = useState(12);
  const checkedOutState = useState(12);
  const loadingInSection = useState(false);
  const loadingOutSection = useState(false);

  useEffect(() => {
    if (fetchStatus === condition.IDLE) {
      console.log("fetching books");
      // dispatch(fetchBooks());
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
    if (section.length === 0)
      return (
        <NoContent text="No Books Yet!" icon={IconBookOff}>
          <div>Check Notifications for Book request</div>
          <Button
            varient="add"
            icon={faBell}
            onClick={() => navigate("/notifications")}
          >
            Notifications
          </Button>
        </NoContent>
      );

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

  const checkedOutBooksSection = renderSection(
    checkedOutBooks,
    fetchStatus,
    checkedOutState,
    loadingOutSection
  );

  console.log(
    "checkedOutBooksSection.length === 0 ::: ",
    checkedOutBooksSection
  );
  return (
    <>
      <Container>
        <div className={styles.title}>
          <h1>Your Library</h1>
        </div>
        <div>
          <h4 className={styles.subtitle}>Checked in Books</h4>
        </div>
        <Row className={styles.section}>
          {renderSection(
            checkedInBooks,
            fetchStatus,
            checkedInState,
            loadingInSection
          )}
        </Row>
        <div>
          <h4 className={styles.subtitle}>Checked Out Books</h4>
        </div>
        <Row className={styles.section}>{checkedOutBooksSection}</Row>
      </Container>
    </>
  );
};

export default Library;
