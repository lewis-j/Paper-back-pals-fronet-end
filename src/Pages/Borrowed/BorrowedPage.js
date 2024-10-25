import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { IconBookOff } from "@tabler/icons";
import { UserBookCardSm, BookContainer } from "../../features/library";
import styles from "./BorrowedPage.module.scss";
import { useState } from "react";
import { categorizeBorrowedBooksByStatus } from "../../features/library/utilities/bookFilterUtil";
import { Button, NoContent } from "../../components";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BorrowedPage = () => {
  const navigate = useNavigate();
  const { borrowed: borrowedBooks } = useSelector(
    (state) => state.userBooks.books
  );

  const borrowedBookCategories = categorizeBorrowedBooksByStatus(borrowedBooks);
  const checkedOut = borrowedBookCategories.CHECKED_OUT || [];
  const pendingBooks = borrowedBookCategories.CHECKED_IN || [];

  const [activeCard, setActiveCard] = useState("");

  const checkedOutBookMenuitems = [
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

  const noContentBorrowing = () => (
    <NoContent text="No Books Yet!" icon={IconBookOff}>
      <div>Check your Friends library to start borrowing books!</div>
      <Button
        varient="add"
        icon={faUserGroup}
        onClick={() => navigate("/friends")}
      >
        Friends
      </Button>
    </NoContent>
  );

  const noContentRequest = () => (
    <NoContent text="No Request Yet!" icon={IconBookOff}>
      <div>Check your Friends library to start borrowing books!</div>
      <Button
        varient="add"
        icon={faUserGroup}
        onClick={() => navigate("/friends")}
      >
        Friends
      </Button>
    </NoContent>
  );

  const renderBooks = (userBook) => {
    const { _id, book, owner, dueDate } = userBook;

    return (
      <Col sm="4" md="3" xl="2" className="mb-3" key={`LibraryCard:${_id}`}>
        <UserBookCardSm
          _id={_id}
          book={book}
          user={owner}
          dueDate={dueDate}
          setActive={setActiveCard}
          isActive={activeCard === _id}
          menuItems={checkedOutBookMenuitems}
        />
      </Col>
    );
  };

  const renderBorrowedBooks = checkedOut.map(renderBooks);
  const renderPendingBooks = pendingBooks.map(renderBooks);

  return (
    <>
      <Container>
        <div className={styles.title}>
          <h1>Borrowed Library</h1>
        </div>
        <div>
          <h4 className={styles.subtitle}>Borrowing</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer noContent={noContentBorrowing}>
            {renderBorrowedBooks}
          </BookContainer>
        </Row>
        <div>
          <h4 className={styles.subtitle}>Pending Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer noContent={noContentRequest}>
            {renderPendingBooks}
          </BookContainer>
        </Row>
      </Container>
    </>
  );
};

export default BorrowedPage;
