import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Profile } from "../../features/Authentication";
import styles from "./ProfilePage.module.scss";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const ProfilePage = () => {
  return (
    <div className={styles.container} style={{ marginTop: "3em" }}>
      <div className={styles.title}>
        <h1 className={styles.titleContent}>Profile</h1>
        <FontAwesomeIcon icon={faUser} size="lg" className={styles.titleIcon} />
      </div>
      <Profile />
    </div>
  );
};
export default ProfilePage;
