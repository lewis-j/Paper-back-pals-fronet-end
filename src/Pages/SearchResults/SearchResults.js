import React from "react";
import { Container, Row, Spinner } from "reactstrap";
import "./searchResults.scss";
// import { useDispatch } from "react-redux";
// import { bookActionCreators } from "../../redux/actions/actionCreator";
import SearchCard from "../../components/SearchCard";
import { processBookResults } from "../../utilities/bookUtilities";

// const { addBook } = bookActionCreators;

const SearchResults = ({ bookResults, isLoading = "false", queryTitle }) => {
  // const dispatch = useDispatch();

  const renderCards = bookResults.map((item, i) => {
    const cardData = processBookResults(item);
    if (cardData) {
      return <SearchCard key={item.id} cardData={cardData} />;
    }
    return null;
  });

  console.log("query title", queryTitle);

  return (
    <Container fluid="md" className="main-container">
      <h3 className="my-3">Results for: {queryTitle}</h3>
      {!isLoading ? (
        <Row className="row-margin">{renderCards}</Row>
      ) : (
        <Spinner type="grow" className="search-spinner"></Spinner>
      )}
    </Container>
  );
};

export default SearchResults;
