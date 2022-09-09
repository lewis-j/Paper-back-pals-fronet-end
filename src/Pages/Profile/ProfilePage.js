import styles from "./ProfilePage.module.scss";
import { SliderPicker } from "react-color";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <SliderPicker
        onChangeComplete={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
};
export default ProfilePage;
