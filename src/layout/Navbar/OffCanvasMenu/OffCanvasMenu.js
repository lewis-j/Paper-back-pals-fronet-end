import React, { useState } from "react";
import {
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import * as NavLinks from "../NavLinks";
import styles from "./OffCanvasMenu.module.scss";
import { useSelector } from "react-redux";
import { Avatar } from "../../../components";

const OffCanvasMenu = ({ expandSize }) => {
  const [canvasToggle, setCanvasToggle] = useState(false);
  const { username, profilePic } = useSelector(
    (state) => state.authUser.currentUser
  );

  const navigate = useNavigate();

  const clickedLink = () => {
    setCanvasToggle(false);
  };
  return (
    <div className={`d-none d-${expandSize}-flex ms-2`}>
      <button
        color="light"
        className={styles.btn}
        onClick={() => {
          navigate("friends");
        }}
      >
        <FontAwesomeIcon
          icon={faUsers}
          size="xl"
          style={{ boxSizing: "border-box" }}
          className={styles.friendsIcon}
        />
      </button>
      <button
        color="light"
        className={styles.btn}
        onClick={() => {
          setCanvasToggle(!canvasToggle);
        }}
      >
        <FontAwesomeIcon icon={faCircleUser} color="white" size="xl" />
      </button>

      <Offcanvas
        direction="end"
        isOpen={canvasToggle}
        className={styles.offCanvas}
        toggle={() => {
          setCanvasToggle(!canvasToggle);
        }}
      >
        <OffcanvasHeader
          className={styles.header}
          toggle={() => {
            setCanvasToggle(!canvasToggle);
          }}
        >
          <Avatar imgSrc={profilePic} username={username} /> {username}
        </OffcanvasHeader>
        <OffcanvasBody>
          <Nav vertical tabs>
            <NavItem>
              <NavLinks.Profile closeOnClick={clickedLink} />
            </NavItem>
            <NavItem>
              <NavLinks.Notifications closeOnClick={clickedLink} />
            </NavItem>
            <NavItem>
              <NavLinks.Friends closeOnClick={clickedLink} />
            </NavItem>
            <NavItem>
              <NavLinks.Messages closeOnClick={clickedLink} />
            </NavItem>
            <NavItem>
              <NavLinks.Settings closeOnClick={clickedLink} />
            </NavItem>
            <NavItem>
              <NavLinks.Logout closeOnClick={clickedLink} />
            </NavItem>
          </Nav>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default OffCanvasMenu;
