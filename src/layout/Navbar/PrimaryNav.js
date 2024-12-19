import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { OffCanvasMenu } from "./OffCanvasMenu";
import { SecondaryNav } from "./SecondaryNav";
import logo from "../../Assets/imgs/pppals_white.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchBooks, setQuery, SearchBar } from "../../features/search";
import * as NavLinks from "./NavLinks";
import styles from "./PrimaryNav.module.scss";
import { setNotificationsIsOpen } from "../../features/Notifications/notificationsSlice";
import SlidePanel from "../../components/SlidePanel/SlidePanel";
import ChatModal from "../../features/Chat/components/ChatModal/ChatModal";
import { NotificationsPanel } from "../../features/Notifications";
import { useSelector } from "react-redux";

const PrimaryNav = ({ mainViewStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isNotificationsOpen = useSelector(
    (state) => state.notifications.isOpen
  );

  const setIsNotifOpen = (isOpen) => {
    dispatch(setNotificationsIsOpen(isOpen));
  };

  // const isSmScreen = useBSSizeFromWidth() === "md";

  const expandSize = "md";

  const handleClickOutside = useCallback((e) => {
    // Don't close if clicking the search button or search container
    if (
      e.target.closest(`.${styles.searchInput}`) ||
      e.target.closest("button")
    )
      return;

    setIsSearching(false);
  }, []);

  useEffect(() => {
    if (isSearching) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearching, handleClickOutside]);

  return (
    <div>
      <Navbar container="md" expand={expandSize} dark className={styles.navbar}>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        {isSearching ? (
          <div className={styles.searchInput}>
            <SearchBar
              expandSize="xs"
              customStyles={styles.searchInput}
              onClose={() => setIsSearching(false)}
              mobileView
            />
          </div>
        ) : (
          <img
            src={logo}
            className={styles.logo}
            alt="Paperback Pals Logo"
            onClick={() => navigate("/")}
          />
        )}

        <Button
          outline
          color="dark"
          style={{ border: "none" }}
          className={`d-block d-${expandSize}-none`}
          onClick={() => setIsSearching(!isSearching)}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} color="white" size="lg" />
        </Button>
        <Collapse navbar isOpen={isOpen}>
          <Nav className={styles.nav} navbar>
            <NavItem>
              <NavLinks.Home className={styles.inline} />
            </NavItem>
            <NavItem>
              <NavLinks.Borrowed
                className={`d-none d-${expandSize}-block ${styles.inline}`}
              />
            </NavItem>
            <NavItem>
              <NavLinks.Library
                className={`d-none d-${expandSize}-block ${styles.inline}`}
              />
            </NavItem>
            <>
              <NavItem>
                <NavLinks.Profile className={`d-block d-${expandSize}-none`} />
              </NavItem>
              <NavItem>
                <NavLinks.Notifications
                  className={`d-block d-${expandSize}-none`}
                  onClick={() => {
                    dispatch(setNotificationsIsOpen(true));
                  }}
                />
              </NavItem>
              <NavItem>
                <NavLinks.Friends className={`d-block d-${expandSize}-none`} />
              </NavItem>
              <NavItem>
                <NavLinks.Settings className={`d-block d-${expandSize}-none`} />
              </NavItem>
              <NavItem>
                <NavLinks.Logout className={`d-block d-${expandSize}-none`} />
              </NavItem>
            </>
          </Nav>
        </Collapse>
        <SearchBar expandSize={expandSize} />
        <OffCanvasMenu expandSize={expandSize} />
        <SecondaryNav expandSize={expandSize} />
      </Navbar>
      <div className={mainViewStyle}>
        <Outlet />
        <ChatModal />
        <SlidePanel
          open={isNotificationsOpen}
          onClose={() => {
            setIsNotifOpen(false);
          }}
        >
          <NotificationsPanel onClose={() => setIsNotifOpen(false)} />
        </SlidePanel>
      </div>
    </div>
  );
};

export default PrimaryNav;
