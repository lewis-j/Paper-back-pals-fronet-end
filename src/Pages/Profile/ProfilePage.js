import styles from "./ProfilePage.module.scss";
import { SliderPicker } from "react-color";
import { useState } from "react";

const ProfilePage = () => {
  const [value, setValue] = useState("");
  return (
    <div className={styles.container} style={{ marginTop: "3em" }}>
      <SliderPicker
        onChangeComplete={(value) => {
          console.log(value);
        }}
      />
    </div>
  );
};
export default ProfilePage;
