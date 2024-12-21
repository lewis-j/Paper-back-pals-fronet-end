import { useState, useEffect, useCallback } from "react";
import { Navbar } from "reactstrap";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MobileNavigation } from "./MobileNavigation/MobileNavigation";
import { DesktopNavigation } from "./DesktopNavigation/DesktopNavtigation";
import { DesktopControls } from "./DesktopControls/DesktopControls";
import ChatModal from "../../../../features/Chat/components/ChatModal/ChatModal";
import SlidePanel from "../../../../components/SlidePanel/SlidePanel";
import { NotificationsPanel } from "../../../../features/Notifications";
import styles from "./MainNav.module.scss";
import { setNotificationsIsOpen } from "../../../../features/Notifications/notificationsSlice";

const MainNav = ({ mainViewStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const expandSize = "md";
  const dispatch = useDispatch();

  const isNotificationsOpen = useSelector(
    (state) => state.notifications.isOpen
  );

  return (
    <div>
      <Navbar container="md" expand={expandSize} dark className={styles.navbar}>
        <MobileNavigation
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          expandSize={expandSize}
        />

        <DesktopNavigation isOpen={isOpen} expandSize={expandSize} />

        <DesktopControls expandSize={expandSize} />
      </Navbar>

      <div className={mainViewStyle}>
        <Outlet />
        <ChatModal />
        <SlidePanel
          open={isNotificationsOpen}
          onClose={() => dispatch(setNotificationsIsOpen(false))}
        >
          <NotificationsPanel
            onClose={() => dispatch(setNotificationsIsOpen(false))}
          />
        </SlidePanel>
      </div>
    </div>
  );
};

export default MainNav;
