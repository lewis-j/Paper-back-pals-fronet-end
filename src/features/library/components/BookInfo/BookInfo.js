import { shortenString } from "../../../../utilities/stringUtil";
import styles from "./BookInfo.module.scss";

const BookInfo = ({ coverImg, title, authors, description }) => {
  return (
    <div className={styles.container}>
      <div>
        <img className={styles.img} src={coverImg} alt={title} />
      </div>
      <div className={styles.content}>
        <h6 className={styles.title}>{authors[0]}</h6>
        <div className={styles.description}>
          {shortenString(description, 300)}
        </div>
      </div>
    </div>
  );
};
export default BookInfo;
