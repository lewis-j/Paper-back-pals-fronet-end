import styles from "./ContactList.module.scss";
import { UserCard } from "../UserCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// const friendsList = [
//   {
//     _id: "62977d7ae58ee7d197fb59a2",
//     currentRead: null,
//     email: "lindseylewisjackson@gmail.com",
//     email_verified: true,
//     friends: [],
//     profilePic:
//       "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
//     username: "Lindsey Jackson",
//   },
//   {
//     _id: "62977d7ae58ee7d1asdfasdf7fb59a2",
//     currentRead: null,
//     email: "lindseylewisjackson@gmail.com",
//     email_verified: true,
//     friends: [],
//     profilePic:
//       "https://lh3.googleusercontent.com/a-/AOh14GjTz3-DpsVbTe5N83aKCrW7_DlrUFJOzfuqxLCj=s96-c",
//     username: "lewis Jackson",
//   },
// ];

const ContactList = ({ activeId, setUser }) => {
  const { friendsList, status, error } = useSelector((state) => state.friends);

  const renderFriends = (friendsList) => {
    return friendsList.map(({ _id, username, profilePic }, index) => (
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
        />
      </div>
    ));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Friends</h2>
      {renderFriends(friendsList)}
    </div>
  );
};

export default ContactList;
