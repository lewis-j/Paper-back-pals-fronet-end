import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { getProgressInPercent } from "../../utilities/bookUtilities";
import { BookCard, UserCardSm, BookContainer } from "../../features/library";
import styles from "./Library.module.scss";
import { useState } from "react";

const Library = () => {
  const {
    books: { owned: books },
  } = useSelector((state) => state.userBooks);

  const [activeCard, setActiveCard] = useState("");

  const menuList = [
    {
      text: "Message",
      clickHandler: (i) => {
        console.log("itemclicked: ", i);
      },
    },
    {
      text: "Request",
      clickHandler: (i) => {
        console.log("itemclicked: ", i);
      },
    },
  ];

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
        key={`LibraryCard:${bookData._id}`}
      >
        <UserCardSm
          bookData={{ ...bookData, progressValue }}
          menuList={menuList}
        />
      </Col>
    );
  };

  const mapCheckedInBooks = ({ _id, book, status }, i) => {
    const { coverImg, title } = book;
    const cardInfo = { _id, coverImg, title, status };

    return (
      <Col sm="4" md="3" xl="2" className="mb-3" key={`LibraryBookCard${_id}`}>
        <BookCard
          cardInfo={cardInfo}
          menuItems={menuList}
          isActive={activeCard === _id}
          setActive={setActiveCard}
        />
      </Col>
    );
  };

  const BookCards = books.reduce(
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
      <Container>
        <div className={styles.title}>
          <h1>Your Library</h1>
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
      </Container>
    </>
  );
};

export default Library;
