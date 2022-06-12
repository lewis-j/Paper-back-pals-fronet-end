import { Spinner } from "reactstrap";
import styles from "./Loading.module.scss";
import whiteLogo from "../../Assets/imgs/pppals_white.png";
import blackLogo from "../../Assets/imgs/pppals.png";
const Loading = () => {
  return (
    <div>
      <Spinner type="grow" className={styles.spinner} size="lg" />
      <div className={styles.logo}>
        <img
          className={`${styles.img} ${styles.whiteLogo}`}
          src={whiteLogo}
          alt="paperback pals"
        />

        <img
          className={`${styles.img} ${styles.blackLogo}`}
          src={blackLogo}
          alt="paperback pals"
        />
      </div>
    </div>
  );
};

export default Loading;
