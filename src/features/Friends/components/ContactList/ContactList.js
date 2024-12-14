import styles from "./ContactList.module.scss";
import { UserCard } from "../UserCard";
import { useSelector } from "react-redux";
import { useFriendRequestModal } from "../../hooks/useFriendRequestModal";

const ContactList = ({ activeId = null, setUser }) => {
  const { friendsList } = useSelector((state) => state.friends);
  const { renderModal, friendModalActions } = useFriendRequestModal();
  if (!friendsList || friendsList.length === 0)
    return <div>no friends yet</div>;

  const renderFriends = (friendsList) => {
    return friendsList.map(({ _id, username, profilePic }) => {
      const menuItems = [
        {
          label: "Remove Friend",
          onClick: () =>
            friendModalActions.removeFriend({ _id, username, profilePic }),
        },
        { label: "Block", onClick: () => alert("clicked") },
      ];

      return (
        <div
          key={`FriendsList:${_id}`}
          onClick={() => setUser(_id)}
          className={
            activeId === _id
              ? [styles.user_item, styles.isActive].join(" ")
              : styles.user_item
          }
        >
          <UserCard
            username={username}
            profilePic={profilePic}
            isActive={activeId === _id}
            _id={_id}
            menuItems={menuItems}
          />
        </div>
      );
    });
  };

  return (
    <>
      <div className={styles.container}>{renderFriends(friendsList)}</div>
      {renderModal()}
    </>
  );
};

export default ContactList;
