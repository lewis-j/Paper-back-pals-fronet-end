import React from "react";
import styles from "./UserRequestCard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Button } from "../../../../components";
import {
  faUserPlus,
  faCheckCircle,
  faUserCheck,
  faUserGroup,
  faCheck,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { sendFriendRequest, acceptFriendRequest } from "../../../Friends";

const UserRequestCard = ({ username, profilePic, _id: person_id }) => {
  const dispatch = useDispatch();
  const handleRequestFriend = () => {
    dispatch(sendFriendRequest({ person_id }));
  };
  const handleAcceptFriend = (request_id) => {
    dispatch(acceptFriendRequest({ request_id }));
  };

  const { friendsList, friendRequestInbox, friendRequestOutbox } = useSelector(
    (state) => state.friends
  );

  const { _id: user_id } = useSelector((state) => state.authUser.currentUser);
  const createFilteredUserIdSelector = (person_id) => (list) => {
    return list.find((person) => person._id === person_id);
  };
  const getBtn = () => {
    const userInList = createFilteredUserIdSelector(person_id);
    return [
      {
        list: [{ _id: user_id }],
        jsx: () => (
          <div className={styles.userIcon}>
            <FontAwesomeIcon icon={faCircleUser} size="xl" />
          </div>
        ),
      },
      {
        list: friendsList,
        jsx: () => (
          <div className={styles.friendIcon}>
            <FontAwesomeIcon icon={faUserGroup} size="sm" />
            <FontAwesomeIcon icon={faCheck} size="sm" />
          </div>
        ),
      },
      {
        list:
          friendRequestOutbox?.map((p) => ({
            _id: p.recipient.id,
            request_id: p._id,
          })) ?? [],
        jsx: ({ request_id }) => (
          <div className={styles.pendingIcon}>
            <FontAwesomeIcon icon={faCheckCircle} /> Requested
          </div>
        ),
      },
      {
        list:
          friendRequestInbox?.map((p) => ({
            _id: p.sender.id,
            request_id: p._id,
          })) ?? [],
        jsx: ({ request_id }) => {
          return (
            <Button
              varient="accept"
              icon={faUserCheck}
              onClick={() => handleAcceptFriend(request_id)}
            >
              Accept
            </Button>
          );
        },
      },
    ].reduce(
      (result, { list, jsx }) => {
        const userFoundInList = userInList(list);
        if (userFoundInList) {
          return jsx(userFoundInList);
        }
        return result;
      },
      /*need request id if persoon in list matches*/
      <Button icon={faUserPlus} onClick={handleRequestFriend} varient="add">
        Request
      </Button>
    );
  };

  return (
    <div className={styles.container} key={person_id}>
      <Avatar imgSrc={profilePic} username={username} />
      <span className={styles.username}>{username}</span>
      {getBtn()}
    </div>
  );
};

export default UserRequestCard;
