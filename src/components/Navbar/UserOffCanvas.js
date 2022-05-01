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
import * as NavLinks from "./navLinks";

const UserOffCanvas = ({ expandSize }) => {
  const [canvasToggle, setCanvasToggle] = useState(false);
  const userName = "Lewis";

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
        className="UserOffCanvas"
        toggle={() => {
          setCanvasToggle(!canvasToggle);
        }}
      >
        <OffcanvasHeader
          toggle={() => {
            setCanvasToggle(!canvasToggle);
          }}
        >
          {userName}
        </OffcanvasHeader>
        <OffcanvasBody>
          <Nav vertical tabs>
            <NavItem>
              <NavLinks.Profile />
            </NavItem>
            <NavItem>
              <NavLinks.Notifications />
            </NavItem>
            <NavItem>
              <NavLinks.Friends />
            </NavItem>
            <NavItem>
              <NavLinks.Messages />
            </NavItem>
            <NavItem>
              <NavLinks.Settings />
            </NavItem>
            <NavItem>
              <NavLinks.Logout />
            </NavItem>
          </Nav>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default UserOffCanvas;
