import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  ToastHeader,
  CardFooter,
} from "reactstrap";
import "./searchResults.scss";
import { connect } from "react-redux";
import actions from "../../redux/actions";

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (bookData) => {
      dispatch({ type: actions.ADD_BOOK_LIBRARY, data: bookData });
    },
  };
};

const SearchResults = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ bookResults = [], addBook }) => {
  console.log("book results", bookResults);
  const renderedCards = bookResults.map((item, i) => {
    let thumbnail,
      result = "";
    if (item?.volumeInfo?.imageLinks?.thumbnail) {
      thumbnail = item.volumeInfo.imageLinks.thumbnail;
      console.log("thumbs:", thumbnail);
    }
    return (
      <Col xs="12" sm="6" md="4" lg="3" key={item.id}>
        <Card className="card-border">
          <CardImg style={{ height: "20em" }} src={thumbnail} />
          <CardFooter>
            <FontAwesomeIcon
              className="btn btn-outline-dark"
              type="button"
              icon={faPlus}
              onClick={(e) => {
                console.log("icon clicked");
                addBook(item.volumeInfo);
              }}
            />
          </CardFooter>
        </Card>
      </Col>
    );
  });

  return (
    <Container>
      <div>
        <Row>{renderedCards}</Row>
      </div>
    </Container>
  );
});

export default SearchResults;
