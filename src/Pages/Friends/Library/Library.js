import React, { useState, useRef } from "react";

import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { getProgressInPercent } from "../../../utilities/bookUtilities";
import {
  UserCardSm,
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

const Library = () => {
  const currentFriend = useSelector((state) => state.friends.currentFriend);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState("");
  const [modalHeight, setModalHeight] = useState({ top: "0px" });
  const { username, ownedBooks } = currentFriend;
  const containerRef = useRef();

  const requestList = useSelector((state) => state.userBooks.bookRequests);

  const activeBookInfo = useSelector(getFriendsOwnedBookById(activeCardId));

  const filterRequest = (book_id) => {
    let requestobj = requestList.find(({ userBook }) => {
      return userBook._id === book_id;
    });

    const request = requestobj?.status || null;
    console.log("made request", requestobj);
    const openRequestCardModal = ({ target }) => {
      const { y: containerY } = containerRef.current.getBoundingClientRect();
      const { y } = target.getBoundingClientRect();
      setModalHeight({ top: `${y - containerY}px` });
      setIsModalOpen(true);
    };

    return (
      {
        [bookRequestStatus.CHECKED_IN]: {
          menu: [
            {
              text: "Cancel",
              clickHandler: () => console.log("delete this request"),
            },
            {
              text: "Status",
              clickHandler: openRequestCardModal,
            },
          ],
          icon: faCheckCircle,
        },
      }[request] || {
        menu: [
          {
            text: "Request",
            clickHandler: openRequestCardModal,
          },
        ],
        icon: null,
      }
    );
  };

  const mapCheckedOutBooks = (bookData, i) => {
    const progressValue = getProgressInPercent(
      bookData.currentPage,
      bookData.pageCount
    );

    // const { menu } = filterRequest(bookData._id);
    return (
      <Col
        sm="4"
        md="3"
        xl="2"
        className="mb-3"
        key={`UserCardSm:${bookData._id}`}
      >
        <UserCardSm bookData={{ ...bookData, progressValue }} />
      </Col>
    );
  };

  const mapCheckedInBooks = (userBook, i) => {
    const { _id, book, status } = userBook;
    const { menu, icon } = filterRequest(_id);

    const { coverImg, title } = book;
    const cardInfo = { _id, coverImg, title, status };

    return (
      <Col
        sm="6"
        md="4"
        lg="3"
        xl="2"
        className={styles.card}
        key={`BookCards:${_id}`}
      >
        <BookCard
          menuItems={menu}
          cardInfo={cardInfo}
          setActive={setActiveCardId}
          isActive={activeCardId === _id}
          icon={icon}
        />
      </Col>
    );
  };
  const BookCards = ownedBooks.reduce(
    (obj, book) =>
      book.status === "CHECKED_OUT"
        ? {
            ...obj,
            checkedOut: [...obj.checkedOut, mapCheckedOutBooks(book)],
          }
        : {
            ...obj,
            checkedIn: [...obj.checkedIn, mapCheckedInBooks(book)],
          },

    { checkedIn: [], checkedOut: [] }
  );
  console.log("isModalOpen:", isModalOpen);

  return (
    <>
      <div className="container" ref={containerRef}>
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          style={modalHeight}
          title="Request Status"
        >
          <RequestCard userBook={activeBookInfo} />
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
          <BookContainer>{BookCards.checkedIn}</BookContainer>
        </Row>
        <div>
          <h4 className={styles.subtitle}>Checked Out Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer>{BookCards.checkedOut}</BookContainer>
        </Row>
      </div>
    </>
  );
};

export default Library;
