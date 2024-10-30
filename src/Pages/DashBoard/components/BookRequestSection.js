import React from "react";
import { ResponsiveSlider } from "../../../components";
import { BookCard, RequestBadge } from "../../../features/library";
import styles from "../DashboardPage.module.scss";
import EmptyStatePrompt from "./EmptyStatePrompt/EmptyStatePrompt";

const BookRequestsSection = ({ requests, activeCard, setActiveCard }) => {
  const renderBookRequest = (userBook) => {
    const {
      _id,
      book: { coverImg, title },
      request,
    } = userBook;

    const requestCount = request.length;

    console.log("requestCount", requestCount);

    return (
      <RequestBadge key={_id} count={requestCount}>
        <BookCard
          _id={_id}
          cardInfo={{ coverImg, title }}
          setActive={setActiveCard}
          isActive={activeCard === _id}
        />
      </RequestBadge>
    );
  };

  const renderContent = () => {
    if (requests.length === 0) {
      return (
        <EmptyStatePrompt
          title="Add More Books"
          route="library"
          text="No one has requested your books"
        />
      );
    }

    return (
      <ResponsiveSlider>{requests.map(renderBookRequest)}</ResponsiveSlider>
    );
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Books Requested</h3>
      {renderContent()}
    </section>
  );
};

export default BookRequestsSection;
