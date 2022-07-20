import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  ContactList,
  FriendsNavigation,
  getUserData,
} from "../../features/Friends";
import styles from "./FriendsPage.module.scss";
import { useBSSizeFromWidth } from "../../utilities/getBSSizeFromWidth";

const FriendsPage = () => {
  const [activeId, setActiveId] = useState("");
  const { currentFriend } = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const windowSize = useBSSizeFromWidth();
  const isLrgScreen = windowSize === "lg";

  const enterUser = async (_id) => {
    setActiveId(_id);
    if (!isLrgScreen) setIsOpen(false);
    await dispatch(getUserData({ user_id: _id })).unwrap();
    navigate(`library`);
  };

  const switchToListView = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.contactList}
        style={isLrgScreen ? {} : { width: "100%" }}
      >
        <ContactList activeId={activeId} setUser={enterUser} />
      </div>
      <div
        style={
          isLrgScreen
            ? {}
            : isOpen
            ? { width: "100%", transform: "translateX(100%)" }
            : { width: "100%" }
        }
        className={
          isOpen ? styles.mainView : `${styles.viewOpen} ${styles.mainView}`
        }
      >
        <FriendsNavigation isOpen={isOpen} toggleList={switchToListView} />
        <div className={styles.innerView}>
          {currentFriend ? <Outlet /> : <div>test</div>}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
