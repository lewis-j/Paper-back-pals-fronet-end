import React, { useState } from "react";
import { Button, Modal, NoContent, ResponsiveSlider } from "../../components";
import {
  PageCountForm,
  UserCardLrg as CurrentRead,
  UserCardSm,
} from "../../features/library";
import styles from "./DashboardPage.module.scss";
import { useSelector } from "react-redux";
import { sortCheckedInBooks } from "../../features/library/utilities/bookFilterUtil";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCurrentRead, updateCurrentPage } from "../../features/library";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeCard, setActiveCard] = useState("");
  const [modal, setModal] = useState(false);
  const {
    books: { borrowed, owned },
    currentRead,
  } = useSelector((state) => state.userBooks);

  const renderCurrentRead = (_currentRead) => {
    if (!_currentRead) return null;
    const { owner, book, currentRequest = null } = _currentRead;
    const _book = { ...book, dueDate: currentRequest?.dueDate };

    return (
      <CurrentRead
        book={_book}
        user={owner}
        menuItems={[
          {
            text: "Update page",
            clickHandler: () => {
              dispatch(
                updateCurrentPage(
                  currentRequest._id,
                  currentRequest.currentPage
                )
              );
            },
          },
        ]}
      />
    );
  };

  const _owned = sortCheckedInBooks(owned);
  const _borrowed = sortCheckedInBooks(borrowed);

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
      ({ _id, book, owner, currentRequest: { dueDate } }) => {
        const _book = { ...book, dueDate };
        return (
          <UserCardSm
            _id={_id}
            book={_book}
            user={owner}
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
  const renderBooksYouOwn = (userBooks) => {
    return userBooks.map(
      ({
        _id,
        book: { coverImg, title },
        currentRequest: { sender, dueDate },
      }) => {
        const book = { _id, coverImg, title, dueDate };

        return (
          <UserCardSm
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

  const renderNoContent = () => {
    return (
      <div className={styles.noContent}>
        <NoContent
          icon={faBook}
          iconSize="6em"
          text="You currently have no checked out books"
        >
          <Button varient="accept" onClick={() => navigate("library")}>
            Check Library
          </Button>
        </NoContent>
      </div>
    );
  };

  const renderModalItem = (activeCard) => {
    const _userBook = borrowed.find((item) => item._id === activeCard);

    if (!_userBook) return null;
    const { owner, book, currentRequest = null } = _userBook;
    const _book = { ...book, dueDate: currentRequest?.dueDate };

    return (
      <>
        <CurrentRead book={_book} user={owner} progress={false} />
        <PageCountForm />
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
      <ResponsiveSlider>
        {renderBooksFromFriends(_borrowed.checkedOut)}
      </ResponsiveSlider>
      <h3 className={styles.title}>Your Library</h3>
      <div className={styles.yourLibrary}>
        {_owned.checkedOut.length > 0 ? (
          <ResponsiveSlider>
            {renderBooksYouOwn(_owned.checkedOut)}
          </ResponsiveSlider>
        ) : (
          renderNoContent()
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
