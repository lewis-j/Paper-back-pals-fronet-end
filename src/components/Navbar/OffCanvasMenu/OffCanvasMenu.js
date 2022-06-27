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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import * as NavLinks from "../NavLinks";
import styles from "./OffCanvasMenu.module.scss";
import { useSelector } from "react-redux";

const OffCanvasMenu = ({ expandSize }) => {
  const [canvasToggle, setCanvasToggle] = useState(false);
  const { username, profilePic } = useSelector(
    (state) => state.authUser.currentUser
  );

  const clickedLink = () => {
    setCanvasToggle(false);
  };
  return (
    <div className={`d-none d-${expandSize}-block ms-2`}>
      <Button
        color="light"
        className="text-decoration-none text-reset border-0"
        style={{ backgroundColor: "inherit" }}
        onClick={() => {
          setCanvasToggle(!canvasToggle);
        }}
      >
        <FontAwesomeIcon icon={faCircleUser} color="white" size="xl" />
      </Button>
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
          <img src={profilePic} alt={username} className={styles.avatar} />
          {username}
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
