import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import "./LandingPage.scss";
import { Outlet } from "react-router-dom";
import logo_white from "../../Assets/imgs/pppals_white.png";
import { HashLink as Link } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import tutorialContent from "../../Assets/content/tutorialContent";
import styles from "./LandingPage.module.scss";

const Hero = () => {
  return (
    <div
      className={styles.container}
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <div className={styles.imgWrapper}>
        <div className={styles.filter}></div>
        <Container style={{ height: "80%" }}>
          <Row>
            <Col
              md="6"
              // className="pop d-flex flex-column justify-content-center align-items-center"

              style={{ zIndex: 2 }}
            >
              <div className={styles.panel}>
                <div className={styles.logo}>
                  <img src={logo_white} alt="Paper back pals logo" />
                </div>
                <div className={styles.btnWrapper}>
                  <Button outline color="light" className={styles.btn}>
                    <Link smooth to="../landing-page/#Demo">
                      Learn more
                      <FontAwesomeIcon icon={faArrowDown} className="ms-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Col>
            <Col md="6" style={{ zIndex: 2 }}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>

      <div className={styles.appDiscription}>
        <h2> A social book tracker</h2>
        <p>
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
        <div className={styles.tint}>
          <img src={img.src} className={styles.thumbnail} alt={img.alt} />
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
    <Container className="md-5" id="Demo">
      {tutorialContent.map((content, i) => {
        return (
          <MediaObject
            key={`tutorialContent-${i}`}
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
