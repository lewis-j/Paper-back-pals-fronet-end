import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/user/userSlice";
import "./Navbar-custom.scss";
import { useDispatch } from "react-redux";
import { resetStatus } from "../../redux/user/userSlice";

const generateClass = (className) => {
  const _className = `${className} NavLinks`;
  const activeLink = `${_className} NavLinks__active`;
  return ({ isActive }) => (isActive ? activeLink : _className);
};

export const Home = ({ className }) => {
  return (
    <NavLink className={generateClass(className)} to="/">
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
export const Logout = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("classname", className);
  let linkClass = `${className} NavLinks`;
  return (
    <div
      className={linkClass}
      // to="landing-page"
      onClick={async () => {
        await dispatch(logout()).unwrap();
        navigate("/landing-page");
      }}
    >
      Logout
    </div>
  );
};
