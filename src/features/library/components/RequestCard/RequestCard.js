import { useDispatch } from "react-redux";
import { Button } from "../../../../components";
import { createBookRequest } from "../../userBooksSlice";

import styles from "./RequestCard.module.scss";

const RequestCard = ({ userBook }) => {
  const dispatch = useDispatch();
  const handleBookRequest = async () => {
    console.log("userBook", userBook);

    const userBook_id = userBook._id;
    dispatch(
      createBookRequest({ userBook_id, recipient_id: userBook.owner._id })
    );
  };

  return (
    <div className={styles.container}>
      <span className={styles.pendingRequest}>..pending badge</span>
      <div className={styles.progressBar} />
      <div className={styles.status}>
        {userBook._id}
        <div>
          <Button varient="accept" onClick={handleBookRequest}>
            Make Request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
