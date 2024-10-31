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

const Library = () => {
  const currentFriend = useSelector((state) => state.friends.currentFriend);
  const currentUser = useSelector((state) => state.authUser.currentUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState("");
  const [modalHeight, setModalHeight] = useState({ top: "0px" });
  const { username, ownedBooks } = currentFriend;
  const containerRef = useRef();

  const activeBookInfo = useSelector(getFriendsOwnedBookById(activeCardId));

  const categorizedBooks = categorizeOwnedBooksByStatus(ownedBooks);
  const checkedInBooks = categorizedBooks.CHECKED_IN || [];
  const checkedOutBooks = categorizedBooks.CHECKED_OUT || [];

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
          menu: [
            {
              text: "Request",
              clickHandler: openRequestCardModal,
            },
          ],
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
    const {
      _id,
      book: { coverImg, title },
      dueDate,
      sender,
    } = userBook;
    const book = { _id, coverImg, title, dueDate };

    // const { menu } = filterRequest(bookData._id);
    return (
      <BookCol key={`UserBookCardSm:${_id}`}>
        <UserBookCardSm
          _id={_id}
          book={book}
          user={sender}
          setActive={setActiveCardId}
          isActive={activeCardId === _id}
        />
      </BookCol>
    );
  };

  const renderCheckedInBookCard = (userBook) => {
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
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          style={modalHeight}
          title="Request Status"
        >
          <RequestCard
            userBook={activeBookInfo}
            decline={() => {
              setIsModalOpen(false);
              setActiveCardId("");
            }}
          />
        </Modal>
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
