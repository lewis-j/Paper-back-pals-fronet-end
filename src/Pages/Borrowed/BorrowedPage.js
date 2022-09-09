import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { IconBookOff } from "@tabler/icons";
import { UserCardSm, BookContainer } from "../../features/library";
import styles from "./BorrowedPage.module.scss";
import { useState } from "react";
import { sortCheckedInBooks } from "../../features/library/utilities/bookFilterUtil";
import { Button, NoContent } from "../../components";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BorrowedPage = () => {
  const navigate = useNavigate();
  const { borrowed: books } = useSelector((state) => state.userBooks.books);

  const { checkedOut, checkedIn: pendingBooks } = sortCheckedInBooks(books);

  const [activeCard, setActiveCard] = useState("");

  const checkedOutBookMenuitems = [
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

  const renderBooks = (filter) => (userBooks) => {
    // const progressValue = getProgressInPercent(
    //   bookData.currentPage,
    //   bookData.pageCount
    // );
    console.log(
      "*****************************************",
      "userBooks",
      userBooks,
      "*****************************************"
    );

    return userBooks.map((userBook) => {
      const { _id, book: _book, owner, currentRequest } = userBook;
      const book = filter(currentRequest, _book);

      return (
        <Col sm="4" md="3" xl="2" className="mb-3" key={`LibraryCard:${_id}`}>
          <UserCardSm
            _id={_id}
            book={book}
            user={owner}
            setActive={setActiveCard}
            isActive={activeCard === _id}
            menuItems={checkedOutBookMenuitems}
          />
        </Col>
      );
    });
  };

  const borrowedBooksFilter = (currentRequest, book) => {
    return { ...book, dueDate: currentRequest.dueDate };
  };

  const pendingBookstFilter = (currentRequest, book) => {
    return currentRequest ? { ...book, dueDate: currentRequest.dueDate } : book;
  };
  const renderBorrowedBooks = renderBooks(borrowedBooksFilter);
  const renderPendingBooks = renderBooks(pendingBookstFilter);

  return (
    <>
      <Container>
        <div className={styles.title}>
          <h1>Your Library</h1>
        </div>
        <div>
          <h4 className={styles.subtitle}>Borrowing</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer noContent={noContentBorrowing}>
            {renderBorrowedBooks(checkedOut)}
          </BookContainer>
        </Row>
        <div>
          <h4 className={styles.subtitle}>Pending Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer noContent={noContentRequest}>
            {renderPendingBooks(pendingBooks)}
          </BookContainer>
        </Row>
      </Container>
    </>
  );
};

export default BorrowedPage;
