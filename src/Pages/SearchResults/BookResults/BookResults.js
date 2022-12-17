import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { SearchCard } from "../../../features/search";
import { processBookResults } from "../../../utilities/bookUtilities";
import SearchPagination from "../SearchPagination";
import { addBook } from "../../../features/library";
import { StatusHandler } from "../StatusHandler";
import { shortenString } from "../../../utilities/stringUtil";
const BookResults = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser.currentUser);
  const { bookResults, query: queryTitle } = useSelector(
    (state) => state.searchResults
  );

  const titleRef = useRef(null);

  const scrollToTop = () => {
    titleRef.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  };

  const addBookToLibrary = (bookDto) => () => {
    dispatch(addBook({ id: user._id, bookDto }));
  };

  const renderCards = () =>
    bookResults.length > currentPage
      ? bookResults[currentPage].map(({ id, volumeInfo }, i) => {
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

          if (cardData) {
            return (
              <Col xs="12" sm="6" md="4" xl="3" key={`${id}-${i}`}>
                <SearchCard
                  cardData={cardData}
                  addBook={addBookToLibrary(bookDto)}
                />
              </Col>
            );
          }
          return null;
        })
      : [];
  return (
    <StatusHandler results={bookResults}>
      <Container fluid="md" className="main-container">
        <h3 ref={titleRef} className="my-3">
          Results for: {queryTitle}
        </h3>
        <Row className="row-margin">{renderCards()}</Row>
        <Row>
          <SearchPagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            scroll={scrollToTop}
          />
        </Row>
      </Container>
    </StatusHandler>
  );
};

export default BookResults;
