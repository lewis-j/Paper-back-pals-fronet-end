import { Col, Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import { IconBookOff } from "@tabler/icons";
import { getProgressInPercent } from "../../utilities/bookUtilities";
import { BookCard, UserCardSm, BookContainer } from "../../features/library";
import styles from "./BorrowedPage.module.scss";
import { useState } from "react";
import { sortCheckedInBooks } from "../../features/library/utilities/bookFilterUtil";
import { Button, NoContent } from "../../components";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BorrowedPage = () => {
  const navigate = useNavigate();
  const { borrowed: books } = useSelector((state) => state.userBooks.books);

  const { checkedOut } = sortCheckedInBooks(books);

  const [activeCard, setActiveCard] = useState("");

  const checkedOutBookMenuitems = [
    {
      text: "Message",
      clickHandler: (i) => {
        console.log("itemclicked: ", i);
      },
    },
    {
      text: "Request",
      clickHandler: (i) => {
        console.log("itemclicked: ", i);
      },
    },
  ];

  const noContent = () => (
    <NoContent text="No Books Yet!" icon={IconBookOff}>
      <div>Check Notifications for Book request</div>
      <Button
        varient="add"
        icon={faBell}
        onClick={() => navigate("/notifications")}
      >
        Notifications
      </Button>
    </NoContent>
  );

  const mapCheckedOutBooks = (userBooks) => {
    // const progressValue = getProgressInPercent(
    //   bookData.currentPage,
    //   bookData.pageCount
    // );
    return userBooks.map((userBook) => {
      const {
        _id,
        book: _book,
        owner,
        currentRequest: { dueDate },
      } = userBook;
      const book = { ..._book, dueDate };
      console.log(
        "*****************************************",
        "userBooks",
        userBook,
        "*****************************************"
      );

      return (
        <Col sm="4" md="3" xl="2" className="mb-3" key={`LibraryCard:${_id}`}>
          <UserCardSm
            _id={_id}
            book={book}
            user={owner}
            setActive={setActiveCard}
            isActive={activeCard === _id}
            menuItems={checkedOutBookMenuitems}
          />
        </Col>
      );
    });
  };

  // const mapCheckedInBooks = ({ _id, book, status }, i) => {
  //   const { coverImg, title } = book;
  //   const cardInfo = { _id, coverImg, title, status };

  //   return (
  //     <Col sm="4" md="3" xl="2" className="mb-3" key={`LibraryBookCard${_id}`}>
  //       <BookCard
  //         cardInfo={cardInfo}
  //         menuItems={menuList}
  //         isActive={activeCard === _id}
  //         setActive={setActiveCard}
  //       />
  //     </Col>
  //   );
  // };

  return (
    <>
      <Container>
        <div className={styles.title}>
          <h1>Your Library</h1>
        </div>
        <div>
          <h4 className={styles.subtitle}>Checked in Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer noContent={noContent}>
            {mapCheckedOutBooks(checkedOut)}
          </BookContainer>
        </Row>
        <div>
          <h4 className={styles.subtitle}>Checked Out Books</h4>
        </div>
        <Row className={styles.section}>
          <BookContainer noContent={noContent}>
            {mapCheckedOutBooks(checkedOut)}
          </BookContainer>
        </Row>
      </Container>
    </>
  );
};

export default BorrowedPage;
