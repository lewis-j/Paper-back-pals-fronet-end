// import "./App.css";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";
import Home from "./components/Home";
import axios from "axios";
import { Spinner } from "reactstrap";
import { useState } from "react";
import store from "./redux/store";
import * as ReactRedux from "react-redux";
import "./style/main.scss";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookResults, setBookResults] = useState([]);

  let navigate = useNavigate();

  const searchBooks = (query) => {
    navigate("/search");

    console.log("searching for books!", query);
    setIsLoading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${12}`
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
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/search"
            element={
              <SearchResults bookResults={bookResults} isLoading={isLoading} />
            }
          />
        </Routes>
      </div>
    </ReactRedux.Provider>
  );
}

export default App;
