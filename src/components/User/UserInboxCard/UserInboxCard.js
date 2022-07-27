import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { acceptFriendRequest } from "../../../features/Friends";
import { Button } from "../../Button";
import styles from "./UserInboxCard.module.scss";

const UserInboxCard = ({ _id, username, profilePic, isActive = false }) => {
  const dispatch = useDispatch();

  const handleAccept = () => {
    console.log("_id in notifications", _id);

    dispatch(acceptFriendRequest({ request_id: _id }));
  };

  const handleDecline = () => {};
  return (
    <div
      className={
        isActive ? `${styles.isActive} ${styles.container}` : styles.container
      }
    >
      <div className={styles.avatar}>
        <img alt="profile" className={styles.img} />
      </div>
      <span className={styles.username}>{username}</span>
      <div>
        <Button icon={faCircleCheck} varient="accept" onClick={handleAccept}>
          Accept
        </Button>
        <Button icon={faCircleXmark} varient="decline" onClick={handleDecline}>
          Decline
        </Button>
      </div>
    </div>
  );
};

export default UserInboxCard;
