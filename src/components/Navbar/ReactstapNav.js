import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  Input,
} from "reactstrap";
import UserOffCanvas from "./UserOffCanvas";
import SearchBar from "./SearchBar";
import logo from "../../Assets/imgs/pppals.png";
import BottomNav from "./BottomNav";
import "./Navbar.scss";

const TopNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const expandSize = "md";

  return (
    <div>
      <Navbar color="light" container expand={expandSize} fixed="top" light>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        {isSearching ? (
          <Input
            name="search"
            type="search"
            placeholder="Search Book"
            className="Navbar-search-input"
          />
        ) : (
          <img src={logo} style={{ width: "9rem" }} />
        )}

        <Button
          outline
          color="dark"
          style={{ border: "none" }}
          className={`d-block d-${expandSize}-none`}
          onClick={() => {
            setIsSearching(!isSearching);
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </Button>
        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="#">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={`d-block d-${expandSize}-none`} href="#">
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={`d-block d-${expandSize}-none`} href="#">
                Notifications
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={`d-none d-${expandSize}-block`} href="#">
                Borrowed
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={`d-none d-${expandSize}-block`} href="#">
                library
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={`d-block d-${expandSize}-none`} href="#">
                Friends
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={`d-block d-${expandSize}-none`} href="#">
                Settings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={`d-block d-${expandSize}-none`} href="#">
                Log Out
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <SearchBar expandSize={expandSize} />
        <UserOffCanvas expandSize={expandSize} />
        <BottomNav expandSize={expandSize} />
      </Navbar>
    </div>
  );
};

export default TopNav;
