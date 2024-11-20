import React, { useState } from "react";
import { Loading } from "../../../../../components";
import { useSelector } from "react-redux";
import * as asyncStatus from "../../../../../data/asyncStatus";
import formStyles from "../Shared/FormContainer/FormContainer.module.scss";

const ReturnBookForm = ({ userBook, onClose, onReturnBook }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userBookAsyncStatus = useSelector((state) => state.userBooks.status);

  if (!userBook) return null;
  if (userBookAsyncStatus === asyncStatus.LOADING) return <Loading />;

  const handleReturnBook = async () => {
    setIsSubmitting(true);
    try {
      onReturnBook(userBook.request.request_id);
      onClose();
    } catch (error) {
      console.error("Error returning book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <p className={formStyles.confirmation}>
        Do you want to return {userBook.book.title} to {userBook.owner.username}
        ?
      </p>
      <div className={formStyles.buttonContainer}>
        <button
          type="button"
          onClick={onClose}
          className={formStyles.cancelButton}
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={formStyles.submitButton}
          disabled={isSubmitting}
          onClick={handleReturnBook}
        >
          {isSubmitting ? "Returning Book..." : "Return Book"}
        </button>
      </div>
    </>
  );
};

export default ReturnBookForm;
