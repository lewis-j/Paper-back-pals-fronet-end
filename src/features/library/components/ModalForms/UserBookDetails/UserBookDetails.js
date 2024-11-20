import React from "react";
import { Loading } from "../../../../../components";
import { useSelector } from "react-redux";
import * as asyncStatus from "../../../../../data/asyncStatus";
import formStyles from "../Shared/FormContainer/FormContainer.module.scss";

const UserBookDetails = ({ userBook, onClose }) => {
  const userBookAsyncStatus = useSelector((state) => state.userBooks.status);

  if (!userBook) return null;
  if (userBookAsyncStatus === asyncStatus.LOADING) return <Loading />;

  return (
    <>
      <p className={formStyles.description}>{userBook.book.description}</p>
      <div className={formStyles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={formStyles.cancelButton}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default UserBookDetails;
