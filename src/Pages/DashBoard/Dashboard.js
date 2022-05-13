import React from "react";
import { BookSlider, UserCardLrg as CurrentRead } from "../../components";
import { Container } from "reactstrap";

const bookData = {
  coverImg:
    "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  title: "GIRL WITH THE DRAGON TATTOO",
  author: "Stieg Larson",
  dueDate: "3/22/2022",
  lender: "Lindsey Jackson",
  lenderId: "1",
  lenderImg:
    "https://lh3.googleusercontent.com/a/AATXAJyviNEutydcl7WBBWBBVtShwyfugT_jtGoQyim7=s96-c",
  currentPage: 304,
  pageCount: 480,
};

const checkedBooks = [
  {
    coverImg:
      "http://books.google.com/books/content?id=WrL9de30FDMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "GIRL WITH THE DRAGON TATTOO",
    author: "Stieg Larson",
    dueDate: "3/22/2022",
    lender: "Lindsey Jackson",
    lenderId: "1",
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
    lenderId: "2",
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
    lenderId: "3",
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

const SectionTitle = ({ title }) => (
  <h3 style={{ maxWidth: "540px" }} className="mx-auto mt-5">
    {title}
  </h3>
);

const Dashboard = () => {
  return (
    <div>
      <Container>
        <SectionTitle title="Current Read" />
        <CurrentRead currentBook={bookData} />
        <SectionTitle title="Checked out Books" />
        <BookSlider books={checkedBooks} className="my-5" />
        <SectionTitle title="Currently lent out Books" />
        <BookSlider books={checkedBooks} className="my-5" />
      </Container>
    </div>
  );
};

export default Dashboard;
