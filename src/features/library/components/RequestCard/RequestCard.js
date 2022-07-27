import { useDispatch } from "react-redux";
import { Button } from "../../../../components";
import { createBookRequest } from "../../../Friends";

import styles from "./RequestCard.module.scss";

const RequestCard = ({ userBook }) => {
  const dispatch = useDispatch();
  const handleBookRequest = () => {
    console.log("userBook_id:", userBook._id);
    dispatch(createBookRequest({ userBook_id: userBook._id }));
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
