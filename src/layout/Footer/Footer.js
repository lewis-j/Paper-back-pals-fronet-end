import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  ListGroup,
  ListGroupItem,
  Popover,
  PopoverBody,
  PopoverHeader,
  Container,
  Row,
} from "reactstrap";
import "./Footer.scss";
import styles from "./Footer.module.scss";
const Footer = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <footer className={styles.container}>
      <Container>
        <Row className={styles.row}>
          <div className={styles.footerSection}>
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/books">Browse Books</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h5>Stay Updated</h5>
            <form className={styles.newsletter}>
              <input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>

          <div className={styles.icons}>
            <a
              href="https://github.com/lewis-j/paperbackpals"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://linkedin.com/company/paperbackpals"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://twitter.com/paperbackpals"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="mailto:desmotion27@gmail.com" aria-label="Email">
              <FontAwesomeIcon icon={faAt} />
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

        <div className={styles.legalLinks}>
          <a href="/privacy">Privacy Policy</a>
          <span className={styles.divider}>|</span>
          <a href="/terms">Terms of Service</a>
          <span className={styles.divider}>|</span>
          <a href="/cookies">Cookie Policy</a>
        </div>

        <div className={styles.copyright}>
          Copyright© {new Date().getFullYear()} Paperback Pals
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
