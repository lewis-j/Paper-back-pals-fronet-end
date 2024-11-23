import React, { useState, useRef } from "react";

import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import {
  UserBookCardSm,
  BookCard,
  BookContainer,
  RequestCard,
  bookRequestStatus,
} from "../../../features/library";
import { getFriendsOwnedBookById } from "../../../features/Friends";
import { upperFirst } from "../../../utilities/stringUtil";
import styles from "./Library.module.scss";
import { Modal } from "../../../components";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { categorizeOwnedBooksByStatus } from "../../../features/library/utilities/bookFilterUtil";
import { useBookSelectors } from "../../../features/library/hooks/useBookSelectors";
import { useModalMenu } from "../../../features/library/hooks/useModalMenu";

const Library = () => {
  const currentFriend = useSelector((state) => state.friends.currentFriend);
  const currentUser = useSelector((state) => state.authUser.currentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeight, setModalHeight] = useState({ top: "0px" });
  const { username, ownedBooks } = currentFriend;
  const books = ownedBooks.map((book) => ({
    ...book,
    owner: {
      _id: currentFriend._id,
      username: currentFriend.username,
      profilePic: currentFriend.profilePic,
    },
  }));
  const containerRef = useRef();
  const { menuItems, renderModal, activeCardId, setActiveCardId } =
    useModalMenu();

  const activeBookInfo = useSelector(getFriendsOwnedBookById(activeCardId));

  const { booksInLibrary: checkedInBooks, booksToFriends: checkedOutBooks } =
    useBookSelectors({
      books: { owned: books },
    });

  const friendsBooksMenuItems = menuItems.friendsBooks(checkedInBooks);
  // const checkedOutMenuItems = menuItems.booksToFriends(checkedOutBooks);

  const openRequestCardModal = ({ target }) => {
    const { y: containerY } = containerRef.current.getBoundingClientRect();
    const { y } = target.getBoundingClientRect();
    setModalHeight({ top: `${y - containerY}px` });
    setIsModalOpen(true);
  };

  const filterRequest = (request) => {
    const foundRequest = request.find(
      (req) => req.sender._id === currentUser._id
    );
    console.log("foundRequest", foundRequest);
    switch (foundRequest?.status) {
      case bookRequestStatus.CHECKED_IN:
        return {
          menu: [
            {
              text: "Cancel",
              clickHandler: () => alert("delete this request"),
            },
            {
              text: "Status",
              clickHandler: openRequestCardModal,
            },
          ],
          icon: faCheckCircle,
          iconStyle: styles.requestSentIcon,
        };
      default:
        return {
          menu: [...friendsBooksMenuItems],
          icon: null,
        };
    }
  };

  const BookCol = ({ children, key }) => (
    <Col sm="6" md="4" lg="3" xl="2" className="mb-3" key={key}>
      {children}
    </Col>
  );

  const renderCheckedOutUserBookCard = (userBook, i) => {
    const { _id, book, dueDate, currentPage, sender } = userBook;

    // const { menu } = filterRequest(bookData._id);
    return (
      <BookCol key={`UserBookCardSm:${_id}`}>
        <UserBookCardSm
          _id={_id}
          book={book}
          user={sender}
          dueDate={dueDate}
          currentPage={currentPage}
          setActive={setActiveCardId}
          isActive={activeCardId === _id}
        />
      </BookCol>
    );
  };

  const renderCheckedInBookCard = (userBook) => {
    console.log("userBook", userBook);
    const { _id, book, request } = userBook;
    const { menu, icon, iconStyle } = filterRequest(request);
    const { coverImg, title } = book;

    return (
      <BookCol key={`BookCards:${_id}`}>
        <BookCard
          menuItems={menu}
          book={{ coverImg, title }}
          _id={_id}
          setActive={setActiveCardId}
          isActive={activeCardId === _id}
          icon={icon}
          iconStyle={iconStyle}
        />
      </BookCol>
    );
  };

  return (
    <>
      <div className="container" ref={containerRef}>
        {renderModal()}
        <div className={styles.title}>
          <h1>
            {upperFirst(username)}
            's Library
          </h1>
        </div>
        <div>
          <h4 className={styles.subtitle}>Checked in Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer>
            {checkedInBooks.map(renderCheckedInBookCard)}
          </BookContainer>
        </Row>
        <div>
          <h4 className={styles.subtitle}>Checked Out Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer>
            {checkedOutBooks.map(renderCheckedOutUserBookCard)}
          </BookContainer>
        </Row>
      </div>
    </>
  );
};

export default Library;
