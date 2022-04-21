import React from "react";
import { Input, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";

const SearchBar = ({ expandSize, query, setQuery, searchBooks }) => {
  return (
    <div className={`d-none d-${expandSize}-block`}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          searchBooks(query);
          setQuery("");
        }}
        className="d-flex bg-white rounded-pill SearchBar__form__border"
      >
        <Input
          name="search"
          placeholder="Search books"
          type="search"
          className="border-0 border-start rounded-pill"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button className="border-0 border-end rounded-pill bg-white">
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
