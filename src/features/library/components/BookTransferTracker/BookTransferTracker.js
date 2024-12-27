import { useState } from "react";

import styles from "./BookTransferTracker.module.scss";
import { BookStatusTracker } from "../BookStatusTracker";
import { useBookTransferModal } from "./hooks/useBookTransferModal";
import { Col, Row } from "../../../../lib/BootStrap";

const BookTransferTracker = ({ booksInTransition, isBorrower = true }) => {
  const { runAction, renderModal } = useBookTransferModal(isBorrower);
  const [selectedBookId, setSelectedBookId] = useState(
    booksInTransition[0]?._id || ""
  );

  if (booksInTransition.length === 0) return null;

  return (
    <>
      {renderModal()}
      <div>
        <h4 className={styles.subtitle}>In Progress</h4>
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
          className={styles.select}
        >
          {booksInTransition.map((book) => (
            <option key={book._id} value={book._id}>
              {book.book.title}
            </option>
          ))}
        </select>
      </div>
      <Row>
        <Col xs="12">
          <BookStatusTracker
            userBook={booksInTransition.find((b) => b._id === selectedBookId)}
            isBorrower={isBorrower}
            onAction={runAction}
          />
        </Col>
      </Row>
    </>
  );
};

export default BookTransferTracker;
