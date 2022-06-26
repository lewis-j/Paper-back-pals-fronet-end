import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader, faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BottomNav = ({ expandSize = "md" }) => {
  const navigate = useNavigate();
  return (
    <div
      style={styles.container}
      className={`container d-flex d-${expandSize}-none`}
    >
      <div style={styles.navItem}>
        <FontAwesomeIcon icon={faBookOpenReader} /> Borrowed
      </div>
      <div style={styles.navItem}>
        <FontAwesomeIcon icon={faBook} onClick={() => navigate("/library")} />
        Library
      </div>
    </div>
  );
};

const styles = {
  container: {
    dispay: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  navItem: {
    color: "white",
    fontSize: "1.2em",
  },
};

export default BottomNav;
