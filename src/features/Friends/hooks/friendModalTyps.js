class ModalType {
  constructor(value, title) {
    this.value = value;
    this.title = title;
  }
  toString() {
    return this.value;
  }
}

export const MODAL_TYPES = {
  // Book Reading Progress
  MAKE_FRIEND_REQUEST: new ModalType("MAKE_FRIEND_REQUEST", "friend request"),
  ACCEPT_FRIEND_REQUEST: new ModalType(
    "ACCEPT_FRIEND_REQUEST",
    "accept friend request"
  ),
};

export const useFriendModalActions = (openModal) => {
  return {
    makeFriendRequest: (userId) =>
      openModal(MODAL_TYPES.MAKE_FRIEND_REQUEST, userId),
    acceptFriendRequest: (userId) =>
      openModal(MODAL_TYPES.ACCEPT_FRIEND_REQUEST, userId),
  };
};
