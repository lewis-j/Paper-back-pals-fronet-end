import { Col, Container, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { IconBookOff } from "@tabler/icons";
import {
  UserBookCardSm,
  BookContainer,
  BookStatusTracker,
} from "../../features/library";
import styles from "./BorrowedPage.module.scss";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { nextBookRequestStatus } from "../../features/library/userBookCalls";
import { useBookSelectors } from "../../features/library/hooks/useBookSelectors";
import { useModalMenu } from "../../features/library/hooks/useModalMenu";

const BorrowedPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menuItems, renderModal, activeCardId, setActiveCardId } =
    useModalMenu();

  const {
    borrowedBookRequests: pendingBooks,
    allBooksFromFriends: checkedOutBooks,
    booksInTransition,
  } = useBookSelectors(useSelector((state) => state.userBooks));

  const removeMenuItems = (menuItems, textToRemove) =>
    menuItems.filter((item) => item.text !== textToRemove);

  const checkedOutBookMenuitems = removeMenuItems(
    menuItems.booksFromFriends(checkedOutBooks),
    "Set as Current Read"
  );
  const pendingBookMenuitems = menuItems.borrowedBookRequests(pendingBooks);
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
          menuItems={menuItems}
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
