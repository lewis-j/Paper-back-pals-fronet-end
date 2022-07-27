import React, { useState, useRef } from "react";

import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { getProgressInPercent } from "../../../utilities/bookUtilities";
import { UserCardSm, BookCard, BookContainer } from "../../../features/library";
import { upperFirst } from "../../../utilities/stringUtil";
import styles from "./Library.module.scss";
import { Modal } from "../../../components";
import { RequestCard } from "../../../features/library";

const Library = () => {
  const currentFriend = useSelector((state) => state.friends.currentFriend);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCard, setActiveCard] = useState("");
  const [modalHeight, setModalHeight] = useState({ top: "0px" });
  const [activeUserBook, setActiveUserBook] = useState();
  const { username, ownedBooks } = currentFriend;
  const containerRef = useRef();

  const menuList = (userBook) => {
    return [
      {
        text: "Request",
        clickHandler: ({ target }) => {
          const { y: containerY } =
            containerRef.current.getBoundingClientRect();
          const { y } = target.getBoundingClientRect();
          setModalHeight({ top: `${y - containerY}px` });
          setActiveUserBook(userBook);
          setIsModalOpen(!isModalOpen);
        },
      },
    ];
  };

  const mapCheckedOutBooks = (bookData, i) => {
    const progressValue = getProgressInPercent(
      bookData.currentPage,
      bookData.pageCount
    );
    return (
      <Col
        sm="4"
        md="3"
        xl="2"
        className="mb-3"
        key={`UserCardSm:${bookData._id}`}
      >
        <UserCardSm
          bookData={{ ...bookData, progressValue }}
          menuList={menuList(bookData)}
        />
      </Col>
    );
  };

  const mapCheckedInBooks = (userBook, i) => {
    const { _id, book, status } = userBook;
    const { coverImg, title } = book;
    const cardInfo = { _id, coverImg, title, status };

    return (
      <Col sm="4" md="4" xl="2" className="mb-3" key={`BookCards:${_id}`}>
        <BookCard
          menuItems={menuList(userBook)}
          cardInfo={cardInfo}
          setActive={setActiveCard}
          isActive={activeCard === _id}
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

  return (
    <>
      <div className="container" ref={containerRef}>
        <Modal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          style={modalHeight}
          title="Request Status"
        >
          <RequestCard userBook={activeUserBook} />
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
