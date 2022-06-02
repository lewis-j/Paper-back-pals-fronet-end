import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchUser } from "./redux/user";
import * as condition from "./redux/status";
import { LandingPage, SearchResults, Dashboard, Library } from "./Pages";
import {
  Login,
  Signup,
  ResetPassword,
  PrivateRoute,
  Footer,
  MainNav,
  UserBookResults,
} from "./components";
import "./style/main.scss";
import { FriendsPage } from "./Pages/Friends";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [bookResults, setBookResults] = useState([]);
  const [searchQueryTitle, setSearchQueryTitle] = useState("");

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const user = useSelector((state) => state.user);

  console.log("running app");

  useEffect(() => {
    if (userStatus === condition.IDLE) {
      console.log("running fetch user");
      dispatch(fetchUser());
    }
  }, []);

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
    <div className="App">
      <div className="App__container">
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
                <MainNav searchBooks={fetchBooks} isLoading={isLoading} />
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
            <Route path="friends" element={<FriendsPage />}>
              <Route path="books: user_id" element={<UserBookResults />} />
              {/* <Route path="messaging: user_id" element={<UserMessaging />} />
              <Route path="profile: user_id" element={<UserProfile />}/> */}
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
