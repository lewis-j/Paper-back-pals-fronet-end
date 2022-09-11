import { useState } from "react";
import { Button } from "../../../../components";
import styles from "./PageCountForm.module.scss";

const PageCountForm = ({ currentPage = 123123 }) => {
  const [value, setValue] = useState(currentPage);
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
      <Button>enter</Button>
    </div>
  );
};
export default PageCountForm;
