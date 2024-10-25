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
import { categorizeOwnedBooksByStatus } from "../../features/library/utilities/bookFilterUtil";

const Library = () => {
  console.log("Library");
  const {
    books: { owned: books },
  } = useSelector((state) => state.userBooks);

  const [activeCard, setActiveCard] = useState("");

  const categorizedBooks = categorizeOwnedBooksByStatus(books);
  const checkedOutBooks = categorizedBooks.CHECKED_OUT || [];
  const checkedInBooks = categorizedBooks.CHECKED_IN || [];

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
    return (
      <BookCol key={`LibraryCard:${userBook._id}`}>
        <UserBookCardSm
          _id={userBook._id}
          book={userBook.book}
          menuItems={menuList}
          user={userBook.sender}
          setActive={setActiveCard}
          isActive={activeCard === userBook._id}
        />
      </BookCol>
    );
  };

  const renderCheckedInBookCard = ({ _id, book, status }, i) => {
    const { coverImg, title } = book;
    const cardInfo = { _id, coverImg, title, status };

    return (
      <BookCol key={`LibraryBookCard${_id}`}>
        <BookCard
          cardInfo={cardInfo}
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
            {checkedInBooks.map(renderCheckedInBookCard)}
          </BookContainer>
        </Row>
        <div>
          <h4 className={styles.subtitle}>Checked Out Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer>
            {checkedOutBooks.map(mapCheckedOutBooks)}
          </BookContainer>
        </Row>
      </Container>
    </>
  );
};

export default Library;
