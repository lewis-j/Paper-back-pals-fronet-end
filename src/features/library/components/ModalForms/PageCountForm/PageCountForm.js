import { useState } from "react";
import { Button } from "../../../../../components";
import styles from "./PageCountForm.module.scss";

const PageCountForm = ({ currentPage = 123123, onSubmit }) => {
  const [value, setValue] = useState(currentPage);

  const handleSubmit = () => {
    onSubmit(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.label}>Update your current page</div>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        onFocus={(e) => e.target.select()}
      />
      <Button onClick={handleSubmit}>enter</Button>
    </div>
  );
};
export default PageCountForm;
