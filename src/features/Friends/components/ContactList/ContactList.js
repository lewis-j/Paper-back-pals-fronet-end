import styles from "./ContactList.module.scss";
import { UserCard } from "../UserCard";
import { useSelector } from "react-redux";

const ContactList = ({ activeId = null, setUser }) => {
  const { friendsList } = useSelector((state) => state.friends);
  if (!friendsList || friendsList.length === 0)
    return <div>no friends yet</div>;
  const renderFriends = (friendsList) => {
    return friendsList.map(({ _id, username, profilePic }) => (
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
          menuItems={[
            { label: "Remove Friend", onClick: () => alert("clicked") },
          ]}
        />
      </div>
    ));
  };

  return <div className={styles.container}>{renderFriends(friendsList)}</div>;
};

export default ContactList;
