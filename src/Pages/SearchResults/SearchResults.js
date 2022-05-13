import React, { useState } from "react";
import { Container, Row, Spinner } from "reactstrap";
import { SearchCard } from "../../components";
import { processBookResults } from "../../utilities/bookUtilities";
import SearchPagination from "./SearchPagination";
import "./searchResults.scss";

const SearchResults = ({ bookResults, isLoading = "false", queryTitle }) => {
  const [currentPage, setCurrentPage] = useState(0);

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
