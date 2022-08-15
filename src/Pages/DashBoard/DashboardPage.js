import React, { useState } from "react";
import { ResponsiveSlider } from "../../components";
import { UserCardLrg as CurrentRead, UserCardSm } from "../../features/library";
import { Container } from "reactstrap";
import styles from "./DashboardPage.module.scss";

const bookData = {
  coverImg:
    "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  title: "GIRL WITH THE DRAGON TATTOO",
  author: "Stieg Larson",
  dueDate: "3/22/2022",
  lender: "Lindsey Jackson",
  lenderId: "1",
  lenderImg:
    "data:image/svg+xml,%0A%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%0A%20%20%20%3Cg%3E%0A%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22red%22%3E%3C%2Frect%3E%0A%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Verdana%22%20dominant-baseline%3D%22middle%22%20%20text-anchor%3D%22middle%22%20font-size%3D%2235%22%20fill%3D%22white%22%3EJB%3C%2Ftext%3E%0A%20%3C%2Fg%3E%0A%20%3C%2Fsvg%3E%0A",
  currentPage: 304,
  pageCount: 480,
};

const checkedBooks = [
  {
    coverImg:
      "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "Killer",
    author: "Jonathan Kellerman",
    dueDate: "3/22/2022",
    lender: "Lindsey Jackson",
    lenderId: "1",
    lenderImg:
      "data:image/svg+xml,%0A%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%0A%20%20%20%3Cg%3E%0A%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22red%22%3E%3C%2Frect%3E%0A%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Verdana%22%20dominant-baseline%3D%22middle%22%20%20text-anchor%3D%22middle%22%20font-size%3D%2235%22%20fill%3D%22white%22%3EJB%3C%2Ftext%3E%0A%20%3C%2Fg%3E%0A%20%3C%2Fsvg%3E%0A",
    currentPage: 304,
    pageCount: 480,
  },
  {
    coverImg:
      "http://books.google.com/books/content?id=6H-ODQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Kenobi",
    author: "John Jackson Miller",
    dueDate: "5/23/2022",
    lender: "Lindsey Jackson",
    lenderId: "2",
    lenderImg:
      "https://lh3.googleusercontent.com/a-/AOh14GjTz3-DpsVbTe5N83aKCrW7_DlrUFJOzfuqxLCj=s96-c",
    currentPage: 304,
    pageCount: 480,
  },
  {
    coverImg:
      "http://books.google.com/books/content?id=Gia58Jn8mSQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "The Wisper Man",
    author: "Alex North",
    dueDate: "7/27/2022",
    lender: "Lindsey Jackson",
    lenderId: "3",
    lenderImg:
      "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
    currentPage: 304,
    pageCount: 480,
  },
  {
    coverImg:
      "http://books.google.com/books/content?id=GY7CuwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    title: "GIRL WITH THE DRAGON TATTOO",
    author: "Stieg Larson",
    dueDate: "8/10/2022",
    lender: "Lindsey Jackson",
    lenderId: "4",
    lenderImg:
      "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
    currentPage: 304,
    pageCount: 480,
  },
  {
    coverImg:
      "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "GIRL WITH THE DRAGON TATTOO",
    author: "Stieg Larson",
    dueDate: "3/22/2022",
    lender: "Lindsey Jackson",
    lenderId: "5",
    lenderImg:
      "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
    currentPage: 304,
    pageCount: 480,
  },
  {
    coverImg:
      "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "GIRL WITH THE DRAGON TATTOO",
    author: "Stieg Larson",
    dueDate: "3/22/2022",
    lender: "Lindsey Jackson",
    lenderId: "6",
    lenderImg:
      "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
    currentPage: 304,
    pageCount: 480,
  },
];
const LibraryBooks = [
  {
    coverImg:
      "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "Killer",
    author: "Jonathan Kellerman",
    dueDate: "3/22/2022",
    lender: "Lindsey Jackson",
    lenderId: "1",
    lenderImg:
      "data:image/svg+xml,%0A%20%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%22100%22%3E%0A%20%20%20%3Cg%3E%0A%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22red%22%3E%3C%2Frect%3E%0A%20%20%20%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-family%3D%22Verdana%22%20dominant-baseline%3D%22middle%22%20%20text-anchor%3D%22middle%22%20font-size%3D%2235%22%20fill%3D%22white%22%3EJB%3C%2Ftext%3E%0A%20%3C%2Fg%3E%0A%20%3C%2Fsvg%3E%0A",
    currentPage: 304,
    pageCount: 480,
  },
  {
    coverImg:
      "http://books.google.com/books/content?id=6H-ODQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    title: "Kenobi",
    author: "John Jackson Miller",
    dueDate: "5/23/2022",
    lender: "Lindsey Jackson",
    lenderId: "2",
    lenderImg:
      "https://lh3.googleusercontent.com/a-/AOh14GjTz3-DpsVbTe5N83aKCrW7_DlrUFJOzfuqxLCj=s96-c",
    currentPage: 304,
    pageCount: 480,
  },
];

const DashboardPage = () => {
  const [activeCard, setActiveCard] = useState("");
  return (
    <Container>
      <h3 className={styles.title}>Current Read</h3>
      <CurrentRead currentBook={bookData} />
      <h3 className={styles.title}>Books from Friends</h3>
      <ResponsiveSlider>
        {/* {checkedBooks.map((book, i) => (
          <UserCardSm
            book={book}
            user={}
            setActive={setActiveCard}
            isActive={activeCard === book.lenderId}
            key={`FriendsSlider: ${i}`}
          />
        ))} */}
      </ResponsiveSlider>
      <h3 className={styles.title}>Your Library</h3>
      <ResponsiveSlider>
        {/* {LibraryBooks.map((book, i) => (
          <UserCardSm bookData={book} key={`YourSlider: ${i}`} />
        ))} */}
      </ResponsiveSlider>
    </Container>
  );
};

export default DashboardPage;
