import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import "./LandingPage.scss";
import { Outlet } from "react-router-dom";
import logo_white from "../../Assets/imgs/pppals_white.png";
import { HashLink as Link } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import tutorialContent from "../../Assets/content/tutorialContent";

const Hero = () => {
  return (
    <div
      className="Hero__container"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <div className="Hero__main-img d-flex align-items-center ">
        <div className="filter"></div>
        <Container style={{ height: "80%" }}>
          <Row>
            <Col
              md="6"
              className="pop d-flex flex-column"
              style={{ zIndex: 2 }}
            >
              <img
                src={logo_white}
                alt="Paper back pals logo"
                className="Hero__logo"
              />
              <div className="mt-2 d-flex justify-content-center Hero__btns">
                <Button
                  outline
                  color="light"
                  className="me-5 border-bottom Hero__demo__btn"
                >
                  <Link smooth to="../landing-page/#Demo">
                    Demo
                    <FontAwesomeIcon icon={faArrowDown} className="ms-1" />
                  </Link>
                </Button>
              </div>
            </Col>
            <Col md="6" style={{ zIndex: 2 }}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>

      <div className="Hero__app-discription text-center text-white">
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
  return (
    <Container className="mt-md-5 tutorial" id="Demo">
      {tutorialContent.map((content, i) => {
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

const LandingPage = () => {
  return (
    <>
      <Hero />
      <TutorialSection />
    </>
  );
};

export default LandingPage;
