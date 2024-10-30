import React from "react";
import styles from "./DashboardPage.module.scss";
import { getProgressInPercent } from "../../utilities/bookUtilities";
import { useDashboardState } from "./hooks/useDashboardState";
import CurrentReadSection from "./components/CurrentReadSection";
import BooksFromFriendsSection from "./components/BooksFromFriendsSection";
import BooksToFriendsSection from "./components/BooksToFriendsSection";
import BookRequestsSection from "./components/BookRequestSection";
import DashboardModal from "./components/DashboardModal";
import { useBookSelectors } from "./hooks/useBookSelectors";

const DashboardPage = () => {
  const { currentRead, booksToFriends, booksFromFriends, ownedBookRequests } =
    useBookSelectors();

  const { modal, activeCard, setActiveCard, openModal, closeModal } =
    useDashboardState();

  return (
    <div className={`container ${styles.container}`}>
      <DashboardModal
        modal={modal}
        onClose={closeModal}
        booksFromFriends={booksFromFriends}
      />
      <CurrentReadSection
        currentRead={currentRead}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        openModal={openModal}
      />
      <BooksFromFriendsSection
        books={booksFromFriends}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
        openModal={openModal}
      />
      <BooksToFriendsSection
        books={booksToFriends}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <BookRequestsSection
        requests={ownedBookRequests}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
    </div>
  );
};

export default DashboardPage;
