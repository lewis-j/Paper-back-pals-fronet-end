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
          <Col md="4" className="Footer-icons">
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
          <Col className="order-md-last Footer-other">
            <InputGroup>
              <Input />
              <Button>Sign Up</Button>
            </InputGroup>
          </Col>
          <Col>
            <p
              id="acknowledgements"
              className="justify-content-center me-5 Footer-other"
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
                  >
                    <a href="https://www.freepik.com/photos/novel">
                      Novel photo created by freepik - www.freepik.com
                    </a>
                  </ListGroupItem>
                </ListGroup>
              </PopoverBody>
            </Popover>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
