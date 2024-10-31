import React, { useState } from "react";
import styles from "./DashboardPage.module.scss";
import CurrentReadSection from "./components/CurrentReadSection";
import BooksFromFriendsSection from "./components/BooksFromFriendsSection";
import BooksToFriendsSection from "./components/BooksToFriendsSection";
import BookRequestsSection from "./components/BookRequestSection";
import { useBookSelectors } from "./hooks/useBookSelectors";
import { getMenuItems, getModalContent } from "./dashboardHelpers";
import useModalMenu from "./components/useModalMenu";

const DashboardPage = () => {
  const { currentRead, booksToFriends, booksFromFriends, ownedBookRequests } =
    useBookSelectors();

  const [activeCardId, setActiveCard] = useState("");

  const { menuItems, renderModal } = useModalMenu(
    getMenuItems(activeCardId),
    getModalContent
  );

  const createBookFinder = (userBook) => (book_id) => {
    return userBook.find((book) => book._id === book_id);
  };

  const fromFriendsMenuItems = menuItems.booksFromFriends(
    createBookFinder(booksFromFriends)
  );

  const toFriendsMenuItems = menuItems.booksToFriends(
    createBookFinder(booksToFriends)
  );

  return (
    <div className={`container ${styles.container}`}>
      {renderModal()}
      <CurrentReadSection
        currentRead={currentRead}
        activeCard={activeCardId}
        setActiveCard={setActiveCard}
        menuItems={menuItems.currentRead(currentRead)}
      />
      <BooksFromFriendsSection
        books={booksFromFriends}
        activeCard={activeCardId}
        setActiveCard={setActiveCard}
        menuItems={fromFriendsMenuItems}
      />
      <BooksToFriendsSection
        books={booksToFriends}
        activeCard={activeCardId}
        setActiveCard={setActiveCard}
        menuItems={toFriendsMenuItems}
      />
      <BookRequestsSection
        requests={ownedBookRequests}
        activeCard={activeCardId}
        setActiveCard={setActiveCard}
      />
    </div>
  );
};

export default DashboardPage;
