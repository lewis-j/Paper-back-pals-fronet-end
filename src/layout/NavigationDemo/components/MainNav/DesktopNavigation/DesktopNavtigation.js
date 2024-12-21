import { Collapse, Nav, NavItem } from "reactstrap";
import * as NavLinks from "../../NavLinks/NavLinks";
import styles from "./DesktopNavigation.module.scss";
import { useDispatch } from "react-redux";
import { setNotificationsIsOpen } from "../../../../../features/Notifications/notificationsSlice";

export const DesktopNavigation = ({ isOpen, expandSize }) => {
  const dispatch = useDispatch();

  return (
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
              onClick={() => {
                dispatch(setNotificationsIsOpen(true));
              }}
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
  );
};
