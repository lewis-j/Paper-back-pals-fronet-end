import React from "react";
import { InputGroup, Input, InputGroupText, FormGroup, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBook,
  faBookmark,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";

const SearchBar = ({ expandSize }) => {
  return (
    <div className={`d-none d-${expandSize}-block`}>
      <Form className="d-flex bg-white rounded-pill SearchBar-form-border">
        <Input
          name="search"
          placeholder="Search books"
          type="search"
          className="border-0 border-start rounded-pill"
        />
        <button className="border-0 border-end rounded-pill bg-white">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
