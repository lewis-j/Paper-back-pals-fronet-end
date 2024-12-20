import styles from "./RequestList.module.scss";
import { UserCard } from "../UserCard";
import { useSelector } from "react-redux";
import { useFriendRequestModal } from "../../hooks/useFriendRequestModal";

const RequestList = () => {
  const { friendRequestInbox } = useSelector((state) => state.friends);
  const { renderModal, friendModalActions } = useFriendRequestModal();

  const handleAcceptRequest = async (request_id) => {
    // await dispatch(acceptFriendRequest({ request_id })).unwrap();
    friendModalActions.acceptFriendRequest(request_id);
  };

  if (!friendRequestInbox || friendRequestInbox.length === 0)
    return <div>No pending requests</div>;

  return (
    <div className={styles.container}>
      {renderModal()}
      <h2 className={styles.title}>Friend Requests</h2>
      {friendRequestInbox.map(({ _id, sender }) => (
        <div key={`FriendRequest:${_id}`} className={styles.user_item}>
          <UserCard
            username={sender.username}
            profilePic={sender.profilePic}
            _id={sender._id}
          />
          <button onClick={() => handleAcceptRequest(_id)}>Accept</button>
        </div>
      ))}
    </div>
  );
};

export default RequestList;
