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
  openModal,
}) => {
  const getMenuItems = (userBook) => [
    {
      text: "Current Read",
      clickHandler: () => {
        //handleUpdateCurrentRead(userBook_id);
        setActiveCard("");
      },
    },
    {
      text: "Update Page Count",
      clickHandler: () => {
        openModal("pageCount", "Update Page Count", userBook);
      },
    },
    {
      text: "Return Book",
      clickHandler: () => {
        openModal("returnBook", "Confirm Book Return", userBook);
      },
    },
  ];

  const renderBook = (userBook) => {
    const { _id, book, owner, dueDate, currentPage } = userBook;

    const readingProgress = getProgressInPercent(currentPage, book.pageCount);

    return (
      <UserBookCardSm
        key={_id}
        _id={_id}
        book={book}
        user={owner}
        dueDate={dueDate}
        readingProgress={readingProgress}
        setActive={setActiveCard}
        isActive={activeCard === _id}
        menuItems={getMenuItems(userBook)}
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
