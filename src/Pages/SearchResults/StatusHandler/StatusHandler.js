import React from "react";
import { useSelector } from "react-redux";
import * as condition from "../../../data/asyncStatus";
import { PageLoading } from "../../../components";

const StatusHandler = ({ children, results }) => {
  const { status, error } = useSelector((state) => state.searchResults);

  const isLoading = status === condition.LOADING;
  const isError = status === condition.FAILED;

  if (isLoading) {
    return <PageLoading />;
  }

  if (isError) {
    console.error(error);
    return <div>Whoops! Something went wrong. Maybe try something else</div>;
  }

  if (!results.length) {
    return <div>No results yet</div>;
  }
  return children;
};

export default StatusHandler;
