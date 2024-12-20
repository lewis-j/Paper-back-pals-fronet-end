import { useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchUser } from "./features/Authentication";
import * as condition from "./data/asyncStatus";
import { LandingPage, SettingsPage } from "./pages";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { Loading, PrivateRoute } from "./components";
import { Navbar, Footer } from "./layout";
import { Login, Signup, ResetPassword } from "./features/Authentication";
import styles from "./style/App.module.scss";
import { AllResults } from "./pages/SearchResults/AllResults";
import { fetchNotifications } from "./features/Notifications";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";

const Library = lazy(() =>
  import("./pages").then((module) => ({ default: module.Library }))
);
const BorrowedPage = lazy(() =>
  import("./pages").then((module) => ({ default: module.BorrowedPage }))
);
const FriendsPage = lazy(() =>
  import("./pages").then((module) => ({ default: module.FriendsPage }))
);
const FriendsLibrary = lazy(() =>
  import("./pages").then((module) => ({ default: module.FriendsLibrary }))
);
const ProfilePage = lazy(() =>
  import("./pages").then((module) => ({ default: module.ProfilePage }))
);

function App() {
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.authUser.status);
  const currentUser = useSelector((state) => state.authUser.currentUser);

  useEffect(() => {
    if (
      !window.location.pathname.includes("landing-page") &&
      userStatus === condition.IDLE
    ) {
      dispatch(fetchUser())
        .unwrap()
        .catch((error) => {
          if (error.status === 401) {
            window.location.href = "/landing-page";
          }
          console.error("Failed to fetch user:", error);
        });
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (currentUser && userStatus === condition.SUCCEEDED) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, currentUser, userStatus]);

  return (
    <div className={styles.wrapper}>
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
              <Suspense fallback={<Loading />}>
                <div className={styles.pageContent}>
                  <Navbar mainViewStyle={styles.mainView} />
                </div>
              </Suspense>
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="results" element={<AllResults />} />
          <Route path="library" element={<Library />} />
          <Route path="borrowed" element={<BorrowedPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="friends" element={<FriendsPage />}>
            <Route path="library" element={<FriendsLibrary />} />
          </Route>
        </Route>

        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
