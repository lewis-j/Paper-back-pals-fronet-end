import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as condition from "../../redux/status";

const PrivateRoute = ({ children }) => {
  const { currentUser, status } = useSelector((state) => state.authUser);

  console.log("status in private route", status);

  if (status === condition.LOADING || status === condition.IDLE) {
    return <div>Loading...</div>;
  }

  return currentUser && status === condition.SUCCEEDED ? (
    children
  ) : (
    <Navigate to="/landing-page">{console.log("landing page ran")}</Navigate>
  );
};

export default PrivateRoute;
