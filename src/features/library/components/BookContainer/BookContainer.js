import styles from "./BookContainer.module.scss";
import { IconBookOff } from "@tabler/icons";
import { faArrowDown, faBell } from "@fortawesome/free-solid-svg-icons";
import { NoContent, Placeholder, Button, FadeIn } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { Col } from "reactstrap";
import { useState } from "react";

const defaultNoContent = {
  text: "No Books Yet!",
  icon: IconBookOff,
  description: null,
  buttonText: null,
  buttonIcon: null,
  onClick: null,
};

const BookContainer = ({ children: cards, noContent = defaultNoContent }) => {
  const [renderBookCount, setRenderBookCount] = useState(12);
  const [loadingSection, setLoadingSection] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoadingSection(true);
    setTimeout(() => {
      setLoadingSection(false);
      setRenderBookCount((previousState) => previousState + 12);
    }, 300);
  };

  if (cards.length === 0) {
    const { text, icon, description, buttonText, buttonIcon, onClick } = {
      ...defaultNoContent,
      ...noContent,
    };
    return (
      <NoContent text={text} icon={icon}>
        {description && <div>{description}</div>}
        {buttonText && (
          <Button varient="add" icon={buttonIcon} onClick={onClick}>
            {buttonText}
          </Button>
        )}
      </NoContent>
    );
  }
  const renderBooks = cards.slice(0, renderBookCount);
  const loadingCount = cards.slice(
    renderBookCount,
    renderBookCount + 12
  ).length;

  return (
    <>
      <FadeIn delay={100}>{renderBooks}</FadeIn>
      {loadingSection &&
        [...Array(loadingCount).keys()].map((i) => (
          <Col sm="4" md="3" xl="2" key={i} className={styles.cardWrapper}>
            <Placeholder />
          </Col>
        ))}
      {cards.length > renderBookCount && (
        <Button icon={faArrowDown} varient="accept" onClick={handleClick}>
          Show more
        </Button>
      )}
    </>
  );
};

export default BookContainer;
