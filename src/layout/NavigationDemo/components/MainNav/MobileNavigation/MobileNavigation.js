import { Button, NavbarToggler } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./MobileNavigation.module.scss";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "../../../../../features/search";
import logo from "../../../../../Assets/imgs/pppals_white.png";

export const MobileNavigation = ({
  isOpen,
  setIsOpen,
  isSearching,
  setIsSearching,
  expandSize,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

      {isSearching ? (
        <div className={styles.searchInput}>
          <SearchBar
            expandSize="xs"
            customStyles={styles.searchInput}
            onClose={() => setIsSearching(false)}
            mobileView
          />
        </div>
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
        onClick={() => setIsSearching(!isSearching)}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} color="white" size="lg" />
      </Button>
    </>
  );
};
