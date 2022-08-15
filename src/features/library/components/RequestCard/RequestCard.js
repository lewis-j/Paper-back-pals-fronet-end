import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../../components";
import { createBookRequest } from "../../userBooksSlice";
import * as asyncStatus from "../../../../data/asyncStatus";

import styles from "./RequestCard.module.scss";
import { shortenString } from "../../../../utilities/stringUtil";
import { BookInfo } from "../BookInfo";

const RequestCard = ({ userBook }) => {
  const userBookStatus = useSelector((state) => state.userBooks.status);
  const dispatch = useDispatch();
  const {
    _id: userBook_id,
    owner: { _id: recipient_id },
    book: { title, authors, coverImg, description },
  } = userBook;
  const handleBookRequest = async () => {
    dispatch(createBookRequest({ userBook_id, recipient_id }));
  };

  const isLoading = userBookStatus === asyncStatus.LOADING;
  console.log("userBook", userBook);
  return (
    <div className={styles.container}>
      <BookInfo {...userBook.book} />
      <div className={styles.button}>
        <Button
          disabled={isLoading}
          varient="decline"
          onClick={() => console.log("close modal")}
        >
          Cancel
        </Button>
        <Button disabled={isLoading} varient="add" onClick={handleBookRequest}>
          Make Request
        </Button>
      </div>
    </div>
  );
};

export default RequestCard;
