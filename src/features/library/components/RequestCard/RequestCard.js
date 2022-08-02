import { useDispatch } from "react-redux";
import { Button } from "../../../../components";
import { createBookRequest } from "../../../Friends";
import { createNotifications } from "../../../Notifications";
import { addBookRequest } from "../../userBooksSlice";

import styles from "./RequestCard.module.scss";

const RequestCard = ({ userBook }) => {
  const dispatch = useDispatch();
  const handleBookRequest = async () => {
    console.log("userBook", userBook);
    const messages = {
      sender: "You made a new book request!",
      recipient: "You have a new book request",
    };
    const userBook_id = userBook._id;
    const request = await dispatch(createBookRequest({ userBook_id })).unwrap();
    console.log("request", request);
    const { request_id } = request;
    dispatch(addBookRequest({ userBook_id }));
    dispatch(
      createNotifications({
        recipient_id: userBook.owner._id,
        notificationDto: {
          requestType: "BookRequest",
          requestRef: request_id,
          messages,
        },
      })
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
