import React, { useState } from "react";
import { Button, Modal, NoContent, ResponsiveSlider } from "../../components";
import {
  PageCountForm,
  UserCardLrg as CurrentRead,
  UserBookCardSm,
  BookCard,
} from "../../features/library";
import styles from "./DashboardPage.module.scss";
import { useSelector } from "react-redux";
import {
  categorizeBorrowedBooksByStatus,
  categorizeOwnedBooksByStatus,
} from "../../features/library/utilities/bookFilterUtil";
import { faBook, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCurrentRead, updateCurrentPage } from "../../features/library";
import { getProgressInPercent } from "../../utilities/bookUtilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RequestBadge } from "../../features/library/components";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeCard, setActiveCard] = useState("");
  const [modal, setModal] = useState(false);
  const {
    books: { borrowed, owned },
    currentRead,
  } = useSelector((state) => state.userBooks);

  const filterOutCurrentRead = (books) => {
    if (!currentRead) return books;
    return books.filter((book) => book._id !== currentRead._id);
  };

  const ownedBookCategories = categorizeOwnedBooksByStatus(owned);
  const booksToFriends = ownedBookCategories.CHECKED_OUT || [];
  const ownedBookRequests =
    ownedBookCategories.CHECKED_IN.filter((book) => book.request.length > 0) ||
    [];
  const borrowedBookCategories = categorizeBorrowedBooksByStatus(borrowed);
  const booksFromFriends = borrowedBookCategories.CHECKED_OUT || [];

  const populateCurrentRead = (currentRead_id) => {
    if (!currentRead_id) return null;
    return booksFromFriends.find((book) => book._id === currentRead_id);
  };
  const renderCurrentRead = (_currentRead) => {
    if (!_currentRead) return null;
    const { owner, book } = _currentRead;
    const _book = {
      ...book,
      dueDate: _currentRead?.dueDate,
      currentPage: _currentRead?.currentPage,
    };

    const currentReadMenuItems = [
      {
        text: "Update Page Count",
        clickHandler: () => {
          setModal(true);
        },
      },
    ];

    return (
      <CurrentRead
        _id={_currentRead._id}
        book={_book}
        user={owner}
        isActive={activeCard === _currentRead._id}
        setActive={setActiveCard}
        menuItems={currentReadMenuItems}
      />
    );
  };

  const BooksFromFriendsMenuItems = [
    {
      text: "Current Read",
      clickHandler: (userBook_id) => {
        dispatch(updateCurrentRead({ userBook_id }));
        setActiveCard("");
      },
    },
    {
      text: "Page Count",
      clickHandler: (userBook_id) => {
        setModal(true);
      },
    },
  ];

  const renderOwnedBookRequest = (userBook) => {
    const {
      _id,
      book: { coverImg, title },
      request,
    } = userBook;
    const requestCount = request.length;
    return (
      <RequestBadge count={requestCount}>
        <BookCard
          _id={_id}
          cardInfo={{ coverImg, title }}
          setActive={setActiveCard}
          isActive={activeCard === _id}
        />
      </RequestBadge>
    );
  };

  const renderBooksFromFriends = (userBook) => {
    const { _id, book, owner, dueDate, currentPage } = userBook;
    const readingProgress = getProgressInPercent(currentPage, book.pageCount);
    return (
      <UserBookCardSm
        _id={_id}
        book={book}
        user={owner}
        dueDate={dueDate}
        readingProgress={readingProgress}
        setActive={setActiveCard}
        isActive={activeCard === _id}
        menuItems={BooksFromFriendsMenuItems}
      />
    );
  };

  const booksYouOwnMenuItems = [
    {
      text: "message",
      clickHandler: () => {
        alert("message user");
      },
    },
  ];
  const renderBooksToFriends = (userBook) => {
    const { _id, book, sender, dueDate } = userBook;
    return (
      <UserBookCardSm
        _id={_id}
        book={book}
        user={sender}
        dueDate={dueDate}
        setActive={setActiveCard}
        isActive={activeCard === _id}
        menuItems={booksYouOwnMenuItems}
      />
    );
  };

  const EmptyStatePrompt = ({ title, text, route }) => {
    return (
      <div className={styles.noContent}>
        <NoContent icon={faBook} iconSize="6em" text={text}>
          <Button
            varient="accept"
            onClick={() => {
              if (route) navigate(route);
            }}
          >
            {title}
          </Button>
        </NoContent>
      </div>
    );
  };

  const renderModalItem = (activeCard) => {
    if (booksFromFriends.length === 0) return null;
    const _userBook = booksFromFriends.find((item) => item._id === activeCard);
    console.log("_userBook", _userBook);
    if (!_userBook) return null;
    const {
      _id: userBook_id,
      owner,
      book,
      dueDate,
      request,
      currentPage,
    } = _userBook;
    const _book = { ...book, dueDate };
    const pageCountFormSubmit = (currentPage) => {
      dispatch(
        updateCurrentPage({
          request_id: request._id,
          currentPage: currentPage,
          userBook_id,
        })
      );
    };

    return (
      <>
        <CurrentRead book={_book} user={owner} progress={false} />
        <PageCountForm
          currentPage={currentPage}
          onSubmit={pageCountFormSubmit}
        />
      </>
    );
  };

  return (
    <div className={`container ${styles.container}`}>
      <Modal isOpen={modal} setIsOpen={setModal} title="set current page">
        {renderModalItem(activeCard)}
      </Modal>
      <h3 className={styles.title}>Current Read</h3>
      {renderCurrentRead(populateCurrentRead(currentRead?._id))}
      <h3 className={styles.title}>Books from Friends</h3>
      {booksFromFriends.length > 0 ? (
        <ResponsiveSlider>
          {filterOutCurrentRead(booksFromFriends).map(renderBooksFromFriends)}
        </ResponsiveSlider>
      ) : (
        <EmptyStatePrompt
          title="Search Friends Library"
          route="friends"
          text="You currently are not borrowing any books"
        />
      )}
      <h3 className={styles.title}>Books to Friends</h3>
      <div className={styles.yourLibrary}>
        {booksToFriends.length > 0 ? (
          <ResponsiveSlider>
            {booksToFriends.map(renderBooksToFriends)}
          </ResponsiveSlider>
        ) : (
          <EmptyStatePrompt
            title="Check Library"
            route="library"
            text="You currently have no checked out books"
          />
        )}
      </div>
      <h3 className={styles.title}>Books requested</h3>
      <div className={styles.yourLibrary}>
        {booksToFriends.length > 0 ? (
          <ResponsiveSlider>
            {ownedBookRequests.map(renderOwnedBookRequest)}
          </ResponsiveSlider>
        ) : (
          <EmptyStatePrompt
            title="add more books"
            text="No one has requested your books"
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
