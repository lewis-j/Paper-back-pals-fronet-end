import { faEdit, faFileImage } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button } from "../../../../components";
import styles from "./Profile.module.scss";

const Profile = () => {
  const [imgFile, setImgFile] = useState(null);

  const { currentUser } = useSelector((state) => state.authUser);
  const fileInputRef = useRef("");
  if (!currentUser) return null;
  const { username, profilePic } = currentUser;
  console.log("Current user", currentUser);
  return (
    <div className={styles.container}>
      <div className={styles.avater}>
        <Avatar imgSrc={profilePic} />
        <input
          type="file"
          value={imgFile}
          accept=""
          ref={fileInputRef}
          onChange={(e) => setImgFile(e.target.files[0])}
          hidden
        />
        <Button
          circle
          icon={faFileImage}
          onClick={() => {
            fileInputRef.current.click();
          }}
        />
      </div>
      <div className={styles.name}>{username}</div>
    </div>
  );
};
export default Profile;
