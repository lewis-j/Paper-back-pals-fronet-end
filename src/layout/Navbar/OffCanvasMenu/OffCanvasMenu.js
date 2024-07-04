import React, { useState } from "react";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Nav,
  NavItem,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faUsers,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import * as NavLinks from "../NavLinks";
import styles from "./OffCanvasMenu.module.scss";
import { useSelector } from "react-redux";
import { Avatar } from "../../../components";
import { SideMenu } from "../../SideMenu";
import { NotificationsPanel } from "../../../features/Notifications";

const OffCanvasMenu = ({ expandSize }) => {
  // const [isOpen, setIsOpen] = useState({ nav: false, notifications: false });
  const [isNavOpen, setIsNav] = useState(false);
  const [isNotOpen, setIsNot] = useState(false);
  const { username, profilePic } = useSelector(
    (state) => state.authUser.currentUser
  );

  const navigate = useNavigate();

  console.log("menu boleans", isNavOpen, isNotOpen);

  const clickedLink = () => {
    setIsNav(false);
    setIsNot(false);
  };
  return (
    <div className={`d-none d-${expandSize}-flex ms-2`}>
      <button
        color="light"
        className={styles.btn}
        onClick={() => {
          setIsNot(true);
        }}
      >
        <FontAwesomeIcon
          icon={faBell}
          size="xl"
          style={{ boxSizing: "border-box" }}
          className={styles.friendsIcon}
        />
      </button>
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
          setIsNav(true);
        }}
      >
        <FontAwesomeIcon icon={faCircleUser} color="white" size="xl" />
      </button>

      <Offcanvas
        direction="end"
        isOpen={isNavOpen}
        className={styles.offCanvas}
        toggle={() => {
          setIsNav(!isNavOpen);
        }}
      >
        <OffcanvasHeader
          className={styles.header}
          toggle={() => {
            setIsNav(!isNavOpen);
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
              <NavLinks.Notifications
                onClick={() => {
                  if (isNavOpen) {
                    setIsNav(false);
                    setTimeout(() => setIsNot(true), 300); // Delay to allow Offcanvas to close
                  } else {
                    setIsNot(true);
                  }
                }}
              />
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
      <SideMenu
        header="Notifications"
        open={isNotOpen}
        close={() => {
          setIsNot(false);
        }}
      >
        <NotificationsPanel />
      </SideMenu>
    </div>
  );
};

export default OffCanvasMenu;
