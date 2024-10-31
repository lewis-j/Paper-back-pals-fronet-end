import React from "react";
import { ResponsiveSlider } from "../../../components";
import { UserBookCardSm } from "../../../features/library";
import { getProgressInPercent } from "../../../utilities/bookUtilities";

import styles from "../DashboardPage.module.scss";
import EmptyStatePrompt from "./EmptyStatePrompt/EmptyStatePrompt";

const BooksFromFriendsSection = ({
  books,
  activeCard,
  setActiveCard,
  menuItems,
}) => {
  const renderBook = (userBook, idx) => {
    const { _id, book, owner, dueDate, currentPage } = userBook;

    return (
      <UserBookCardSm
        key={`${_id}-${idx}`}
        _id={_id}
        book={book}
        user={owner}
        dueDate={dueDate}
        currentPage={currentPage}
        setActive={setActiveCard}
        isActive={activeCard === _id}
        menuItems={menuItems}
      />
    );
  };

  const renderContent = () => {
    if (books.length === 0) {
      return (
        <EmptyStatePrompt
          title="Search Friends Library"
          route="friends"
          text="You currently are not borrowing any books"
        />
      );
    }

    return <ResponsiveSlider>{books.map(renderBook)}</ResponsiveSlider>;
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Books from Friends</h3>
      {renderContent()}
    </section>
  );
};

export default BooksFromFriendsSection;
