import { Outlet } from "react-router-dom";
import DesktopNavigation from "../DesktopNavigation/DesktopNavigation";
import SlidePanel from "../../../../components/SlidePanel/SlidePanel";
import { setNotificationsIsOpen } from "../../../../features/Notifications/notificationsSlice";
import { NotificationsPanel } from "../../../../features/Notifications";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import AccountMenu from "../AccountMenu/AccountMenu";
import styles from "./MainNav.module.scss";

const MainNav = () => {
  const isNotificationsOpen = useSelector(
    (state) => state.notifications.isOpen
  );
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const setNoificationOpenState = (isOpen) => {
    dispatch(setNotificationsIsOpen(isOpen));
  };
  return (
    <>
      <DesktopNavigation openProfileMenu={() => setIsProfileMenuOpen(true)} />
      <div className={styles.content}>
        <Outlet />
      </div>
      <SlidePanel
        open={isNotificationsOpen}
        onClose={() => {
          setNoificationOpenState(false);
        }}
      >
        <NotificationsPanel onClose={() => setNoificationOpenState(false)} />
      </SlidePanel>
      <SlidePanel
        open={isProfileMenuOpen}
        onClose={() => {
          setIsProfileMenuOpen(false);
        }}
      >
        <AccountMenu />
      </SlidePanel>
    </>
  );
};

export default MainNav;
