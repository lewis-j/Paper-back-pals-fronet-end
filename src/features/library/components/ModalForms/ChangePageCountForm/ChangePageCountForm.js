import React, { useState } from "react";
import styles from "./ChangePageCountForm.module.scss";
import FormContainer from "../Shared/FormContainer/FormContainer";

const ChangePageCountForm = ({ userBook, onClose, onUpdatePages }) => {
  const { _id: userBook_id, request, currentPage } = userBook;
  const [value, setValue] = useState(currentPage);

  if (!userBook) return null;

  const handleSubmit = () => {
    onUpdatePages(request.request_id, value, userBook_id);
  };

  return (
    <FormContainer bookData={userBook}>
      <div className={styles.label}>Update current page</div>
      <input
        className={styles.pageInput}
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min="0"
        max={userBook.book.pageCount}
      />
      <button
        className={styles.submitButton}
        type="submit"
        onClick={handleSubmit}
      >
        Update Progress
      </button>
    </FormContainer>
  );
};

export default ChangePageCountForm;
