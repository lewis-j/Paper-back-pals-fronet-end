import { Col, Container, Row } from "reactstrap";
import {
  BookCard,
  UserBookCardSm,
  BookContainer,
} from "../../features/library";
import styles from "./Library.module.scss";
import { useState } from "react";
import { useBookSelectors } from "../../features/library/hooks/useBookSelectors";
import { useModalMenu } from "../../features/library/hooks/useModalMenu";

const Library = () => {
  const { menuItems, renderModal, activeCardId, setActiveCardId } =
    useModalMenu();

  const { booksInLibrary, booksToFriends } = useBookSelectors();

  const toFriendsMenuItems = menuItems.booksToFriends(booksToFriends);
  const inLibraryMenuItems = menuItems.booksInLibrary(booksInLibrary);

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
          menuItems={toFriendsMenuItems}
          user={sender}
          dueDate={dueDate}
          currentPage={currentPage}
          setActive={setActiveCardId}
          isActive={activeCardId === _id}
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
          menuItems={inLibraryMenuItems}
          isActive={activeCardId === _id}
          setActive={setActiveCardId}
        />
      </BookCol>
    );
  };

  return (
    <>
      {renderModal()}
      <Container>
        <div className={styles.title}>
          <h1>Your Library</h1>
        </div>
        <div>
          <h4 className={styles.subtitle}>Checked in Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer
            noContent={{
              text: "No Books in Library",
              description: "Add some books to get started!",
            }}
          >
            {booksInLibrary.map(renderCheckedInBookCard)}
          </BookContainer>
        </Row>
        <div>
          <h4 className={styles.subtitle}>Checked Out Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer
            noContent={{
              text: "No Checked Out Books",
              description: "Share books with friends to see them here",
            }}
          >
            {booksToFriends.map(mapCheckedOutBooks)}
          </BookContainer>
        </Row>
      </Container>
    </>
  );
};

export default Library;
