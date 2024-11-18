import { Button, Loading } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { nextBookRequestStatus } from "../../../userBookCalls";
import * as asyncStatus from "../../../../../data/asyncStatus";
import styles from "./ReturnBookForm.module.scss";
import BookModalHeader from "../Shared/BookModalHeader/BookModalHeader";

const ReturnBookForm = ({ userBook }) => {
  const dispatch = useDispatch();
  const userBookAsyncStatus = useSelector((state) => state.userBooks.status);

  if (!userBook) return null;
  const { owner, book, dueDate, currentPage } = userBook;

  const handleReturnBook = () => {
    dispatch(nextBookRequestStatus(userBook.request.request_id));
  };

  if (userBookAsyncStatus === asyncStatus.LOADING) return <Loading />;

  return (
    <div className={styles.container}>
      <BookModalHeader
        book={book}
        owner={owner}
        dueDate={dueDate}
        currentPage={currentPage}
      />
      <div className={styles.confirmationSection}>
        <p>
          Do you want to return {book.title} to {owner.username}?
        </p>
        <Button variant="accept" onClick={handleReturnBook}>
          Return Book
        </Button>
      </div>
    </div>
  );
};

export default ReturnBookForm;
