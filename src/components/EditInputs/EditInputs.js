import styles from "./EditInputs.module.scss";
const EditInput = ({ isEdit, name, value, handleClick, set }) => {
  return (
    <div className={styles.editInput}>
      {isEdit ? (
        <div
          className={styles.name}
          onClick={() => {
            handleClick();
            set(name);
          }}
        >
          {name}
        </div>
      ) : (
        <div className={styles.input}>
          <input
            type="text"
            value={value}
            onChange={(e) => set(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default EditInput;
