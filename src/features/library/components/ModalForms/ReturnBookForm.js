import { Button, Loading } from "../../../../components";
import { UserBookCardLrg } from "../..";
import { useDispatch } from "react-redux";
import { nextBookRequestStatus } from "../../userBookCalls";
import { useSelector } from "react-redux";
import * as asyncStatus from "../../../../data/asyncStatus";

const ReturnBookForm = ({ userBook }) => {
  const dispatch = useDispatch();
  const userBookAsyncStatus = useSelector((state) => state.userBooks.status);
  console.log("userBookAsyncStatus", userBookAsyncStatus);
  if (!userBook) return null;
  const { owner, book, dueDate } = userBook;
  const handleReturnBook = () => {
    console.log("returning book", userBook);
    dispatch(nextBookRequestStatus(userBook.request.request_id));
  };

  if (userBookAsyncStatus === asyncStatus.LOADING) return <Loading />;
  return (
    <>
      <UserBookCardLrg book={book} user={owner} dueDate={dueDate} />
      <div>
        <p>
          Do you want to return {book.title} to {owner.username}?
        </p>
        <Button varient="accept" onClick={handleReturnBook}>
          Return Book
        </Button>
      </div>
    </>
  );
};

export default ReturnBookForm;
