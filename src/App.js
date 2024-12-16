import { useEffect, Suspense, lazy, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchUser } from "./features/Authentication";
import * as condition from "./data/asyncStatus";
import { LandingPage } from "./pages";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { Loading, PrivateRoute } from "./components";
import { Navbar, Footer } from "./layout";
import { Login, Signup, ResetPassword } from "./features/Authentication";
import styles from "./style/App.module.scss";
import { AllResults } from "./pages/SearchResults/AllResults";
import {
  fetchNotifications,
  NotificationsPanel,
} from "./features/Notifications";
import ChatModal from "./features/Chat/components/ChatModal/ChatModal";
import { setChatOpen } from "./features/Chat/chatSlice";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import SlidePanel from "./components/SlidePanel/SlidePanel";
import { setNotificationsIsOpen } from "./features/Notifications/notificationsSlice";

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
  const isNotificationsOpen = useSelector(
    (state) => state.notifications.isOpen
  );

  const setIsNotifOpen = (isOpen) => {
    dispatch(setNotificationsIsOpen(isOpen));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userStatus === condition.IDLE) {
        try {
          await dispatch(fetchUser()).unwrap();
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };

    fetchData();
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (currentUser && userStatus === condition.SUCCEEDED) {
      dispatch(fetchNotifications());
    }
  }, [dispatch, currentUser, userStatus]);

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
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="results" element={<AllResults />} />
            <Route path="library" element={<Library />} />
            <Route path="borrowed" element={<BorrowedPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="friends" element={<FriendsPage />}>
              <Route path="library" element={<FriendsLibrary />} />
            </Route>
          </Route>
          <Route path="/privacy" element={<PrivacyPolicy />} />
          {/* <Route path="/terms" element={<TermsOfService />} />
  <Route path="/cookies" element={<CookiePolicy />} /> */}
        </Routes>

        <ChatModal />
        <SlidePanel
          open={isNotificationsOpen}
          onClose={() => {
            setIsNotifOpen(false);
          }}
        >
          <NotificationsPanel />
        </SlidePanel>

        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
