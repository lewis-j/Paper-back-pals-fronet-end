import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader, faBook } from "@fortawesome/free-solid-svg-icons";

const BottomNav = ({ expandSize = "md" }) => {
  return (
    <div className={`container d-flex d-${expandSize}-none`}>
      <a className="navbar-brand me-auto ms-2 mt-2" href="#">
        <FontAwesomeIcon icon={faBookOpenReader} /> Borrowed
      </a>
      <a className="navbar-brand mt-2" href="#">
        <FontAwesomeIcon icon={faBook} /> Library
      </a>
    </div>
  );
};

export default BottomNav;
