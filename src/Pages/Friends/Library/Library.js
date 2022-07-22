import React, { useState, useRef } from "react";

import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { getProgressInPercent } from "../../../utilities/bookUtilities";
import { UserCardSm, BookCard, BookContainer } from "../../../features/library";
import { upperFirst } from "../../../utilities/stringUtil";
import styles from "./Library.module.scss";
import { Modal } from "../../../components";
import { RequestCard } from "../../../features/BookRequest";

const Library = () => {
  const currentFriend = useSelector((state) => state.friends.currentFriend);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeight, setModalHeight] = useState({ top: "0px" });

  const { username, ownedBooks } = currentFriend;
  const containerRef = useRef();

  const menuList = [
    {
      text: "Request",
      clickHandler: (e) => {
        const { y: containerY } = containerRef.current.getBoundingClientRect();
        const { y } = e.target.getBoundingClientRect();
        console.log(
          "target::",
          {
            cardy: y,
            container: containerY,
          },
          "result",
          y + containerY
        );
        setModalHeight({ top: `${y - containerY}px` });
        setIsModalOpen(!isModalOpen);
      },
    },
  ];

  const mapCheckedOutBooks = (bookData, i) => {
    const progressValue = getProgressInPercent(
      bookData.currentPage,
      bookData.pageCount
    );
    return (
      <Col sm="4" md="3" xl="2" className="mb-3" key={i}>
        <UserCardSm
          bookData={{ ...bookData, progressValue }}
          menuList={menuList}
        />
      </Col>
    );
  };

  const mapCheckedInBooks = ({ book, status }, i) => {
    const { coverImg, title } = book;

    return (
      <Col sm="4" md="4" xl="2" className="mb-3" key={i}>
        <BookCard
          menuItems={menuList}
          coverImg={coverImg}
          title={title}
          status={status}
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
          <RequestCard />
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
