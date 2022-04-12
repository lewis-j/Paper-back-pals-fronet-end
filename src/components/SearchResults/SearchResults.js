import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Button, Spinner } from "reactstrap";
import "./searchResults.scss";
import { useDispatch } from "react-redux";
import { bookActionCreators } from "../../redux/actions/actionCreator";

const { addBook } = bookActionCreators;

const shortenString = (string, length) => {
  const tempString = string.substring(0, 50);
  const lastIndex = tempString.lastIndexOf(" ");
  return tempString.substring(0, lastIndex) + "...";
};

const SearchResults = ({ bookResults, isLoading = "false" }) => {
  console.log("book results", bookResults);

  const dispatch = useDispatch();

  const renderedCards = bookResults.map((item, i) => {
    const bookInfo = item.volumeInfo;
    const { title, description = "", authors } = bookInfo;
    let thumbnail,
      result = "";
    if ((result = bookInfo?.imageLinks?.thumbnail)) {
      thumbnail = result;

      console.log("thumbs:", thumbnail);
    } else {
      return null;
    }
    let shortTitle = title;

    console.log("title lenths", i, shortTitle.length);
    if (shortTitle.length > 50) {
      shortTitle = shortenString(shortTitle, 50);
    }

    return (
      <Col xs="12" sm="6" md="4" xl="3" key={item.id}>
        <div className="box">
          <div className="box-container">
            <div className="box-title">
              {" "}
              <h6>{shortTitle}</h6>
              <small className="box-subtitle">{authors[0]}</small>
            </div>

            <img className="box-img" src={thumbnail} alt={shortTitle} />
            <div className="box-button">
              <Button outline color="secondary" className="rounded-circle me-2">
                <FontAwesomeIcon icon={faUser} />
              </Button>
              <Button
                outline
                color="secondary"
                className="rounded-circle"
                onClick={() => {
                  dispatch(addBook(bookInfo));
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </div>
        </div>
      </Col>
    );
  });

  return (
    <Container fluid="md" className="main-container">
      {!isLoading ? (
        <Row className="row-margin">{renderedCards}</Row>
      ) : (
        <Spinner type="grow" className="search-spinner"></Spinner>
      )}
    </Container>
  );
};

export default SearchResults;
