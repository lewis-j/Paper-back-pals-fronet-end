import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button";
import styles from "./EditButtons.moduel.scss";

const EditButtons = ({ onSubmit, onClose }) => {
  return (
    <div className={styles.editBtns}>
      <Button
        icon={faCheck}
        iconStyle={styles.acceptBtn}
        onClick={() => {
          onSubmit();
        }}
      >
        Accept
      </Button>
      <Button
        icon={faX}
        iconStyle={styles.closeBtn}
        onClick={() => {
          onClose();
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default EditButtons;
