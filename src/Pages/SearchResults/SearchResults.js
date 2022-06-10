import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Spinner } from "reactstrap";
import { SearchCard } from "../../components";
import { processBookResults } from "../../utilities/bookUtilities";
import SearchPagination from "./SearchPagination";
import "./searchResults.scss";
import { condition } from "../../redux/searchResults/searchResultsSlice";
import { addBook } from "../../redux/userBook/userBooksSlice";

const SearchResults = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser.currentUser);
  const {
    status,
    bookResults,
    query: queryTitle,
    error,
  } = useSelector((state) => state.searchResults);

  const titleRef = useRef(null);

  const scrollToTop = () => {
    titleRef.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
  };

  const isLoading = status === condition.LOADING;
  const isError = status === condition.FAILED;

  const addBookToLibrary = (bookDto) => () => {
    dispatch(addBook({ id: user._id, bookDto }));
  };

  console.log("Book Results", bookResults.length, currentPage);

  const renderCards = () =>
    bookResults.length > currentPage
      ? bookResults[currentPage].map(({ id, volumeInfo }, i) => {
          const {
            title,
            shortTitle,
            authors,
            shortAuthor,
            thumbnail,
            description,
          } = processBookResults(volumeInfo);
          const cardData = {
            title: shortTitle,
            author: shortAuthor,
            thumbnail,
          };
          const bookDto = {
            google_id: id,
            title,
            authors,
            coverImg: thumbnail,
            description,
          };

          if (cardData) {
            return (
              <SearchCard
                key={`${id}-${i}`}
                cardData={cardData}
                addBook={addBookToLibrary(bookDto)}
              />
            );
          }
          return null;
        })
      : [];

  if (isLoading) {
    return <Spinner type="grow" className="search-spinner"></Spinner>;
  }

  if (isError) {
    return <div>Whoops! Something went wrong. Maybe try something else</div>;
  }
  return (
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
  );
};

export default SearchResults;
