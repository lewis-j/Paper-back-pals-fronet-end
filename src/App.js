import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchUser } from "./redux/authUser/authUserSlice";
import * as condition from "./redux/status";
import {
  LandingPage,
  BookResults,
  DashboardPage,
  Library,
  UserResults,
  NotificationsPage,
  BorrowedPage,
  FriendsPage,
  FriendsLibrary,
  FriendsProfile,
} from "./Pages";
import {
  Login,
  Signup,
  ResetPassword,
  PrivateRoute,
  Footer,
  Navbar,
} from "./components";
import styles from "./style/App.module.scss";
import { AllResults } from "./Pages/SearchResults/AllResults";

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.authUser.status);

  console.log("running app");

  useEffect(() => {
    if (userStatus === condition.IDLE) {
      console.log("running fetch user");
      dispatch(fetchUser());
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
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
                <Navbar />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="results" element={<AllResults />} />
            <Route path="book-results" element={<BookResults />} />
            <Route path="user-results" element={<UserResults />} />
            <Route path="library" element={<Library />} />
            <Route path="borrowed" element={<BorrowedPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="friends" element={<FriendsPage />}>
              <Route path="library" element={<FriendsLibrary />} />
              <Route path="profile" element={<FriendsProfile />} />
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
