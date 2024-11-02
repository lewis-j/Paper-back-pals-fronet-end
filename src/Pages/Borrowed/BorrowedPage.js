import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { IconBookOff } from "@tabler/icons";
import {
  UserBookCardSm,
  BookContainer,
  BookStatusTracker,
} from "../../features/library";
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
  console.log("borrowedBookCategories", borrowedBookCategories);
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
    const { _id, book, owner, dueDate, currentPage } = userBook;

    return (
      <Col sm="4" md="3" xl="2" className="mb-3" key={`LibraryCard:${_id}`}>
        <UserBookCardSm
          _id={_id}
          book={book}
          user={owner}
          dueDate={dueDate}
          currentPage={currentPage}
          setActive={setActiveCard}
          isActive={activeCard === _id}
          menuItems={checkedOutBookMenuitems}
        />
      </Col>
    );
  };

  const renderBorrowedBooks = checkedOut.map(renderBooks);
  const renderPendingBooks = pendingBooks.map(renderBooks);

  const booksInTransition = borrowedBooks.filter((book) =>
    ["SENDING", "RETURNING", "ACCEPTED", "IS_DUE"].includes(
      book.request?.status
    )
  );

  const handleConfirmPickup = async (bookId) => {
    // API call to confirm book pickup
    console.log("Confirming pickup for book:", bookId);
  };

  const handleStartReturn = async (bookId) => {
    // API call to start return process
    console.log("Starting return process for book:", bookId);
  };

  const handleConfirmDropoff = async (bookId) => {
    // API call to confirm book dropoff
    console.log("Confirming dropoff for book:", bookId);
  };

  return (
    <>
      <Container>
        {booksInTransition.length > 0 && (
          <>
            <div>
              <h4 className={styles.subtitle}>In Progress</h4>
            </div>
            <Row>
              {booksInTransition.map((book) => (
                <Col xs="12" key={`tracker-${book._id}`}>
                  <BookStatusTracker
                    book={book}
                    isBorrower={true}
                    onConfirmPickup={handleConfirmPickup}
                    onStartReturn={handleStartReturn}
                    onConfirmDropoff={handleConfirmDropoff}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
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
