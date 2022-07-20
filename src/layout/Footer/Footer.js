import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  ListGroup,
  ListGroupItem,
  InputGroup,
  Input,
  Button,
  Popover,
  PopoverBody,
  PopoverHeader,
  Container,
  Row,
  Col,
} from "reactstrap";
import "./Footer.scss";
import styles from "./Footer.module.scss";
const Footer = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <footer className={styles.container}>
      <Container>
        <Row className={styles.row}>
          <div className={styles.icons}>
            <a
              className="text-dark me-2"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/lewis-j/paperbackpals"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a className="text-dark me-2" href="mailto:desmotion27@gmail.com">
              <FontAwesomeIcon icon={faAt}></FontAwesomeIcon>
            </a>
          </div>
          <div className={styles.acknowledgements}>
            <div id="acknowledgements">Acknowledgements section</div>
            <Popover
              placement="top"
              flip
              target="acknowledgements"
              toggle={() => setPopoverOpen(!popoverOpen)}
              isOpen={popoverOpen}
            >
              <PopoverHeader>Attributions</PopoverHeader>
              <PopoverBody>
                <ListGroup>
                  <ListGroupItem
                    action
                    className={styles.link}
                    href="https://www.freepik.com/photos/novel"
                    onClick={() => {
                      window.open("https://www.freepik.com/photos/novel");
                    }}
                  >
                    Novel photo created by freepik - www.freepik.com
                  </ListGroupItem>
                  <ListGroupItem
                    action
                    className={styles.link}
                    onClick={() => {
                      window.open(
                        "https://www.freepik.com/photos/library-books"
                      );
                    }}
                  >
                    Library books photo created by jcomp - www.freepik.com
                  </ListGroupItem>
                </ListGroup>
              </PopoverBody>
            </Popover>
          </div>
        </Row>
        <div className={styles.copyright}>Copyright© 2022 Paperback Pals</div>
      </Container>
    </footer>
  );
};

export default Footer;
