import { Outlet } from "react-router-dom";
import DesktopNavigation from "../DesktopNavigation/DesktopNavigation";

const MainNav = () => {
  return (
    <>
      <DesktopNavigation />
      <Outlet />
    </>
  );
};

export default MainNav;
