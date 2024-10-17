import React, { useState } from "react";
import { Button, Modal, NoContent, ResponsiveSlider } from "../../components";
import {
  PageCountForm,
  UserCardLrg as CurrentRead,
  UserBookCardSm,
} from "../../features/library";
import styles from "./DashboardPage.module.scss";
import { useSelector } from "react-redux";
import { sortBooksByStatus } from "../../features/library/utilities/bookFilterUtil";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCurrentRead, updateCurrentPage } from "../../features/library";
import { getProgressInPercent } from "../../utilities/bookUtilities";

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
    return books.filter((book) => book._id !== currentRead._id);
  };

  const booksToFriends = sortBooksByStatus(owned).checkedOut;
  const booksFromFriends = sortBooksByStatus(borrowed).checkedOut;

  const renderCurrentRead = (_currentRead) => {
    if (!_currentRead) return null;
    const { owner, book, currentRequest = null } = _currentRead;
    const _book = {
      ...book,
      dueDate: currentRequest?.dueDate,
      currentPage: currentRequest?.currentPage,
    };

    const currentReadMenuItems = [
      {
        text: "Update page",
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
      },
    },
    {
      text: "Page Count",
      clickHandler: (userBook_id) => {
        setModal(true);
      },
    },
  ];

  const renderBooksFromFriends = (userBooks) => {
    return userBooks.map(
      ({ _id, book, owner, currentRequest: { dueDate, currentPage } }) => {
        const _book = { ...book, dueDate };
        const readingProgress = getProgressInPercent(
          currentPage,
          book.pageCount
        );
        return (
          <UserBookCardSm
            _id={_id}
            book={_book}
            user={owner}
            readingProgress={readingProgress}
            setActive={setActiveCard}
            isActive={activeCard === _id}
            menuItems={BooksFromFriendsMenuItems}
          />
        );
      }
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
  const renderBooksToFriends = (userBooks) => {
    return userBooks.map(
      ({
        _id,
        book: { coverImg, title },
        currentRequest: { sender, dueDate },
      }) => {
        const book = { _id, coverImg, title, dueDate };

        return (
          <UserBookCardSm
            _id={_id}
            book={book}
            user={sender}
            setActive={setActiveCard}
            isActive={activeCard === _id}
            menuItems={booksYouOwnMenuItems}
          />
        );
      }
    );
  };

  const CustomNoContent = ({ title, text, route }) => {
    return (
      <div className={styles.noContent}>
        <NoContent icon={faBook} iconSize="6em" text={text}>
          <Button varient="accept" onClick={() => navigate(route)}>
            {title}
          </Button>
        </NoContent>
      </div>
    );
  };

  const renderModalItem = (activeCard) => {
    console.log("activeCard", activeCard);
    if (booksFromFriends.length === 0) return null;
    const _userBook = booksFromFriends.find((item) => item._id === activeCard);
    if (!_userBook) return null;
    const { _id: userBook_id, owner, book, currentRequest = null } = _userBook;
    const _book = { ...book, dueDate: currentRequest?.dueDate };
    const pageCountFormSubmit = (currentPage) => {
      dispatch(
        updateCurrentPage({
          request_id: currentRequest._id,
          currentPage: currentPage,
          userBook_id,
        })
      );
    };

    return (
      <>
        <CurrentRead book={_book} user={owner} progress={false} />
        <PageCountForm
          currentPage={currentRequest?.currentPage}
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
      {renderCurrentRead(currentRead)}
      <h3 className={styles.title}>Books from Friends</h3>
      {booksFromFriends.length > 0 ? (
        <ResponsiveSlider>
          {renderBooksFromFriends(filterOutCurrentRead(booksFromFriends))}
        </ResponsiveSlider>
      ) : (
        <CustomNoContent
          title="Search Friends Library"
          route="friends"
          text="You currently are not borrowing any books"
        />
      )}
      <h3 className={styles.title}>Books to Friends</h3>
      <div className={styles.yourLibrary}>
        {booksToFriends.length > 0 ? (
          <ResponsiveSlider>
            {renderBooksToFriends(booksToFriends)}
          </ResponsiveSlider>
        ) : (
          <CustomNoContent
            title="Check Library"
            route="library"
            text="You currently have no checked out books"
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
