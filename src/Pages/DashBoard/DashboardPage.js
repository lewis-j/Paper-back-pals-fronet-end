import React, { useState } from "react";
import styles from "./DashboardPage.module.scss";
import CurrentReadSection from "./components/CurrentReadSection";
import BooksFromFriendsSection from "./components/BooksFromFriendsSection";
import BooksToFriendsSection from "./components/BooksToFriendsSection";
import BookRequestsSection from "./components/BookRequestSection";
import { useModalMenu } from "../../features/library/hooks/useModalMenu";
import { useBookSelectors } from "../../features/library/hooks/useBookSelectors";
const DashboardPage = () => {
  const { currentRead, booksToFriends, booksFromFriends, ownedBookRequests } =
    useBookSelectors();

  const { menuItems, renderModal, activeCardId, setActiveCardId } =
    useModalMenu();

  const fromFriendsMenuItems = menuItems.booksFromFriends(booksFromFriends);
  const toFriendsMenuItems = menuItems.booksToFriends(booksToFriends);
  const requestMenuItems = menuItems.bookRequests(ownedBookRequests);

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
