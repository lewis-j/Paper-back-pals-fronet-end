import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
  Input,
  Form,
} from "reactstrap";
import UserOffCanvas from "./UserOffCanvas";
import SearchBar from "./SearchBar";
import logo from "../../Assets/imgs/pppals_white.png";
import BottomNav from "./BottomNav";
import { Outlet } from "react-router-dom";
import * as NavLinks from "./navLinks";
import "./Navbar-custom.scss";

const MainNav = ({ searchBooks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const expandSize = "md";

  return (
    <div>
      <Navbar
        container="md"
        expand={expandSize}
        dark
        className="Navbar__custom"
      >
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        {isSearching ? (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("Searching", query);
              searchBooks(query);
              setQuery("");
              setIsSearching(false);
            }}
          >
            <Input
              name="search"
              type="search"
              placeholder="Search Book"
              className="Navbar__search__input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </Form>
        ) : (
          <img src={logo} style={{ width: "9rem" }} alt="Paperback Pals Logo" />
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
          <FontAwesomeIcon icon={faMagnifyingGlass} color="white" size="lg" />
        </Button>
        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto Navbar__li" navbar>
            <NavItem>
              <NavLinks.Home />
            </NavItem>
            <NavItem>
              <NavLinks.Borrowed className={`d-none d-${expandSize}-block`} />
            </NavItem>
            <NavItem>
              <NavLinks.Library className={`d-none d-${expandSize}-block`} />
            </NavItem>
            <NavItem>
              <NavLinks.Profile className={`d-block d-${expandSize}-none`} />
            </NavItem>
            <NavItem>
              <NavLinks.Notifications
                className={`d-block d-${expandSize}-none`}
              />
            </NavItem>
            <NavItem>
              <NavLinks.Friends className={`d-block d-${expandSize}-none`} />
            </NavItem>
            <NavItem>
              <NavLinks.Settings className={`d-block d-${expandSize}-none`} />
            </NavItem>
            <NavItem>
              <NavLinks.Logout className={`d-block d-${expandSize}-none`} />
            </NavItem>
          </Nav>
        </Collapse>
        <SearchBar
          expandSize={expandSize}
          query={query}
          setQuery={setQuery}
          searchBooks={searchBooks}
        />
        <UserOffCanvas expandSize={expandSize} />
        <BottomNav expandSize={expandSize} />
      </Navbar>
      <Outlet />
    </div>
  );
};

export default MainNav;
