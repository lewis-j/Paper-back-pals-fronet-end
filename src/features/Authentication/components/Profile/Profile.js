import {
  faCheck,
  faEdit,
  faFileImage,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, EditButtons, EditInput } from "../../../../components";
import styles from "./Profile.module.scss";
import API from "../../../../lib/authAxios";

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const [isEditMode, setIsEditMode] = useState({
    img: false,
    name: false,
    email: false,
  });
  const [menu, setMenu] = useState({ name: "" });
  const nameInputRef = useRef(null);

  const setAllToFalse = (prevState) => {
    const newState = {};
    for (let key in prevState) {
      if (prevState.hasOwnProperty(key)) {
        newState[key] = false;
      }
    }
    return newState;
  };

  useEffect(() => {
    if (nameInputRef.current) nameInputRef.current.focus();
    return () => {};
  }, []);

  const { currentUser } = useSelector((state) => state.authUser);

  const fileInputRef = useRef("");
  if (!currentUser) return null;
  const { username, profilePic, email } = currentUser;

  const handleNameClick = (e) => {
    setIsEditMode({ ...isEditMode, name: true });
    setMenu({ ...menu, name: username });
  };

  const handleFileUpload = async () => {
    if (!avatar?.file) {
      console.error("avatar.file is undefined or null");
      return;
    }
    try {
      const formData = new FormData();

      formData.append("file", avatar.file);
      //TODO: convert into thunk in user slice
      const response = await API.post("user/profile-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const someTrue = (obj) => Object.values(obj).some((value) => value === true);

  const handleSubmit = (e) => {
    const { img, ...remainingEdits } = isEditMode;
    if (img) handleFileUpload();

    if (someTrue(remainingEdits)) {
      alert("submit form");
      // TODO: update user data
    }
    onCancel();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar({ img: URL.createObjectURL(file), file });
    setIsEditMode({ ...isEditMode, img: true });
  };

  const onCancel = (e) => {
    setAvatar(null);
    setIsEditMode((prevState) => setAllToFalse(prevState));
  };

  const imageUrl = avatar?.img || profilePic;

  const inEditMode = someTrue(isEditMode);

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div
          className={styles.profilePic}
          onClick={() => {
            fileInputRef.current.click();
          }}
          role="button"
          aria-label="Change profile picture"
        >
          <Avatar imgSrc={imageUrl} username={username} size="xl" />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileChange}
          hidden
          aria-hidden="true"
        />
      </div>

      <div className={styles.profileSection}>
        <div className={styles.label}>Email</div>
        <EditInput
          isEdit={!isEditMode.email}
          name={email}
          value={menu.email}
          handleClick={() => setIsEditMode({ ...isEditMode, email: true })}
          set={(value) => setMenu({ ...menu, email: value })}
        />
      </div>

      <div className={styles.profileSection}>
        <div className={styles.label}>Username</div>
        <EditInput
          isEdit={!isEditMode.name}
          name={username}
          value={menu.name}
          handleClick={() => setIsEditMode({ ...isEditMode, name: true })}
          set={(value) => setMenu({ ...menu, name: value })}
        />
      </div>

      <div className={styles.editBtns}>
        {inEditMode && (
          <EditButtons onSubmit={handleSubmit} onClose={onCancel} />
        )}
      </div>
    </div>
  );
};
export default Profile;
