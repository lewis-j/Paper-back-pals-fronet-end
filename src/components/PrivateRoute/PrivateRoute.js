import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as condition from "../../redux/status";

const PrivateRoute = ({ children }) => {
  const { currentUser, status } = useSelector((state) => state.user);

  return currentUser && status === condition.SUCCEEDED ? (
    children
  ) : (
    <Navigate to="/landing-page" />
  );
};

export default PrivateRoute;
