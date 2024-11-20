import React, { useState } from "react";
import formStyles from "../Shared/FormContainer/FormContainer.module.scss";

const RemoveBookConfirm = ({ userBook, onClose, onConfirm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRemove = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(userBook._id);
      onClose();
    } catch (error) {
      console.error("Error removing book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <p className={formStyles.confirmation}>
        Are you sure you want to remove "{userBook.book.title}" from your
        library?
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
          onClick={handleRemove}
        >
          {isSubmitting ? "Removing..." : "Remove Book"}
        </button>
      </div>
    </>
  );
};

export default RemoveBookConfirm;
