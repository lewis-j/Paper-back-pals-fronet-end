import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader, faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from "./SecondaryNav.module.scss";

const SecondaryNav = ({ expandSize = "md" }) => {
  const navigate = useNavigate();
  return (
    <div className={`d-${expandSize}-none ${styles.container}`}>
      <div className={styles.navItem} onClick={() => navigate("/borrowed")}>
        <FontAwesomeIcon icon={faBookOpenReader} /> Borrowed
      </div>
      <div className={styles.navItem} onClick={() => navigate("/library")}>
        <FontAwesomeIcon icon={faBook} />
        Library
      </div>
    </div>
  );
};

export default SecondaryNav;
