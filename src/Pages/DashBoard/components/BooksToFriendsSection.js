import React from "react";
import { ResponsiveSlider } from "../../../components";
import { UserBookCardSm } from "../../../features/library";
import EmptyStatePrompt from "./EmptyStatePrompt/EmptyStatePrompt";
import styles from "../DashboardPage.module.scss";

const BooksToFriendsSection = ({
  books,
  activeCard,
  setActiveCard,
  menuItems,
}) => {
  const renderBook = (userBook) => {
    const {
      _id,
      book,
      sender, // The friend who borrowed the book
      dueDate,
      currentPage,
    } = userBook;
    return (
      <UserBookCardSm
        key={_id}
        _id={_id}
        book={book}
        user={sender}
        dueDate={dueDate}
        currentPage={currentPage}
        setActive={setActiveCard}
        isActive={activeCard === _id}
        menuItems={menuItems(userBook)}
      />
    );
  };

  const renderContent = () => {
    if (books.length === 0) {
      return (
        <EmptyStatePrompt
          title="Check Library"
          route="library"
          text="You currently have no checked out books"
        />
      );
    }

    return <ResponsiveSlider>{books.map(renderBook)}</ResponsiveSlider>;
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Books to Friends</h3>
      {renderContent()}
    </section>
  );
};

export default BooksToFriendsSection;
