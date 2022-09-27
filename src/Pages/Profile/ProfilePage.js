import { Profile } from "../../features/Authentication";
import styles from "./ProfilePage.module.scss";
const ProfilePage = () => {
  return (
    <div className={styles.container} style={{ marginTop: "3em" }}>
      <Profile />
    </div>
  );
};
export default ProfilePage;
