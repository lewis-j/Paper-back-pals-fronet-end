import { logout } from "../../firebase";
import { NavLink } from "react-router-dom";
import "./Navbar-custom.scss";

const generateClass = (className) => {
  const _className = `${className} NavLinks`;
  const activeLink = `${_className} NavLinks__active`;
  return ({ isActive }) => (isActive ? activeLink : _className);
};

export const Home = ({ className }) => {
  return (
    <NavLink className={generateClass(className)} to="home">
      Home
    </NavLink>
  );
};
export const Borrowed = ({ className }) => (
  <NavLink className={generateClass(className)} to="borrowed">
    Borrowed
  </NavLink>
);
export const Library = ({ className }) => (
  <NavLink className={generateClass(className)} to="library">
    Library
  </NavLink>
);
export const Profile = ({ className }) => (
  <NavLink className={generateClass(className)} to="profile">
    Profile
  </NavLink>
);
export const Notifications = ({ className }) => (
  <NavLink className={generateClass(className)} to="notifications">
    Notifications
  </NavLink>
);
export const Friends = ({ className }) => (
  <NavLink className={generateClass(className)} to="friends">
    Friends
  </NavLink>
);
export const Messages = ({ className }) => (
  <NavLink className={generateClass(className)} to="settings">
    Messages
  </NavLink>
);
export const Settings = ({ className }) => (
  <NavLink className={generateClass(className)} to="settings">
    Settings
  </NavLink>
);
export const Logout = ({ className }) => (
  <NavLink
    className={generateClass(className)}
    to="landing-page"
    onClick={logout}
  >
    Logout
  </NavLink>
);
