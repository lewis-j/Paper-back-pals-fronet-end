// import "./App.css";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";
import Home from "./components/Home";
import axios from "axios";
import { useState } from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./style/main.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ResetPassword from "./components/Authentication/ResetPassword";

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
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route
            path="/search"
            element={
              <>
                <Navbar searchBooks={searchBooks} />
                <SearchResults
                  bookResults={bookResults}
                  isLoading={isLoading}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
