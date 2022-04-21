import React from "react";
import { Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";

const SearchCard = ({ cardData: { title, author, thumbnail } }) => {
  return (
    <Col xs="12" sm="6" md="4" xl="3">
      <div className="box">
        <div className="box-container">
          <div className="box-title">
            {" "}
            <h6>{title}</h6>
            <small className="box-subtitle">{author}</small>
          </div>

          <img className="box-img" src={thumbnail} alt={title} />
          <div className="box-button">
            <Button outline color="secondary" className="rounded-circle me-2">
              <FontAwesomeIcon icon={faUser} />
            </Button>
            <Button
              outline
              color="secondary"
              className="rounded-circle"
              onClick={() => {
                // dispatch(addBook(bookInfo));
                console.log("add book to dispatch");
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default SearchCard;
