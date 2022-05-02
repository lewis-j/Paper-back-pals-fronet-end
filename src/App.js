// import "./App.css";
import Navbar from "./components/Navbar";
import SearchResults from "./Pages/SearchResults";
import LandingPage from "./components/LandingPage";
import axios from "axios";
import { useState } from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./style/main.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import ResetPassword from "./components/Authentication/ResetPassword";
import Dashboard from "./Pages/DashBoard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Library from "./Pages/Library";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookResults, setBookResults] = useState([]);
  const [searchQueryTitle, setSearchQueryTitle] = useState("");

  let navigate = useNavigate();

  const fetchBooks = async (query, startIndex = 0) => {
    setSearchQueryTitle(query);
    setIsLoading(true);
    if (startIndex === 0) {
      setBookResults(() => []);
      navigate("/search-results");
    }
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${40}`
      );

      setIsLoading(false);
      setBookResults((prevResults) => [...prevResults, ...res.data.items]);
      const res2 = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${
          startIndex + 40
        }&maxResults=${40}`
      );

      const res3 = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${
          startIndex + 80
        }&maxResults=${40}`
      );

      console.log("response from search:", [
        ...res.data.items,
        ...res2.data.items,
        ...res3.data.items,
      ]);

      setBookResults((prevResults) => [
        ...prevResults,
        ...res2.data.items,
        ...res3.data.items,
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="landing-page" element={<LandingPage />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Navbar searchBooks={fetchBooks} isLoading={isLoading} />
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
                  fetchBooks={fetchBooks}
                />
              }
            />
            <Route path="library" element={<Library />} />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
