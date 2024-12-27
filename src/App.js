import { useEffect, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { fetchUser } from "./features/Authentication";
import * as asyncStatus from "./data/asyncStatus";
import { LandingPage, SettingsPage } from "./pages";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { Loading, PrivateRoute } from "./components";
import { Footer, Navigation } from "./layout";
import { Login, Signup, ResetPassword } from "./features/Authentication";
import styles from "./style/App.module.scss";
import { AllResults } from "./pages/SearchResults/AllResults";
import { fetchNotifications } from "./features/Notifications";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import MainNav from "./layout/Navigation/components/MainNav/MainNav";

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
  const navigate = useNavigate();
  const location = useLocation();
  const userStatus = useSelector((state) => state.authUser.status);
  const currentUser = useSelector((state) => state.authUser.currentUser);

  useEffect(() => {
    if (
      userStatus === asyncStatus.IDLE &&
      !location.pathname.includes("landing-page")
    ) {
      console.log("fetching user");
      dispatch(fetchUser())
        .unwrap()
        .catch((error) => {
          if (error.status === 401) {
            navigate("/landing-page");
          }
          console.error("Failed to fetch user:", error);
        });
    }
  }, [dispatch, userStatus, navigate, location.pathname]);

  useEffect(() => {
    if (currentUser && userStatus === asyncStatus.SUCCEEDED) {
      console.log("fetching notifications");
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
                  <Navigation />
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
