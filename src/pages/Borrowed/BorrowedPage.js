import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { IconBookOff } from "@tabler/icons";
import { UserBookCardSm, BookContainer } from "../../features/library";
import styles from "./BorrowedPage.module.scss";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { nextBookRequestStatus } from "../../features/library/userBookCalls";
import { useBookSelectors } from "../../features/library/hooks/useBookSelectors";
import { useModalMenu } from "../../features/library/hooks/useModalMenu";
import { useState } from "react";
import BookTransferTracker from "../../features/library/components/BookTransferTracker/BookTransferTracker";

const BorrowedPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menuItems, renderModal, activeCardId, setActiveCardId } =
    useModalMenu();

  const {
    borrowedBookRequests: pendingBooks,
    allBooksFromFriends: checkedOutBooks,
    borrowedbooksInTransition,
  } = useBookSelectors(useSelector((state) => state.userBooks));

  const checkedOutBookMenuitems = menuItems.booksFromFriends;
  const pendingBookMenuitems = menuItems.borrowedBookRequests;
  const createRenderBooksWithMenuItems = (menuItems) => (userBook) => {
    const { _id, book, owner, dueDate, currentPage } = userBook;

    return (
      <Col sm="4" md="3" xl="2" className="mb-3" key={`LibraryCard:${_id}`}>
        <UserBookCardSm
          _id={_id}
          book={book}
          user={owner}
          dueDate={dueDate}
          currentPage={currentPage}
          setActive={setActiveCardId}
          isActive={activeCardId === _id}
          menuItems={menuItems(userBook)}
        />
      </Col>
    );
  };

  const handleConfirmPickup = async (requestId) => {
    // API call to confirm book pickup

    dispatch(nextBookRequestStatus(requestId));
  };

  const handleConfirmDropoff = async (requestId) => {
    // API call to confirm book dropoff

    dispatch(nextBookRequestStatus(requestId));
  };

  const borrowedBooksNoContent = {
    text: "No books Yet!",
    description: "Check your Friends library to start borrowing books!",
    buttonText: "Friends",
    buttonIcon: faUserGroup,
    onClick: () => navigate("/friends"),
  };

  return (
    <>
      {renderModal()}
      <Container>
        <BookTransferTracker
          booksInTransition={borrowedbooksInTransition}
          onConfirmPickup={handleConfirmPickup}
          onConfirmDropoff={handleConfirmDropoff}
        />
        <div className={styles.title}>
          <h1>Borrowed Library</h1>
        </div>
        <div>
          <h4 className={styles.subtitle}>Borrowing</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer noContent={borrowedBooksNoContent}>
            {checkedOutBooks.map(
              createRenderBooksWithMenuItems(checkedOutBookMenuitems)
            )}
          </BookContainer>
        </Row>
        <div>
          <h4 className={styles.subtitle}>Pending Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer noContent={borrowedBooksNoContent}>
            {pendingBooks.map(
              createRenderBooksWithMenuItems(pendingBookMenuitems)
            )}
          </BookContainer>
        </Row>
      </Container>
    </>
  );
};

export default BorrowedPage;
