import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { navItems } from "../config/navConfig";
import styles from "./DesktopNavigation.module.scss";
import logo from "../../../../Assets/imgs/pppals_white.png";
import { setNotificationsIsOpen } from "../../../../features/Notifications/notificationsSlice";
import { setChatOpen } from "../../../../features/Chat/chatSlice";
import { SearchBar } from "../../../../features/search";

const DesktopNavigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAction = (action) => {
    switch (action) {
      case "toggleNotifications":
        dispatch(setNotificationsIsOpen(true));
        break;
      case "toggleChat":
        dispatch(setChatOpen(true));
        break;
      case "logout":
        // Handle logout
        break;
      default:
        break;
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        {/* Logo */}
        <img
          src={logo}
          className={styles.logo}
          alt="Logo"
          onClick={() => navigate("/")}
        />

        {/* Primary Navigation */}
        <div className={styles.primaryNav}>
          {navItems.primary.map((item) => (
            <button
              key={item.id}
              className={styles.navLink}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <SearchBar expandSize="md" customStyles={styles.searchInput} />
        </div>

        {/* Secondary Icons */}
        <div className={styles.secondaryNav}>
          {navItems.secondary.map((item) => (
            <button
              key={item.id}
              className={styles.iconButton}
              onClick={() =>
                item.action ? handleAction(item.action) : navigate(item.path)
              }
              title={item.label}
            >
              <FontAwesomeIcon
                icon={item.icon}
                style={{ boxSizing: "border-box" }}
                className={styles.friendsIcon}
              />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavigation;
