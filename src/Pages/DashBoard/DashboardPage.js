import React, { useState } from "react";
import styles from "./DashboardPage.module.scss";
import CurrentReadSection from "./components/CurrentReadSection";
import BooksFromFriendsSection from "./components/BooksFromFriendsSection";
import BooksToFriendsSection from "./components/BooksToFriendsSection";
import BookRequestsSection from "./components/BookRequestSection";
import { useBookSelectors } from "./hooks/useBookSelectors";
import { getMenuItems, getModalContent } from "./dashboardMenuConfig";
import useModalMenu from "./hooks/useModalMenu";

const DashboardPage = () => {
  const { currentRead, booksToFriends, booksFromFriends, ownedBookRequests } =
    useBookSelectors();

  const { menuItems, renderModal, activeCardId, setActiveCardId } =
    useModalMenu(getMenuItems, getModalContent);

  const createBookFinder = (userBook) => (book_id) => {
    return userBook.find((book) => book._id === book_id);
  };

  const fromFriendsMenuItems = menuItems.booksFromFriends(
    createBookFinder(booksFromFriends)
  );

  const toFriendsMenuItems = menuItems.booksToFriends(
    createBookFinder(booksToFriends)
  );

  const requestMenuItems = menuItems.bookRequests(
    createBookFinder(ownedBookRequests)
  );

  return (
    <div className={`container ${styles.container}`}>
      {renderModal()}
      <CurrentReadSection
        currentRead={currentRead}
        activeCard={activeCardId}
        setActiveCard={setActiveCardId}
        menuItems={menuItems.currentRead(currentRead)}
      />
      <BooksFromFriendsSection
        books={booksFromFriends}
        activeCard={activeCardId}
        setActiveCard={setActiveCardId}
        menuItems={fromFriendsMenuItems}
      />
      <BooksToFriendsSection
        books={booksToFriends}
        activeCard={activeCardId}
        setActiveCard={setActiveCardId}
        menuItems={toFriendsMenuItems}
      />
      <BookRequestsSection
        requests={ownedBookRequests}
        activeCard={activeCardId}
        setActiveCard={setActiveCardId}
        menuItems={requestMenuItems}
      />
    </div>
  );
};

export default DashboardPage;
