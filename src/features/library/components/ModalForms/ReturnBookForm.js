import { Button } from "../../../../components";
import { UserBookCardLrg } from "../..";

const ReturnBookForm = ({ userBook }) => {
  if (!userBook) return null;
  const { owner, book, dueDate } = userBook;

  return (
    <>
      <UserBookCardLrg book={book} user={owner} dueDate={dueDate} />
      <div>
        <p>
          Do you want to return {book.title} to {owner.username}?
        </p>
        <Button varient="accept">Return Book</Button>
      </div>
    </>
  );
};

export default ReturnBookForm;
