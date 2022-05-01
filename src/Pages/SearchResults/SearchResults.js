import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "reactstrap";
import "./searchResults.scss";
// import { useDispatch } from "react-redux";
// import { bookActionCreators } from "../../redux/actions/actionCreator";
import SearchCard from "../../components/SearchCard";
import { processBookResults } from "../../utilities/bookUtilities";
import SearchPagination from "./SearchPagination";

// const { addBook } = bookActionCreators;

const SearchResults = ({
  bookResults,
  isLoading = "false",
  queryTitle,
  fetchBooks,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  // useEffect(() => {
  //   const calc = Math.floor(currentPage / 10) * 120;
  //   if (calc === bookResults.length) {
  //     console.log("rendermore results");
  //   }
  // }, [currentPage]);

  const firstIdx = currentPage * 12;
  const lastIdx = firstIdx + 12;

  const pageOfBookResults = bookResults.slice(firstIdx, lastIdx);

  const renderCards = pageOfBookResults.map((item, i) => {
    const cardData = processBookResults(item);
    if (cardData) {
      return <SearchCard key={`${item.id}-${i}`} cardData={cardData} />;
    }
    return null;
  });

  if (renderCards.length === 0) return null;
  return (
    <Container fluid="md" className="main-container">
      <h3 className="my-3">Results for: {queryTitle}</h3>

      {!isLoading ? (
        <>
          <Row className="row-margin">{renderCards}</Row>
          <Row>
            <SearchPagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              fetchMoreBooks={fetchBooks}
              queryTitle={queryTitle}
            />
          </Row>
        </>
      ) : (
        <Spinner type="grow" className="search-spinner"></Spinner>
      )}
    </Container>
  );
};

export default SearchResults;
