import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUser, faImage } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchCard.module.scss";

const SearchCard = ({ cardData, addBook }) => {
  const { title, author, thumbnail } = cardData;
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          <h6>{title}</h6>
          <small>{author}</small>
        </div>
        {thumbnail ? (
          <img className={styles.img} src={thumbnail} alt={title} />
        ) : (
          <FontAwesomeIcon icon={faImage} size="6x" />
        )}

        <div className={styles.button}>
          <Button outline color="secondary" className="rounded-circle me-2">
            <FontAwesomeIcon icon={faUser} />
          </Button>
          <Button
            outline
            color="secondary"
            className="rounded-circle"
            onClick={() => {
              addBook();
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
