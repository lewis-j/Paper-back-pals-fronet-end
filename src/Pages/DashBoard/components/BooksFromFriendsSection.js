import React from "react";
import { ResponsiveSlider } from "../../../components";
import { UserBookCardSm } from "../../../features/library";
import { getProgressInPercent } from "../../../utilities/bookUtilities";
import { useBookSelectors } from "../hooks/useBookActions";
import styles from "../DashboardPage.module.scss";
import EmptyStatePrompt from "./EmptyStatePrompt/EmptyStatePrompt";

const BooksFromFriendsSection = ({
  books,
  activeCard,
  setActiveCard,
  openModal,
}) => {
  const { handleUpdateCurrentRead } = useBookSelectors();

  const getMenuItems = (userBook_id) => [
    {
      text: "Current Read",
      clickHandler: () => {
        handleUpdateCurrentRead(userBook_id);
        setActiveCard("");
      },
    },
    {
      text: "Update Page Count",
      clickHandler: () => {
        openModal("pageCount", "Update Page Count", userBook_id);
      },
    },
    {
      text: "Return Book",
      clickHandler: () => {
        openModal("returnBook", "Confirm Book Return", userBook_id);
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
        menuItems={getMenuItems(_id)}
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
