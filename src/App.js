import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";
import axios from "axios";
import { Spinner } from "reactstrap";
import { useState } from "react";
import store from "./redux/store";
import * as ReactRedux from "react-redux";
import "./style/main.scss";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookResults, setBookResults] = useState([]);

  const searchBooks = (query) => {
    console.log("searching for books!", query);
    setIsLoading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${10}`
      )
      .then((res) => {
        setIsLoading(false);
        console.log("data", res.data);
        setBookResults(res.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ReactRedux.Provider store={store}>
      <div className="App">
        <Navbar searchBooks={searchBooks} />
        {isLoading ? (
          <Spinner color="dark" type="grow" className="search-spinner" />
        ) : (
          <SearchResults bookResults={bookResults} />
        )}
      </div>
    </ReactRedux.Provider>
  );
}

export default App;
