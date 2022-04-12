import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import "./Home.scss";
import Footer from "../Footer";
import logo_white from "../../Assets/imgs/pppals_white.png";
import messy_books from "../../Assets/imgs/messy_books.jpg";
import { HashLink as Link } from "react-router-hash-link";

const Hero = () => {
  return (
    <div className="Hero-container">
      <div className="main-img d-flex flex-column align-items-center justify-content-center">
        <div className="filter"></div>

        <div
          className="pop d-flex flex-row flex-column text-align-center"
          style={{ zIndex: 2 }}
        >
          <img src={logo_white} alt="Paper back pals logo" />
          <div className="mt-2 d-flex justify-content-center Hero-btns">
            <Button
              outline
              color="light"
              className="me-5 border-0 border-bottom Hero-demo-btn"
            >
              <Link smooth to="/#Demo">
                Demo
              </Link>
            </Button>
            <Button outline color="light" className="border-0 border-bottom">
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="Hero-app-discription text-center text-white">
        <h2> A social book tracker</h2>
        <p className="mx-auto mt-4">
          Sometimes we all lend out books only to foget were they ended up. And
          sometimes we don't realize we're holding onto books that we barrowed
          from someone else. This is a web app that helps you to keep track of
          the paperback books that you lent or barrowed between your friends.
        </p>
      </div>
    </div>
  );
};

const MediaObject = ({ img, header, paragraph, imgRight = false }) => {
  const rowClassName = `${imgRight ? "order-md-last" : ""} mb-5 mb-md-0`;
  return (
    <Row className="pt-5 d-flex align-items-center">
      <Col sm="12" md="6" className={rowClassName}>
        <div className="tint">
          <img
            src={img.src}
            className="img-thumbnail justify-content-center shadow-lg"
            alt={img.alt}
          />
        </div>
      </Col>
      <Col>
        <div className="text-center mt-sm-4">
          <h3>{header}</h3>
          <p>{paragraph}</p>
        </div>
      </Col>
    </Row>
  );
};

const TutorialSection = () => {
  const tutContent = [
    {
      header: "Find Books you'd like to lend",
      paragraph:
        "Add a list of books to your lending library and let friends request to barrow them!",
      img: {
        src: "https://img.freepik.com/free-photo/creative-assortment-with-different-books_23-2148851019.jpg?w=1380",
        alt: "pile of books",
      },
      imgRight: false,
    },
    {
      header: "Give your friends your paperback book",
      paragraph:
        "Approve their book request, and once you've passed that book on to them confirm the pass was completed",
      img: {
        src: "https://img.freepik.com/free-photo/front-view-composition-with-different-books_23-2148851051.jpg?t=st=1647497953~exp=1647498553~hmac=2189c71f0c8bc0382e656a30340f7f2392483ee0afcc467919247018d87b73ae&w=1380",
        alt: "passing a book",
      },
      imgRight: true,
    },
    {
      header: "Track Your friends reading progress",
      paragraph:
        "Check in to see your freinds remaining page counts. See how far they are from their projected due date.",
      img: {
        src: "https://img.freepik.com/free-photo/book-library-with-open-textbook_1150-5920.jpg?t=st=1647584191~exp=1647584791~hmac=6ffaae826056a60743dec04e24754a88905330edb049fb1fc9143bbc50dda822&w=1380",
        alt: "passing a book",
      },
      imgRight: false,
    },
  ];

  return (
    <Container className="mt-md-5 tutorial" id="Demo">
      {tutContent.map((content, i) => {
        return (
          <MediaObject
            key={i}
            img={content.img}
            header={content.header}
            paragraph={content.paragraph}
            imgRight={content.imgRight}
          />
        );
      })}
    </Container>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <TutorialSection />
      <Footer />
    </>
  );
};

export default Home;
