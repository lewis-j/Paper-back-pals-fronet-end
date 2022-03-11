import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBook,
  faBookmark,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

const BottomNav = ({ expandSize = "md" }) => {
  return (
    <div className={`container d-flex d-${expandSize}-none`}>
      <a className="navbar-brand me-auto ms-2 mt-2" href="#">
        <FontAwesomeIcon icon={faBook} /> Borrowed
      </a>
      <a className="navbar-brand mt-2" href="#">
        <FontAwesomeIcon icon={faBookmark} /> Library
      </a>
    </div>
  );
};

export default BottomNav;
