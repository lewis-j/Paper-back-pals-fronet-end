import React from "react";
import { Loading } from "../../../../../components";
import { useSelector } from "react-redux";

import * as asyncStatus from "../../../../../data/asyncStatus";
import formStyles from "../Shared/FormContainer/FormContainer.module.scss";
import FormContainer from "../Shared/FormContainer/FormContainer";

const UserBookDetails = ({ userBook, onClose }) => {
  console.log("userBook in UserBookDetails: ", userBook);
  const userBookAsyncStatus = useSelector((state) => state.userBooks.status);

  if (!userBook) return null;
  if (userBookAsyncStatus === asyncStatus.LOADING) return <Loading />;

  return (
    <FormContainer bookData={userBook}>
      <div className={formStyles.label}>Book Description</div>
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
    </FormContainer>
  );
};

export default UserBookDetails;
