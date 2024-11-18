import { Col, Container, Row } from "reactstrap";
import {
  BookCard,
  UserBookCardSm,
  BookContainer,
} from "../../features/library";
import styles from "./Library.module.scss";
import { useState } from "react";
import { useBookSelectors } from "../../features/library/hooks/useBookSelectors";

const Library = () => {
  const [activeCard, setActiveCard] = useState("");

  const { booksInLibrary, booksToFriends } = useBookSelectors();

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

  const BookCol = ({ children, key }) => (
    <Col sm="4" md="3" xl="2" className="mb-3" key={key}>
      {children}
    </Col>
  );

  const mapCheckedOutBooks = (userBook, i) => {
    const { _id, book, sender, dueDate, currentPage } = userBook;
    return (
      <BookCol key={`LibraryCard:${userBook._id}`}>
        <UserBookCardSm
          _id={_id}
          book={book}
          menuItems={menuList}
          user={sender}
          dueDate={dueDate}
          currentPage={currentPage}
          setActive={setActiveCard}
          isActive={activeCard === _id}
        />
      </BookCol>
    );
  };

  const renderCheckedInBookCard = ({ _id, book, status }, i) => {
    const { coverImg, title } = book;
    const cardInfo = { coverImg, title, status };

    return (
      <BookCol key={`LibraryBookCard${_id}`}>
        <BookCard
          _id={_id}
          book={cardInfo}
          menuItems={menuList}
          isActive={activeCard === _id}
          setActive={setActiveCard}
        />
      </BookCol>
    );
  };

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
          <BookContainer>
            {booksInLibrary.map(renderCheckedInBookCard)}
          </BookContainer>
        </Row>
        <div>
          <h4 className={styles.subtitle}>Checked Out Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer>
            {booksToFriends.map(mapCheckedOutBooks)}
          </BookContainer>
        </Row>
      </Container>
    </>
  );
};

export default Library;
