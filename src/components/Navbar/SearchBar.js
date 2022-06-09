import React, { useState } from "react";
import { Input, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  searchBooks,
  setQuery,
  condition,
} from "../../redux/searchResults/searchResultsSlice";
import "./Navbar-custom.scss";

const SearchBar = ({ expandSize }) => {
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector((state) => state.searchResults.status);
  const isLoading = status === condition.LOADING;

  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(setQuery(searchInput));
    dispatch(searchBooks({ query: searchInput }));
    setSearchInput("");
    navigate("/search-results");
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
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
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
