// import "./App.css";
import Navbar from "./components/Navbar";
import SearchResults from "./Pages/SearchResults";
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
import Dashboard from "./Pages/DashBoard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookResults, setBookResults] = useState([]);
  const [searchQueryTitle, setSearchQueryTitle] = useState("");

  let navigate = useNavigate();

  const searchBooks = (query) => {
    navigate("/search-results");

    setSearchQueryTitle(query);
    setIsLoading(true);
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${0}&maxResults=${12}`
      )
      .then((res) => {
        setIsLoading(false);
        setBookResults(res.data.items);
        console.log(res.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="home" element={<Home />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navbar searchBooks={searchBooks} />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="search-results"
              element={
                <SearchResults
                  bookResults={bookResults}
                  isLoading={isLoading}
                  queryTitle={searchQueryTitle}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
