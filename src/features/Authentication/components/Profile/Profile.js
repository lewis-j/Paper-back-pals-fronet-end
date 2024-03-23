import {
  faCheck,
  faEdit,
  faFileImage,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button } from "../../../../components";
import styles from "./Profile.module.scss";
import { setUsernameAndPictire } from "../../firebase";

const Profile = () => {
  const [imgFile, setImgFile] = useState("");
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [userName, setName] = useState("");
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
    return () => {};
  }, [isNameEdit]);

  const { currentUser } = useSelector((state) => state.authUser);
  const fileInputRef = useRef("");
  if (!currentUser) return null;
  const { username, profilePic } = currentUser;

  const exitNameEdit = () => {
    setIsNameEdit(false);
  };

  const handleNameClick = (e) => {
    console.log("useName", username);
    setIsNameEdit(true);
    setName(username);
  };

  const handleFileUpload = async () => {
    if (!imgFile) return;
    try {
      const formData = new FormData();
      formData.append("file", imgFile);

      // await axios.post('/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.avater}>
        <Avatar imgSrc={imgFile ? imgFile : profilePic} username={username} />
        <input
          type="file"
          accept=""
          ref={fileInputRef}
          onChange={(e) => {
            setImgFile(URL.createObjectURL(e.target.files[0]));
          }}
          hidden
        />

        <Button
          circle
          icon={faFileImage}
          onClick={() => {
            fileInputRef.current.click();
          }}
        />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      {!isNameEdit ? (
        <div className={styles.name} onClick={handleNameClick}>
          {username}
        </div>
      ) : (
        <div className={styles.nameInput}>
          <input
            ref={nameInputRef}
            type="text"
            value={userName}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.editBtns}>
            <Button
              circle
              icon={faCheck}
              iconStyle={styles.acceptBtn}
              onClick={() => {
                setUsernameAndPictire()
              }}
            />
            <Button
              circle
              icon={faX}
              iconStyle={styles.closeBtn}
              onClick={() => {
                exitNameEdit();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
