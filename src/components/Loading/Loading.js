import { Spinner } from "reactstrap";
import styles from "./Loading.module.scss";
import whiteLogo from "../../Assets/imgs/pppals_white.png";
import blackLogo from "../../Assets/imgs/pppals.png";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}> </div>
      <img
        className={`${styles.img} ${styles.blackLogo}`}
        src={blackLogo}
        alt="paperback pals"
      />
    </div>
  );
};

export default Loading;
