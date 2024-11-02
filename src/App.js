import { useEffect, Suspense, lazy, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchUser } from "./features/Authentication";
import * as condition from "./data/asyncStatus";
import { LandingPage, DashboardPage } from "./Pages";
import { Loading, PrivateRoute } from "./components";
import { Navbar, Footer } from "./layout";
import { Login, Signup, ResetPassword } from "./features/Authentication";
import styles from "./style/App.module.scss";
import { AllResults } from "./Pages/SearchResults/AllResults";
import { fetchNotifications } from "./features/Notifications";
import Chat from "./features/Chat/components/Chat/Chat";
import ChatModal from "./features/Chat/components/ChatModal/ChatModal";
import { setChatOpen } from "./features/Chat/chatSlice";

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
  const currentUser = useSelector((state) => state.authUser.currentUser);

  useEffect(() => {
    const fetchData = async () => {
      console.log("userStatus", userStatus);
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
            <Route path="book-results" element={<BookResults />} />
            <Route path="user-results" element={<UserResults />} />
            <Route path="library" element={<Library />} />
            <Route path="borrowed" element={<BorrowedPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="friends" element={<FriendsPage />}>
              <Route path="library" element={<FriendsLibrary />} />
              <Route path="profile" element={<FriendsProfile />} />
              <Route
                path="message"
                element={
                  <div onClick={() => dispatch(setChatOpen(true))}>
                    Open Chat
                  </div>
                }
              />
            </Route>
          </Route>
        </Routes>

        <ChatModal />

        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
