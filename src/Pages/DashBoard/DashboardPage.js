import React, { useState } from "react";
import { Button, NoContent, ResponsiveSlider } from "../../components";
import { UserCardLrg as CurrentRead, UserCardSm } from "../../features/library";
import { Container } from "reactstrap";
import styles from "./DashboardPage.module.scss";
import { useSelector } from "react-redux";
import { sortCheckedInBooks } from "../../features/library/utilities/bookFilterUtil";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCurrentRead } from "../../features/library";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeCard, setActiveCard] = useState("");
  const {
    books: { borrowed, owned },
    currentRead,
  } = useSelector((state) => state.userBooks);
  const { owner, book, currentRequest } = currentRead;
  const _book = { ...book, dueDate: currentRequest.dueDate };

  const _owned = sortCheckedInBooks(owned);
  const _borrowed = sortCheckedInBooks(borrowed);

  const BooksFromFriendsMenuItems = [
    {
      text: "Current Read",
      clickHandler: (userBook_id) => {
        console.log("userBook ID::::::::::::::::::::::", userBook_id);
        dispatch(updateCurrentRead({ userBook_id }));
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
        console.log("testing");
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

  return (
    <Container>
      <h3 className={styles.title}>Current Read</h3>
      <CurrentRead book={_book} user={owner} />
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
    </Container>
  );
};

export default DashboardPage;
