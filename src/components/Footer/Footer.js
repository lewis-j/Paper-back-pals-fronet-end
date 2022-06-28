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
const Footer = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <footer className="Footer mt-5 d-flex justify-content-between align-items-center ">
      <Container>
        <Row>
          <Col md="4" className="Footer__icons">
            <a
              className="text-dark me-2"
              href="https://github.com/lewis-j/paperbackpals"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a className="text-dark me-2" href="mailto:desmotion27@gmail.com">
              <FontAwesomeIcon icon={faAt}></FontAwesomeIcon>
            </a>
          </Col>
          <Col>
            <p
              id="acknowledgements"
              className="justify-content-center me-5 Footer__other"
            >
              Acknowledgements section
            </p>
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
                    href="https://www.freepik.com/photos/novel"
                    onClick={() => {
                      window.open("https://www.freepik.com/photos/novel");
                    }}
                  >
                    Novel photo created by freepik - www.freepik.com
                  </ListGroupItem>
                  <ListGroupItem
                    action
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
          </Col>
        </Row>
        <div className="Footer__copyright">
          <p>Copyright© 2022 Paperback Pals </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
