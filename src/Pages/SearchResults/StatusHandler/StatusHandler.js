import React from "react";
import { useSelector } from "react-redux";
import * as condition from "../../../data/asyncStatus";
import { NoContent, PageLoading } from "../../../components";
import {
  faBookOpenReader,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const StatusHandler = ({ children, results }) => {
  const { status, error } = useSelector((state) => state.searchResults);

  const isLoading = status === condition.LOADING;
  const isError = status === condition.FAILED;

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    console.error(error);
    return (
      <NoContent icon={faTriangleExclamation}>
        Looks like something went wrong
      </NoContent>
    );
  }

  if (!results.length) {
    return (
      <NoContent icon={faBookOpenReader}>
        No results yet search again!
      </NoContent>
    );
  }
  return children;
};

export default StatusHandler;
