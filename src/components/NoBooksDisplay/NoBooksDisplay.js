import { IconBookOff } from "@tabler/icons";
import { Button } from "../Button";
import styles from "./NoBookDisplay.module.scss";
const NoBooksDisplay = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={styles.iconWrapper}>
        <IconBookOff width="100%" height="100%" />
      </div>
      <div className={styles.text}> No books yet!</div>
      <Button>Search Friends</Button>
    </div>
  );
};

export default NoBooksDisplay;
