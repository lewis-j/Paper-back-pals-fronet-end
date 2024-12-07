import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { UserRequestCard, SearchCard } from "../../../features/search";
import { processBookResults } from "../../../utilities/bookUtilities";
import { addBook } from "../../../features/library";
import { StatusHandler } from "../StatusHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./AllResults.module.scss";
import * as asyncStatus from "../../../data/asyncStatus";
import { useState } from "react";
import SearchPagination from "../SearchPagination";
import { useRef } from "react";
import { shortenString } from "../../../utilities/stringUtil";
import { useAddBookModal } from "../../../features/search/hooks/useAddBookModal";

const AllResults = () => {
  const {
    userResults,
    bookResults,
    query: queryTitle,
  } = useSelector((state) => state.searchResults);
  const { currentUser: user } = useSelector((state) => state.authUser);
  const {
    status: addBookStatus,
    books: { owned: ownedBooks },
  } = useSelector((state) => state.userBooks);
  const owned = ownedBooks ? ownedBooks : [];
  const userBookGoogle_ids = owned.map(({ book: { google_id } }) => google_id);
  const checkIsOwned = (google_id) => {
    return userBookGoogle_ids.includes(google_id);
  };

  const [currentPage, setPage] = useState(0);
  const [isHidden, setHidden] = useState({ users: false, books: false });
  const titleRef = useRef(null);

  const isLoading = addBookStatus === asyncStatus.LOADING;

  const { openModal, renderModal } = useAddBookModal(user._id);
  const handleOpenModal = (bookDto) => () => {
    openModal(bookDto);
  };

  const scrollToTop = () => {
    titleRef.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  };

  const renderUserCards = () => {
    return userResults.results.length > currentPage
      ? userResults.results[currentPage].map((user, i) => {
          const { _id, username, profilePic } = user;
          return (
            <Col xs="12" sm="6" md="4" xl="3" key={`${_id}-${i}`}>
              <UserRequestCard
                _id={_id}
                username={username}
                profilePic={profilePic}
              />
            </Col>
          );
        })
      : [];
  };

  const renderBookCards = () =>
    bookResults.results.length > currentPage
      ? bookResults.results[currentPage].map(({ id, volumeInfo }, i) => {
          const { title, authors, thumbnail, description, pageCount } =
            processBookResults(volumeInfo);
          const cardData = {
            title: shortenString(title, 50),
            author: shortenString(authors[0], 20),
            thumbnail,
          };
          const bookDto = {
            google_id: id,
            title,
            authors,
            coverImg: thumbnail,
            description,
            pageCount,
          };
          const inLibrary = checkIsOwned(bookDto.google_id);

          if (cardData) {
            return (
              <Col xs="12" sm="6" md="4" xl="3" key={`${id}-${i}`}>
                <SearchCard
                  isLoading={isLoading}
                  isInLibrary={inLibrary}
                  cardData={cardData}
                  onClick={handleOpenModal(bookDto)}
                />
              </Col>
            );
          }
          return null;
        })
      : [];

  const Result = ({ type, queryTitle, navOption, children, navHandler }) => {
    return (
      <>
        <h3 className="my-3">
          Results in {type}s for: {queryTitle}
        </h3>
        <Row className="row-margin">{children}</Row>
        {navOption && (
          <div className={styles.nav_btn_wrapper}>
            <button className={styles.nav_btn} onClick={() => navHandler()}>
              See more {type} results for {queryTitle}{" "}
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
          </div>
        )}
      </>
    );
  };

  const showUserResults = userResults.total > 0 && !isHidden.users;
  const showBookResults = bookResults.total > 0 && !isHidden.books;
  const isOneTypeResult = showUserResults ^ showBookResults;

  return (
    <StatusHandler results={[...bookResults.results, ...userResults.results]}>
      <Container fluid="md" className="main-container">
        <div ref={titleRef} />
        {showUserResults && (
          <Result
            type="user"
            queryTitle={queryTitle}
            navOption={!isOneTypeResult}
            navHandler={() => setHidden({ ...isHidden, books: true })}
          >
            {renderUserCards()}
          </Result>
        )}
        {showBookResults > 0 && (
          <Result
            type="book"
            queryTitle={queryTitle}
            navOption={!isOneTypeResult}
            navHandler={() => setHidden({ ...isHidden, users: true })}
          >
            {renderBookCards()}
          </Result>
        )}
        <Row>
          {isOneTypeResult && (
            <SearchPagination
              setCurrentPage={setPage}
              currentPage={currentPage}
              scroll={scrollToTop}
            />
          )}
        </Row>
      </Container>
      {renderModal()}
    </StatusHandler>
  );
};

export default AllResults;
