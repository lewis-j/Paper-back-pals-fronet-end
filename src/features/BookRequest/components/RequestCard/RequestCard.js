import styles from "./RequestCard.module.scss";

const RequestCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.progressBar} />
      <div className={styles.status}>
        <Status />
      </div>
    </div>
  );
};

const Status = () => {
  return <div></div>;
};

export default RequestCard;
