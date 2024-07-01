import { useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchUser } from "./features/Authentication";
import * as condition from "./data/asyncStatus";
import {
  LandingPage,
  // BookResults,
  DashboardPage,
  // Library,
  // UserResults,
  // BorrowedPage,
  // FriendsPage,
  // FriendsLibrary,
  // FriendsProfile,
  // ProfilePage,
} from "./Pages";
import { Loading, PrivateRoute } from "./components";
import { Navbar, Footer } from "./layout";
import { Login, Signup, ResetPassword } from "./features/Authentication";
import styles from "./style/App.module.scss";
import { AllResults } from "./Pages/SearchResults/AllResults";
import homeBackground from "./Assets/imgs/home_background.jpg";
import { fetchNotifications } from "./features/Notifications";

const Library = lazy(() =>
  import("./Pages").then((module) => ({ default: module.Library }))
);
const BookResults = lazy(() =>
  import("./Pages").then((module) => ({ default: module.BookResults }))
);
const UserResults = lazy(() =>
  import("./Pages").then((module) => ({ default: module.UserResults }))
);
const BorrowedPage = lazy(() =>
  import("./Pages").then((module) => ({ default: module.BorrowedPage }))
);
const FriendsPage = lazy(() =>
  import("./Pages").then((module) => ({ default: module.FriendsPage }))
);
const FriendsLibrary = lazy(() =>
  import("./Pages").then((module) => ({ default: module.FriendsLibrary }))
);
const FriendsProfile = lazy(() =>
  import("./Pages").then((module) => ({ default: module.FriendsProfile }))
);
const ProfilePage = lazy(() =>
  import("./Pages").then((module) => ({ default: module.ProfilePage }))
);

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.authUser.status);

  useEffect(() => {
    if (userStatus === condition.IDLE) {
      dispatch(fetchUser());
      dispatch(fetchNotifications());
    }
  }, [dispatch, userStatus]);

  return (
    <div className={styles.wrapper}>
      <Suspense fallback={<Loading />}>
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
                <div className={styles.pageContent}>
                  <Navbar mainViewStyle={styles.mainView} />
                </div>

                {/* <div className={styles.backgroundImg}></div> */}
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="results" element={<AllResults />} />
            <Route path="book-results" element={<BookResults />} />
            <Route path="user-results" element={<UserResults />} />
            <Route path="library" element={<Library />} />
            <Route path="borrowed" element={<BorrowedPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="friends" element={<FriendsPage />}>
              <Route path="library" element={<FriendsLibrary />} />
              <Route path="profile" element={<FriendsProfile />} />
              {/* <Route path="messaging: user_id" element={<UserMessaging />} />
              <Route path="profile: user_id" element={<UserProfile />}/> */}
            </Route>
          </Route>
        </Routes>

        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
