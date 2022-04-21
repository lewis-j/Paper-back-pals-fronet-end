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
  Form,
} from "reactstrap";
import UserOffCanvas from "./UserOffCanvas";
import SearchBar from "./SearchBar";
import logo from "../../Assets/imgs/pppals.png";
import BottomNav from "./BottomNav";
import { Outlet, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const TopNav = ({ searchBooks }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const expandSize = "md";
  const navigate = useNavigate();

  return (
    <div>
      <Navbar
        container="md"
        expand={expandSize}
        light
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
          <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
        </Button>
        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto Navbar-li-border" navbar>
            <NavItem>
              <NavLink
                active
                onClick={() => {
                  navigate("./");
                }}
              >
                Home
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
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={`d-block d-${expandSize}-none`} href="#">
                Notifications
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

export default TopNav;
