import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import CurrentRead from "../../components/UserBookCard";
import { UserBookCardSm } from "../../components/UserBookCardSm";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

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

const renderCheckedCards = checkedBooks.map((bookData, idx) => {
  return (
    <div key={bookData.lenderId}>
      <UserBookCardSm bookData={bookData} index={idx} />
    </div>
  );
});

const SimpleSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return <Slider {...settings}>{renderCheckedCards}</Slider>;
};

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
        <SimpleSlider />
        <UserBookCardSm bookData={bookData} />
      </Container>
    </div>
  );
};

export default Dashboard;
