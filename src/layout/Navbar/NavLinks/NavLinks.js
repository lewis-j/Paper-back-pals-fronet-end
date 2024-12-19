import { NavLink } from "react-router-dom";
import { logout } from "../../../features/Authentication";
import styles from "./NavLinks.module.scss";
import { useDispatch } from "react-redux";

const generateClass = (className) => {
  const _className = className
    ? `${className} ${styles.navLink}`
    : styles.navLink;
  const activeLink = `${_className} ${styles.navLink_active}`;
  return ({ isActive }) => (isActive ? activeLink : _className);
};

export const Home = ({ className, closeOnClick }) => {
  return (
    <NavLink className={generateClass(className)} onClick={closeOnClick} to="/">
      Home
    </NavLink>
  );
};
export const Borrowed = ({ className, closeOnClick }) => (
  <NavLink
    className={generateClass(className)}
    onClick={closeOnClick}
    to="borrowed"
  >
    Borrowed
  </NavLink>
);
export const Library = ({ className, closeOnClick }) => (
  <NavLink
    className={generateClass(className)}
    onClick={closeOnClick}
    to="library"
  >
    Library
  </NavLink>
);
export const Profile = ({ className, closeOnClick }) => (
  <NavLink
    className={generateClass(className)}
    onClick={closeOnClick}
    to="profile"
  >
    Profile
  </NavLink>
);
export const Notifications = ({ className, onClick }) => {
  let linkClass = `${className} ${styles.navLink}`;
  return (
    <div
      className={linkClass}
      onClick={() => {
        onClick();
      }}
    >
      Notifications
    </div>
  );
};
export const Friends = ({ className, closeOnClick }) => (
  <NavLink
    className={generateClass(className)}
    onClick={closeOnClick}
    to="friends"
  >
    Friends
  </NavLink>
);
export const Messages = ({ className, onClick }) => {
  const baseClass = generateClass(className)({ isActive: false });
  return (
    <button className={`${baseClass} ${styles.messages}`} onClick={onClick}>
      Messages
    </button>
  );
};
export const Settings = ({ className, closeOnClick }) => (
  <NavLink
    className={generateClass(className)}
    onClick={closeOnClick}
    to="settings"
  >
    Settings
  </NavLink>
);
export const Logout = ({ className }) => {
  const dispatch = useDispatch();
  let linkClass = `${className} ${styles.navLink}`;
  return (
    <div
      className={linkClass}
      onClick={async () => {
        await dispatch(logout()).unwrap();
        // navigate("/landing-page");
      }}
    >
      Logout
    </div>
  );
};
