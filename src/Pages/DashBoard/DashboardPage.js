import React, { useState } from "react";
import { Button, Modal, NoContent, ResponsiveSlider } from "../../components";
import {
  PageCountForm,
  UserCardLrg as CurrentRead,
  UserBookCardSm,
  BookCard,
  RequestBadge,
} from "../../features/library";
import styles from "./DashboardPage.module.scss";
import { useSelector } from "react-redux";
import {
  categorizeBorrowedBooksByStatus,
  categorizeOwnedBooksByStatus,
} from "../../features/library/utilities/bookFilterUtil";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCurrentRead, updateCurrentPage } from "../../features/library";
import { getProgressInPercent } from "../../utilities/bookUtilities";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeCard, setActiveCard] = useState("");
  const [modal, setModal] = useState({ isOpen: false, type: null, data: null });

  const {
    books: { borrowed, owned },
    currentRead,
  } = useSelector((state) => state.userBooks);

  const filterOutCurrentRead = (books) => {
    if (!currentRead) return books;
    return books.filter((book) => book._id !== currentRead._id);
  };

  const getOwnedBookRequests = (ownedBookCategories) => {
    return ownedBookCategories.CHECKED_IN &&
      ownedBookCategories.CHECKED_IN.length > 0
      ? ownedBookCategories.CHECKED_IN.filter(
          (book) => book.request && book.request.length > 0
        )
      : [];
  };
  const ownedBookCategories = categorizeOwnedBooksByStatus(owned);
  const booksToFriends = ownedBookCategories.CHECKED_OUT || [];
  const ownedBookRequests = getOwnedBookRequests(ownedBookCategories);
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
          setModal({ isOpen: true, type: "pageCount", data: _currentRead });
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

  const openModal = (type, title, data = null) => {
    setModal({ isOpen: true, type, title, data });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null, title: null, data: null });
  };

  const getModalContent = () => {
    switch (modal.type) {
      case "pageCount":
        return <ChangePageCountForm bookData={modal.data} />;
      case "returnBook":
        return <ReturnBookForm bookData={modal.data} />;
      default:
        return null;
    }
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
        openModal("pageCount", "Update Page Count", userBook_id);
      },
    },
    {
      text: "Return Book",
      clickHandler: (userBook_id) => {
        openModal("returnBook", "Confirm Book Return", userBook_id);
      },
    },
    { text: "Message Friend" },
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

  const booksToFriendsMenuItems = [
    {
      text: "Message",
      clickHandler: () => {
        alert("message user");
      },
    },
    { text: "Details" },
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
        menuItems={booksToFriendsMenuItems}
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

  const ChangePageCountForm = ({ bookData }) => {
    if (booksFromFriends.length === 0) return null;
    const _userBook = booksFromFriends.find((item) => item._id === bookData);
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

  const ReturnBookForm = ({ bookData }) => {
    const _userBook = booksFromFriends.find((item) => item._id === bookData);
    if (!_userBook) return null;
    const { owner, book, dueDate } = _userBook;
    const _book = { ...book, dueDate };
    return (
      <>
        <CurrentRead book={_book} user={owner} progress={false} />
        <div>
          <p>
            Do you want to return {book.title} to {owner.username}?
          </p>
          <Button varient="accept">Return Book</Button>
        </div>
      </>
    );
  };

  return (
    <div className={`container ${styles.container}`}>
      <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
        {getModalContent()}
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
