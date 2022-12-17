import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as condition from "../../data/asyncStatus";
import { PageLoading } from "../PageLoading";

const PrivateRoute = ({ children }) => {
  const { currentUser, status } = useSelector((state) => state.authUser);

  if (status === condition.LOADING || status === condition.IDLE) {
    return <PageLoading />;
  }

  return (currentUser && status) === condition.SUCCEEDED ? (
    children
  ) : (
    <Navigate to="/landing-page" />
  );
};

export default PrivateRoute;
