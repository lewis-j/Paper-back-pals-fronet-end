import React from "react";
import { Button } from "../../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faImage,
  faSpinner,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchCard.module.scss";
import { useState } from "react";

const SearchCard = ({
  cardData,
  addBook,
  isLoading = null,
  inLibrary = null,
}) => {
  console.log("Card data", cardData);
  const { title, author, thumbnail } = cardData;
  const [isActive, setActive] = useState(false);

  const { style: btnStyle, icon } = (() => {
    if (isLoading && isActive)
      return { style: styles.isLoading, icon: faSpinner };
    if (!inLibrary) return { style: null, icon: faPlus };
    return { style: styles.inLibrary, icon: faCheck };
  })();

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
          <Button
            outline
            disabled={isLoading || inLibrary}
            circle
            size="lg"
            className={btnStyle}
            onClick={() => {
              addBook();
              setActive(true);
            }}
          >
            <FontAwesomeIcon icon={icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
