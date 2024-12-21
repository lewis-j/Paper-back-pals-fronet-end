import { SearchBar } from "../../../../../features/search";
import OffCanvasMenu from "../../OffCanvasMenu/OffCanvasMenu";
import SecondaryNav from "../../SecondaryNav/SecondaryNav";

export const DesktopControls = ({ expandSize }) => (
  <>
    <SearchBar expandSize={expandSize} />
    <OffCanvasMenu expandSize={expandSize} />
    <SecondaryNav expandSize={expandSize} />
  </>
);
