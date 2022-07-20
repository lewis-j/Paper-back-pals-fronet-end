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
import { OffCanvasMenu } from "./OffCanvasMenu";
import { SecondaryNav } from "./SecondaryNav";
import logo from "../../Assets/imgs/pppals_white.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchBooks, setQuery, SearchBar } from "../../features/search";
import * as NavLinks from "./NavLinks";
import styles from "./PrimaryNav.module.scss";
import { useBSSizeFromWidth } from "../../utilities/getBSSizeFromWidth";

const PrimaryNav = ({ mainViewStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSmScreen = useBSSizeFromWidth() === "md";

  const expandSize = "md";

  return (
    <div>
      <Navbar container="md" expand={expandSize} dark className={styles.navbar}>
        <NavbarToggler
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        {isSearching ? (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(setQuery(searchInput));
              dispatch(searchBooks({ query: searchInput }));
              setSearchInput("");
              setIsSearching(false);
            }}
          >
            <Input
              name="search"
              type="search"
              placeholder="Search Book"
              className={styles.searchInput}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
              }}
            />
          </Form>
        ) : (
          <img
            src={logo}
            className={styles.logo}
            alt="Paperback Pals Logo"
            onClick={() => navigate("/")}
          />
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
          <Nav className={styles.nav} navbar>
            <NavItem>
              <NavLinks.Home className={styles.inline} />
            </NavItem>
            <NavItem>
              <NavLinks.Borrowed
                className={`d-none d-${expandSize}-block ${styles.inline}`}
              />
            </NavItem>
            <NavItem>
              <NavLinks.Library
                className={`d-none d-${expandSize}-block ${styles.inline}`}
              />
            </NavItem>
            <>
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
            </>
          </Nav>
        </Collapse>
        <SearchBar expandSize={expandSize} />
        <OffCanvasMenu expandSize={expandSize} />
        <SecondaryNav expandSize={expandSize} />
      </Navbar>
      <div className={mainViewStyle}>
        <Outlet />
      </div>
    </div>
  );
};

export default PrimaryNav;
