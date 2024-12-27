import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as asyncStatus from "../../data/asyncStatus";
import { PageLoading } from "../PageLoading";

const PrivateRoute = ({ children }) => {
  const { currentUser, status } = useSelector((state) => state.authUser);
  const isLoading = status === asyncStatus.LOADING;
  const isSucceeded = status === asyncStatus.SUCCEEDED;

  if (status === asyncStatus.IDLE) {
    return <Navigate to="/landing-page" />;
  }

  if (isLoading) {
    return <PageLoading />;
  }

  return currentUser && isSucceeded ? (
    children
  ) : (
    <Navigate to="/landing-page" />
  );
};

export default PrivateRoute;
