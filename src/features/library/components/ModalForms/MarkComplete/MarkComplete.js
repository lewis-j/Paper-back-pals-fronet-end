import React, { useState } from "react";
import formStyles from "../Shared/FormContainer/FormContainer.module.scss";
import FormContainer from "../Shared/FormContainer/FormContainer";

const MarkComplete = ({ userBook, onClose, onMarkComplete }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onMarkComplete(
        userBook.request.request_id,
        userBook._id,
        userBook.book.pageCount
      );
      onClose();
    } catch (error) {
      console.error("Error updating reading progress:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer bookData={userBook}>
      <div className={formStyles.label}>Mark book as complete</div>
      <p className={formStyles.confirmation}>
        This will update your progress to {userBook.book.pageCount} pages,
        marking the book as complete.
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
          onClick={handleSubmit}
        >
          {isSubmitting ? "Updating Progress..." : "Mark Complete"}
        </button>
      </div>
    </FormContainer>
  );
};

export default MarkComplete;
