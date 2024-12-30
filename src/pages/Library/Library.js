import {
  BookCard,
  UserBookCardSm,
  BookContainer,
  BookTransferTracker,
  RequestBadge,
  BookCardBadge,
} from "../../features/library";
import styles from "./Library.module.scss";
import { useBookSelectors } from "../../features/library/hooks/useBookSelectors";
import { useModalMenu } from "../../features/library/hooks/useModalMenu";
import { useSelector } from "react-redux";
import { Badge } from "../../components";
import requestStatus from "../../data/requestStatus";
import { Col, Container } from "../../lib/BootStrap";
import { useBookTransferModal } from "../../features/library/components/BookTransferTracker/hooks/useBookTransferModal";
import { useState } from "react";
import { useLibraryModalManager } from "../../features/library/hooks/useLibraryModalManager";

const Library = () => {
  const [activeCardId, setActiveCardId] = useState("");
  const { menuItems, runAction, renderModal } =
    useLibraryModalManager(setActiveCardId);
  const isBorrower = false;

  const { booksInLibrary, booksToFriends, ownedbooksInTransition } =
    useBookSelectors(useSelector((state) => state.userBooks));

  const toFriendsMenuItems = menuItems.booksToFriends;
  const inLibraryMenuItems = menuItems.booksInLibrary;
  const bookRequestMenuItems = menuItems.bookRequests;

  const BookCol = ({ children, key }) => (
    <Col sm="4" md="3" xl="2" className="mb-3" key={key}>
      {children}
    </Col>
  );

  const mapCheckedOutBooks = (userBook, i) => {
    const { _id, book, sender, dueDate, currentPage } = userBook;
    const { request } = userBook;
    const bookCardBadge = { badge: null, clickHandler: () => {} };
    const userBookSnapShot = { ...userBook };
    const toFriendsmenuItems = toFriendsMenuItems(userBookSnapShot);
    const cancelReturnRequest = toFriendsmenuItems[2].clickHandler;
    if (request.status === requestStatus.RETURN_REQUESTED) {
      bookCardBadge.badge = <Badge.ReturnRequestedBadge />;
      bookCardBadge.clickHandler = () => {
        cancelReturnRequest();
      };
    }
    return (
      <BookCol key={`LibraryCard:${userBook._id}`}>
        <BookCardBadge
          badge={bookCardBadge.badge}
          clickHandler={bookCardBadge.clickHandler}
        >
          <UserBookCardSm
            _id={_id}
            book={book}
            menuItems={toFriendsmenuItems}
            user={sender}
            dueDate={dueDate}
            currentPage={currentPage}
            setActive={setActiveCardId}
            isActive={activeCardId === _id}
          />
        </BookCardBadge>
      </BookCol>
    );
  };

  const renderCheckedInBookCard = (userBook, i) => {
    const { _id, book, status } = userBook;
    const { coverImg, title } = book;
    const cardInfo = { coverImg, title, status };
    const checkedInMenuItems = (userBook) => {
      if (userBook.requests.length > 0) {
        return bookRequestMenuItems(userBook);
      } else {
        return inLibraryMenuItems(userBook);
      }
    };
    const badgeOnClick = bookRequestMenuItems(userBook)[0].clickHandler;

    const requestCount = userBook.requests.filter(
      (request) => request.status !== requestStatus.RETURNED
    ).length;

    const userBookSnapshot = { ...userBook };

    return (
      <Col sm="4" md="3" xl="2" className="mb-3" key={_id}>
        <RequestBadge
          count={requestCount}
          clickHandler={() => {
            badgeOnClick();
          }}
        >
          <BookCard
            _id={_id}
            book={cardInfo}
            menuItems={checkedInMenuItems(userBookSnapshot)}
            isActive={activeCardId === _id}
            setActive={setActiveCardId}
          />
        </RequestBadge>
      </Col>
    );
  };

  return (
    <>
      {renderModal()}
      <Container className={styles.container}>
        <div className={styles.title}>
          <h1>Your Library</h1>
        </div>
        <div>
          <h4 className={styles.subtitle}>Checked in Books</h4>
        </div>

        <BookContainer
          noContent={{
            text: "No Books in Library",
            description: "Add some books to get started!",
          }}
        >
          {booksInLibrary.map(renderCheckedInBookCard)}
        </BookContainer>

        <BookTransferTracker
          booksInTransition={ownedbooksInTransition}
          isBorrower={isBorrower}
          runAction={runAction(isBorrower)}
        />

        <div>
          <h4 className={styles.subtitle}>Checked Out Books</h4>
        </div>

        <BookContainer
          noContent={{
            text: "No Checked Out Books",
            description: "Share books with friends to see them here",
          }}
        >
          {booksToFriends.map(mapCheckedOutBooks)}
        </BookContainer>
      </Container>
    </>
  );
};

export default Library;
