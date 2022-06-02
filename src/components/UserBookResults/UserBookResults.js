import React from "react";
import { useParams } from "react-router-dom";

export const UserBookResults = () => {
  const { user_id } = useParams();
  return <div>UserBookResults {user_id}</div>;
};

export default UserBookResults;
