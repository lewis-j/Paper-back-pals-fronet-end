import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { getProgressInPercent } from "../../utilities/bookUtilities";
import {
  BookCard,
  UserBookCardSm,
  BookContainer,
} from "../../features/library";
import styles from "./Library.module.scss";
import { useState } from "react";

const Library = () => {
  console.log("Library");
  const {
    books: { owned: books },
  } = useSelector((state) => state.userBooks);

  const [activeCard, setActiveCard] = useState("");

  const menuList = [
    {
      text: "Message",
      clickHandler: (i) => {
        alert("itemclicked: ", i);
      },
    },
    {
      text: "Request",
      clickHandler: (i) => {
        alert("itemclicked: ", i);
      },
    },
  ];

  const mapCheckedOutBooks = (bookData, i) => {
    console.log("checket out mapping", bookData.currentRequest);
    const progressValue = getProgressInPercent(
      bookData.currentRequest.currentPage,
      bookData.currentRequest.pageCount
    );
    console.log("progressValue", progressValue);
    return (
      <Col
        sm="4"
        md="3"
        xl="2"
        className="mb-3"
        key={`LibraryCard:${bookData._id}`}
      >
        <UserBookCardSm
          _id={bookData._id}
          book={bookData.book}
          menuItems={menuList}
          user={bookData.currentRequest.sender}
          setActive={setActiveCard}
          isActive={activeCard === bookData._id}
          readingProgress={progressValue}
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

  const _books = books || [];
  console.log("books", _books);

  const BookCards = _books.reduce(
    (obj, book) => {
      console.log("book", book.currentRequest?.status);
      return book.currentRequest?.status === "CHECKED_OUT"
        ? {
            ...obj,
            checkedOut: [...obj.checkedOut, mapCheckedOutBooks(book)],
          }
        : {
            ...obj,
            checkedIn: [...obj.checkedIn, mapCheckedInBooks(book)],
          };
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
