import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBook,
  faBookmark,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import logo from "../../Assets/imgs/pppals.png";

// library.add(fas);

const AppNavbar = ({ searchBooks }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState("");
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {searchActive ? (
          <form onSubmit={() => searchBooks(query)}>
            <input
              className="form-control border rounded-pill"
              type="Search"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        ) : (
          <img src={logo} style={{ width: "9rem" }} />
        )}

        <button
          onClick={() => {
            setSearchActive(!searchActive);
          }}
          className="btn-nostyle d-block d-md-none me-3"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-block d-md-none" href="#">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-block d-md-none" href="#">
                Notifications
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link d-none d-md-block" href="#">
                Barrowed
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-none d-md-block" href="#">
                Library
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-block d-md-none" href="#">
                Friends
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-block d-md-none" href="#">
                Setting
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-block d-md-none" href="#">
                Log Out
              </a>
            </li>
          </ul>
          <form
            className="border rounded-pill bg-white d-md-flex d-none"
            onSubmit={() => searchBooks(query)}
          >
            <input
              className="form-control border-0 border-start rounded-pill me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="pt-1 pe-2 btn-nostyle border-end rounded-pill"
              type="submit"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
          <div className="dropdown ms-3 d-none d-md-block">
            <button
              className="btn-nostyle "
              type="button"
              id="extendedMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faCircleUser} size="xl" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Notifications
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Friends
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Messages
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container d-flex d-md-none">
        <a className="navbar-brand me-auto ms-2 mt-2" href="#">
          <FontAwesomeIcon icon={faBook} /> Borrowed
        </a>
        <a className="navbar-brand" href="#">
          <FontAwesomeIcon icon={faBookmark} /> Library
        </a>
      </div>
    </nav>
  );
};
export default AppNavbar;
