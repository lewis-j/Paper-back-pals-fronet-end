import React, { useState } from "react";
import { Input, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Navbar-custom.scss";

const SearchBar = ({ expandSize, searchBooks, isLoading }) => {
  const [query, setQuery] = useState("");

  const onSubmitForm = (e) => {
    e.preventDefault();
    searchBooks(query);

    setQuery("");
  };

  return (
    <div className={`d-none d-${expandSize}-block`}>
      <Form
        onSubmit={onSubmitForm}
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
        <button
          className="border-0 border-end rounded-pill bg-white "
          disabled={isLoading}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>
      </Form>
    </div>
  );
};

export default SearchBar;
