import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./Footer.scss";
const Footer = () => {
  return (
    <footer className="Footer mt-5">
      <FontAwesomeIcon href="" icon={faGithub} className="Footer-git-icon" />
    </footer>
  );
};

export default Footer;
